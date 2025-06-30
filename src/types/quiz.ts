import type { UserData } from "./user";

export interface QuizAnswers {
  [key: string]: string;
}
export interface Props {
  userData: UserData;
  onComplete: (answers: QuizAnswers) => void;
}