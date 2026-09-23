# Cinematic Time-Travel Launch

## What will change
- Move the year, destination, and optional person/event controls above the conversation on every on-site Time Machine page.
- When a visitor launches, keep narration enabled for that journey, animate the selected coordinates, and smoothly move the page to the live reply as it begins streaming.
- Add a full-screen launch sequence with a gold time tunnel, expanding energy rings, streaking stars, a bright arrival flash, and celebratory particles.
- Add a short synthesized machine-start, acceleration, warp, and arrival sound created in the browser, without adding an audio service or changing the existing voices.
- Keep ordinary follow-up messages lighter than the main launch so the experience stays comfortable and usable on phones.

## Technical details
- Preserve the shared six-machine page, existing story prompts, streaming, narration, choices, image generation, and credit fallback.
- Use one reusable launch overlay and one reusable Web Audio effect; start audio only from the visitor's launch tap so browsers permit it.
- Respect reduced-motion preferences, automatically reduce particle density on small screens, prevent duplicate launch effects, and clean up timers/audio when leaving the page.
- Verify the launch placement, scrolling, streaming reply, visual sequence, sound trigger, and phone layout without spending image-generation credits.
