export type ChoiceKind = 'future' | 'past';

export type ChoiceOption = {
  key: 'red' | 'blue' | 'a' | 'b';
  label: string;
  text: string;
};

export type JourneyChoice = {
  kind: ChoiceKind;
  options: ChoiceOption[];
};

const RED = /^[\s*_>-]*RED PILL\s*[:\u2013-]\s*(.+)$/im;
const BLUE = /^[\s*_>-]*BLUE PILL\s*[:\u2013-]\s*(.+)$/im;
const PATH_A = /^[\s*_>-]*PATH A\s*[:\u2013-]\s*(.+)$/im;
const PATH_B = /^[\s*_>-]*PATH B\s*[:\u2013-]\s*(.+)$/im;

const clean = (value: string) => value.replace(/[*_`]/g, '').trim();

/** Reads the two choice marker lines a guide writes at the end of a fork turn. */
export function parseChoices(content: string): JourneyChoice | null {
  const red = content.match(RED);
  const blue = content.match(BLUE);
  if (red && blue) {
    return {
      kind: 'future',
      options: [
        { key: 'red', label: 'Red Pill', text: clean(red[1]) },
        { key: 'blue', label: 'Blue Pill', text: clean(blue[1]) },
      ],
    };
  }
  const pathA = content.match(PATH_A);
  const pathB = content.match(PATH_B);
  if (pathA && pathB) {
    return {
      kind: 'past',
      options: [
        { key: 'a', label: 'Path A', text: clean(pathA[1]) },
        { key: 'b', label: 'Path B', text: clean(pathB[1]) },
      ],
    };
  }
  return null;
}

/** Removes the marker lines from narration so they are only shown as buttons. */
export function stripChoiceMarkers(content: string): string {
  return content
    .split('\n')
    .filter((line) => !/^[\s*_>-]*(RED PILL|BLUE PILL|PATH A|PATH B)\s*[:\u2013-]/i.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();
}
