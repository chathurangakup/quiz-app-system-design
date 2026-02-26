import { taskApi } from "../api/task.api";
import { QuizAnswer } from "../store/task/task.thunks";

export const taskService = {
  getQuiz: async (difficulty?: "EASY" | "MEDIUM" | "HARD") => {
    const response = await taskApi.getAllQuiz(difficulty);
    return response.data;
  },
  getQuizById: async (quizId: string) => {
    const response = await taskApi.getQuestionsByQuizId(quizId);
    return response.data;
  },
  submitQuiz: async (quizId: string, answers: QuizAnswer[]) => {
    const response = await taskApi.submitQuiz(quizId, answers);
    return response.data;
  },
  getQuizSubmissions: async () => {
    const response = await taskApi.getQuizSubmissions();
    return response.data;
  },
};
