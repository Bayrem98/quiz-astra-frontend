import axios from "axios";
import Question from "../../@types/Question";

export function getQuestions(
  query: { category?: string; quizType?: string } | null,
  callback: (data: Question[]) => void
) {
  axios
    .get(`http://localhost:3000/question`, {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function getQuestion(id: string, callback: (data: Question) => void) {
  axios
    .get(`http://localhost:3000/question/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function addquestion(question: Question, callback: () => void) {
  axios
    .post(`http://localhost:3000/question`, question)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}

export function deleteQuestions(question: Question, callback: () => void) {
  axios
    .delete(`http://localhost:3000/question/${question._id}`)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}
