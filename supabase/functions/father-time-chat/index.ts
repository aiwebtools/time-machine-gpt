import { corsHeaders } from "../_shared/cors.ts";
import { getPersona } from "../_shared/time-machine-personas.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "AI is not configured on this server." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { messages, persona: personaId } = await req.json();
    const persona = getPersona(personaId);
    if (!persona || !Array.isArray(messages) || messages.length > 40) {
      return new Response(JSON.stringify({ error: "Choose a valid Time Machine and conversation." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const input = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: [
        {
          type: m.role === "assistant" ? "output_text" : "input_text",
          text: String(m.content ?? ""),
        },
      ],
    }));

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        instructions: persona.instructions,
        input,
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        include: ["reasoning.encrypted_content"],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const details = await upstream.text().catch(() => "");
      console.error(`Gateway chat failed [${upstream.status}]: ${details}`);
      let message = "The time machine could not reach the AI.";
      try {
        const parsed = JSON.parse(details);
        if (typeof parsed?.message === "string") message = parsed.message;
        else if (typeof parsed?.error?.message === "string") message = parsed.error.message;
      } catch { /* upstream returned non-JSON details */ }
      return new Response(JSON.stringify({ error: message, details }), {
        status: upstream.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("father-time-chat error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
