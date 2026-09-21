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

    const { prompt, persona: personaId } = await req.json();
    const persona = getPersona(personaId);
    if (!persona || !prompt || typeof prompt !== "string" || prompt.length > 4000) {
      return new Response(JSON.stringify({ error: "A valid Time Machine scene is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const safePrompt =
      `Cinematic, historically grounded, widescreen 16:9 scene. ${persona.imageStyle} ${prompt}. ` +
      `No text, no logos, no brand marks, no depictions of named living people. Photoreal, dramatic lighting.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2.5-sunburst",
        prompt: safePrompt,
        size: "1536x1024",
        n: 1,
      }),
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      console.error(`Image generation failed [${res.status}]: ${details}`);
      let message = "The vision could not be rendered.";
      try {
        const parsed = JSON.parse(details);
        if (typeof parsed?.message === "string") message = parsed.message;
        else if (typeof parsed?.error?.message === "string") message = parsed.error.message;
      } catch { /* upstream returned non-JSON details */ }
      return new Response(JSON.stringify({ error: message, details }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    const item = data?.data?.[0] ?? {};
    const image = item.b64_json
      ? `data:image/png;base64,${item.b64_json}`
      : item.url ?? null;

    if (!image) {
      return new Response(JSON.stringify({ error: "No image returned." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ image }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("father-time-image error", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
