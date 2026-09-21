# Preserve every Time Machine version and add credit fallbacks

## What will change
- Label every internal journey in the desktop header, phone menu, main-page cards, and footer as **INSITE VERSION**.
- Keep every existing original ChatGPT and Lovable app URL visible beside its matching internal journey, with clear platform labels.
- Add a fallback panel inside each journey when story, voice, or image generation cannot run because AI credits or usage limits are unavailable.
- The fallback will link directly to that machine’s original ChatGPT or Lovable app in a new tab, so visitors can continue instead of leaving.
- Machines without a supplied external URL will keep their internal option only; no replacement links will be invented.

## Technical details
- Extend the shared Time Machine data to provide consistent internal/original labels across all surfaces.
- Detect credit/usage-limit responses separately from ordinary errors and show the persistent alternative link near the chat controls.
- Preserve all current URLs and the existing external-link safety behavior.
- Verify labels and destinations on desktop and phone, then run the relevant checks.
