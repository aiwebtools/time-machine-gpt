import originalImage from '@/assets/time-machine-original.jpg';
import talkHistoryImage from '@/assets/time-machine-talk-history.jpg';
import blackHistoryImage from '@/assets/time-machine-black-history.jpg';
import nativeHistoryImage from '@/assets/time-machine-native-history.jpg';
import unwrittenHistoryImage from '@/assets/time-machine-unwritten-history.jpg';

export type TimeMachineId =
  | 'father-time'
  | 'original'
  | 'talk-history'
  | 'black-history'
  | 'native-history'
  | 'unwritten-history';

export type TimeMachineConfig = {
  id: TimeMachineId;
  path: string;
  name: string;
  shortName: string;
  heading: string;
  description: string;
  cardDescription: string;
  difference: string;
  greeting: string;
  inputPlaceholder: string;
  narrator: string;
  image: string;
  imageAlt: string;
  externalUrl?: string;
  externalLabel?: string;
  externalPlatform?: 'ChatGPT' | 'Lovable App';
};

export const timeMachines: TimeMachineConfig[] = [
  {
    id: 'father-time',
    path: '/father-time',
    name: 'Travel With Father Time',
    shortName: 'Father Time',
    heading: 'FATHER TIME — LIVE TIME TRAVEL',
    description: 'Travel to any date and place. Father Time narrates your journey, speaks it aloud, and paints what you see. The past follows established history; possible futures unfold through the Test of Two Fates.',
    cardDescription: 'A cinematic guide through the factual past and plausible futures, complete with spoken narration and generated visions.',
    difference: 'Mystical, immersive journeys with the Test of Two Fates for future travel.',
    greeting: 'Great Scott! User, what date would you like to teleport to, & where do you want to go?',
    inputPlaceholder: 'Name your date and your destination…',
    narrator: 'Father Time',
    image: '/og-time-machine.png',
    imageAlt: 'Father Time standing before a glowing golden time portal',
  },
  {
    id: 'original',
    path: '/original-time-machine',
    name: 'The Original Time Machine GPT',
    shortName: 'Original Time Machine',
    heading: 'THE ORIGINAL TIME MACHINE GPT',
    description: 'Choose any era, event, or civilization and enter a historically grounded story with live narration, voice, and widescreen visions.',
    cardDescription: 'The complete all-eras experience for exploring civilizations, events, daily life, and possible futures.',
    difference: 'The broadest journey, balanced across every place, era, and subject.',
    greeting: 'The coordinates are open. What date or era shall we visit, and where in the world shall the portal open?',
    inputPlaceholder: 'Enter an era, date, and place…',
    narrator: 'The Chronoguide',
    image: originalImage,
    imageAlt: 'Golden time portal opening onto the ancient, industrial, and future worlds',
    externalUrl: 'https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt',
    externalLabel: 'Open original ChatGPT version',
    externalPlatform: 'ChatGPT',
  },
  {
    id: 'talk-history',
    path: '/talk-to-history',
    name: 'Talk to History GPT',
    shortName: 'Talk to History',
    heading: 'TALK TO HISTORY GPT',
    description: 'Step into a carefully framed conversation with a historical figure. Ask questions, challenge ideas, and experience the world that shaped their documented views.',
    cardDescription: 'Meet a historical figure in context and hold a living, evidence-grounded conversation across time.',
    difference: 'Dialogue-first journeys built around direct questions and historically plausible replies.',
    greeting: 'Whose voice from history would you like to meet? Tell me the person, time period, and place for our conversation.',
    inputPlaceholder: 'Name a historical figure, date, and place…',
    narrator: 'The Historical Envoy',
    image: talkHistoryImage,
    imageAlt: 'Historical figures gathered for conversation around a candlelit table',
    externalUrl: 'https://talk-to-history-gpt.lovable.app/',
    externalLabel: 'Open original Talk to History app',
    externalPlatform: 'Lovable App',
  },
  {
    id: 'black-history',
    path: '/black-history-matters',
    name: 'Black History Matters Time Machine',
    shortName: 'Black History Matters',
    heading: 'BLACK HISTORY MATTERS TIME MACHINE',
    description: 'Travel through Black history across Africa and the diaspora with dignity, context, and attention to the people, communities, resistance, creativity, and achievements too often compressed or omitted.',
    cardDescription: 'Explore Black history across continents and centuries through people-centered, factual storytelling.',
    difference: 'Centers Black agency, community, achievement, resistance, and primary historical context.',
    greeting: 'Where shall our journey through Black history begin? Give me a date or era, a place, and—if you wish—a person, community, or movement.',
    inputPlaceholder: 'Choose a date, place, person, or movement…',
    narrator: 'The Living Archive',
    image: blackHistoryImage,
    imageAlt: 'A dignified timeline of Black scholarship, freedom, civil rights, and cultural achievement',
    externalUrl: 'https://blackhistorymattersgpt.lovable.app/?via=aiwebtools',
    externalLabel: 'Open original Black History app',
    externalPlatform: 'Lovable App',
  },
  {
    id: 'native-history',
    path: '/native-american-history',
    name: 'Native American History Time Machine',
    shortName: 'Native American History',
    heading: 'NATIVE AMERICAN HISTORY TIME MACHINE',
    description: 'Explore the distinct histories of Indigenous Nations across North America with nation-specific context, careful terminology, and respect for living cultures and knowledge boundaries.',
    cardDescription: 'Journey through the histories of distinct Indigenous Nations without flattening them into one story.',
    difference: 'Nation-specific, respectful context that avoids stereotypes and protects sensitive traditions.',
    greeting: 'Which Indigenous Nation, community, place, and date or era would you like to visit? If you are unsure, tell me the region and time.',
    inputPlaceholder: 'Name a Nation or region, place, and era…',
    narrator: 'The Memory Keeper',
    image: nativeHistoryImage,
    imageAlt: 'Diverse Indigenous communities and landscapes connected across time',
    externalUrl: 'https://nativeamerican-timemachine.lovable.app/?via=aiwebtools',
    externalLabel: 'Open original Native American History app',
    externalPlatform: 'Lovable App',
  },
  {
    id: 'unwritten-history',
    path: '/unwritten-history',
    name: 'Time Machine of Unwritten History GPT',
    shortName: 'Unwritten History',
    heading: 'TIME MACHINE OF UNWRITTEN HISTORY GPT',
    description: 'Investigate gaps in the record through archaeology, surviving testimony, material evidence, and responsible historical inference—without turning uncertainty into invented fact.',
    cardDescription: 'Enter the silences in the historical record while keeping evidence, uncertainty, and imagination clearly separated.',
    difference: 'Explores overlooked perspectives and missing records with transparent evidence boundaries.',
    greeting: 'What overlooked event, lost place, silenced perspective, date, and location shall we investigate together?',
    inputPlaceholder: 'Name a historical gap, date, and place…',
    narrator: 'The Keeper of Lost Pages',
    image: unwrittenHistoryImage,
    imageAlt: 'Ancient archive opening onto a mysterious archaeological time rift',
    externalUrl: 'https://chatgpt.com/g/g-6942c94dcb08819191863b6d35161f09-time-machine-of-unwritten-history-gpt',
    externalLabel: 'Open original ChatGPT version',
    externalPlatform: 'ChatGPT',
  },
];

export const timeMachineById = Object.fromEntries(
  timeMachines.map((machine) => [machine.id, machine]),
) as Record<TimeMachineId, TimeMachineConfig>;

/** Fallback external tool offered when on-site AI credits run out for a machine that has no own external version. */
export const fallbackExternal = {
  url: 'https://chatgpt.com/g/g-t8s65Zh0j-time-machine-gpt',
  platform: 'ChatGPT' as const,
  name: 'The Original Time Machine GPT',
};

/** Short, unmistakable label for an external destination, e.g. "CHATGPT VERSION". */
export const externalVersionLabel = (platform?: 'ChatGPT' | 'Lovable App') =>
  platform === 'Lovable App' ? 'LOVABLE APP VERSION' : 'CHATGPT VERSION';

/** The external option to offer for a machine, falling back to the original ChatGPT tool. */
export const externalOptionFor = (machine: TimeMachineConfig) =>
  machine.externalUrl
    ? { url: machine.externalUrl, platform: machine.externalPlatform ?? 'ChatGPT', name: machine.name }
    : fallbackExternal;
