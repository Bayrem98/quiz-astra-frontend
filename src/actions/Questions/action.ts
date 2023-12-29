import axios from "axios";
import Question from "../../@types/Question";

export function getQuestions(
  query: { category?: string; quizType?: string } | null,
  callback: (data: Question[]) => void
) {
  axios
    .get(`${process.env.REACT_APP_API_URL}/question`, {
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
    .get(`${process.env.REACT_APP_API_URL}/question/` + id, {
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
    .post(`${process.env.REACT_APP_API_URL}/question`, question)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}

export function deleteQuestions(question: Question, callback: () => void) {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/question/${question._id}`)
    .then(() => {
      callback();
    })
    .catch((e) => {
      console.error(e);
    });
}
