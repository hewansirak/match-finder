export interface Question {
  id: string;
  slug?: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  question_id: string;
  value: string;
  label: string;
}

export interface Answer {
  id: string;
  user_id: string;
  question_id: string;
  option_id: string;
  answered_at: string;
}