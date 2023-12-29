import QuizResponse from "./QuizResponse";

export default interface User {
  _id?: string;
  username: string;
  password: string;
  quizResponses?: QuizResponse[];
  noteGlobal?: number;
}
