import { corsHeaders } from "../_shared/cors.ts";
import { getPersona } from "../_shared/time-machine-personas.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI is not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { text, persona: personaId } = await req.json();
    const persona = getPersona(personaId);
    if (!persona || !text || typeof text !== "string" || text.length > 12000) {
      return new Response(JSON.stringify({ error: "A valid Time Machine narration is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const spoken =
      `${persona.voiceStyle} ` +
      `Narrate this: ${text}`;

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-tts-preview",
        stream_format: "sse",
        contents: [{ role: "user", parts: [{ text: spoken }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: persona.voiceName } },
          },
        },
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const details = await upstream.text().catch(() => "");
      console.error(`TTS failed [${upstream.status}]: ${details}`);
      let message = "The voice of time is silent right now.";
      try {
        const parsed = JSON.parse(details);
        if (typeof parsed?.message === "string") message = parsed.message;
        else if (typeof parsed?.error?.message === "string") message = parsed.error.message;
      } catch { /* upstream returned non-JSON details */ }
      return new Response(
        JSON.stringify({ error: message, details }),
        { status: upstream.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("father-time-voice error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
