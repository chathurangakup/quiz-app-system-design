import api from "../services/api";
import { QuizAnswer } from "../store/task/task.thunks";

export const taskApi = {
  getAllQuiz: (difficulty?: "EASY" | "MEDIUM" | "HARD") => {
    return api.get("/quiz/all/user/", {
      params: {
        difficulty,
      },
    });
  },
  getQuestionsByQuizId: (quizId: string) => {
    return api.get(`/qoptions/quiz/${quizId}`);
  },

  submitQuiz: (quizId: string, answers: QuizAnswer[]) => {
    return api.post(`/submitquiz/${quizId}/submit`, [answers]);
  },

  getQuizSubmissions: () => {
    return api.get("/submitquiz/my-quiz-submissions");
  },
};
