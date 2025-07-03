import type { UserData } from "./user";

export interface QuizAnswers {
  [key: string]: string;
}
export interface Props {
  userId: string;
  userData: UserData;
  onComplete: (answers: QuizAnswers) => void;
}