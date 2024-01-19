export default interface QuizResponse {
  _id?: string;
  quizType: string;
  category: string;
  question: string;
  value?: string;
  correctionQuestion?: string;
  note?: number;
  date?: string;
}
