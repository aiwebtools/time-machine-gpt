# Live narration, real choice endings, and a Time Machines hub

Four focused upgrades on top of the six journeys that already exist. No redesign, no new backend tables, no changes to existing links or labels.

## 1. Voice that plays while the story streams

Today narration only starts after the whole story is written, so there is a long silence.

- Narration begins as soon as the first sentences arrive and keeps speaking in order while the rest of the story is still being written.
- The "Narration on" switch and the per-message "Hear it" button keep working exactly as they do now, and "Stop" stops everything instantly.
- Before any picture is created, narration finishes its current sentence and holds with a clear pause and a visible "Pausing for the vision…" note, then resumes after the picture appears.

## 2. Future journeys: three real choices, a confirmed future, its picture, and an ending

- When a traveller sets a future year, the guide asks three questions, one at a time. Each one appears with two tappable choices (Red Pill and Blue Pill) instead of free typing; typing still works for anyone who prefers it.
- Answers are counted. Two or more Red Pill answers confirm a flourishing future; otherwise the cautionary future is confirmed.
- The confirmed future is announced clearly, its picture is created automatically, and the journey closes with a real ending and an invitation to travel again.

## 3. Past journeys: a choice that changes the ending

- After the arrival story, every machine offers two historically grounded courses to follow (for example, stay with the crowd or follow the messengers).
- Either choice leads to the documented historical outcome, told from that vantage point, so the ending genuinely changes without inventing history.
- The closing scene names what really happened next and offers the picture of that moment.

## 4. A hub page listing all six machines

- New page at `/time-machines` with a short summary card for each machine: name, what makes it different, its artwork, the (INSITE VERSION) button, and its original (CHATGPT VERSION) / (LOVABLE APP VERSION) button where one exists.
- Linked from the header menu, the phone menu, the footer, and the main page section, and added to the sitemap.

## Technical notes

- `supabase/functions/_shared/time-machine-personas.ts`: add shared trial rules. Choice turns end with two marker lines (`RED PILL:` / `BLUE PILL:` for futures, `PATH A:` / `PATH B:` for the past) so the page can render buttons; the outcome turn is instructed to confirm the result and finish with the existing ending line.
- `src/lib/fatherTime.ts`: `TimeVoice` gains a serialized queue that speaks chunks as they arrive on a shared audio clock, plus `pause()`/`resume()` used around image generation.
- `src/pages/FatherTime.tsx`: parse the marker lines into choice buttons, track the Red Pill tally across three questions, send the outcome prompt, auto-render the confirmed future image, and feed streaming text into the voice queue.
- New `src/pages/TimeMachinesHub.tsx` built from the existing `timeMachines` data and the same card styling as `ToolCards`; route added in `src/App.tsx`; links added to `DesktopNav`, `MobileMenu`, `Footer`, `public/sitemap.xml`.
- Verification: type-check, lint the changed files, then a phone-width and desktop pass through a future journey (three choices → confirmed future → picture → ending), a past journey fork, and the hub page.
