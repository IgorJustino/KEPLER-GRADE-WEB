export type ScreenId = 'landing' | 0 | 1 | 2 | 3 | 4 | 5;

export interface StudentProfile {
  name: string;
  initials: string;
  registration: string;
  course: string;
  campus: string;
  curriculum: string;
  term: string;
  current_semester: string;
  ira: number;
  credits_completed: number;
  credits_total: number;
  hours_completed: number;
  hours_total: number;
  completion_pct: number;
  sigaa_sync_minutes: number;
}

export interface SubjectItem {
  code: string;
  name: string;
  semester: number;
  hours: number;
  credits: number;
  type: string;
  status: string;
  personal_state: 'Não iniciada' | 'Cursando' | 'Concluída';
  color: 'green' | 'sand' | 'orange' | 'muted';
  foot_note: string;
  retakes: number;
  prerequisites: string[];
  dependents: string[];
  offerings_summary: string;
}

export interface SlotAllocation {
  slot: 'M1' | 'M2' | 'M3' | 'M4' | 'T23' | 'T45';
  day: 1 | 2 | 3 | 4 | 5 | 6;
  badge: string;
  compact: boolean;
}

export interface OfferingItem {
  id: string;
  code: string;
  name: string;
  short_name: string;
  sec: string;
  sec_short: string;
  credits: number;
  hours: number;
  semester: number;
  vacancies: string;
  credits_meta: string;
  prof: string;
  room: string;
  raw_code: string;
  days_summary: string;
  meetings: string;
  status_badge: string;
  status_type: 'selected' | 'eligible' | 'conflict' | 'blocked';
  accent: 'orange' | 'green' | 'cyan' | 'sand' | 'blue' | 'muted';
  explain: string;
  selected: boolean;
  eligible: boolean;
  turno: string;
  slots: SlotAllocation[];
}

export interface SimulatorData {
  kpis: { title: string; value: string; sub: string; accent: string }[];
  priorities: {
    pos: string;
    code: string;
    name: string;
    tinfo: string;
    slots: string;
    urgency: string;
    accent: string;
  }[];
  bottlenecks: {
    name: string;
    badge: string;
    desc: string;
    accent: string;
  }[];
}

export interface KeplerState {
  profile: StudentProfile;
  subjects: SubjectItem[];
  offerings: OfferingItem[];
  simulator: SimulatorData;
}
