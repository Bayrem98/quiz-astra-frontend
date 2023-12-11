export default interface Question {
  _id?: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answer1: string;
  incorrect_answer2: string;
}
