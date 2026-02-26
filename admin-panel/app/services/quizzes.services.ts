import { Quiz, QuizOptionsResponse } from "../types/index";
import api from "./api";

export interface QuizResponse {
  quizzes: Quiz[];
  total: number;
}

export interface CreateQuizPayload {
  title: string;
  description: string;
  image_url: string;
  total_questions: number;
  reward_amount: number;
  difficulty: string;
  deadline: string;
  created_by: string;
}

export const quizzesService = {
  getAllQuizzes: async (difficulty?: string): Promise<QuizResponse> => {
    const params = new URLSearchParams();
    if (difficulty) {
      params.append("difficulty", difficulty);
    }
    const response = await api.get(
      `/quiz/all${params.toString() ? `?${params.toString()}` : ""}`,
    );
    return response.data;
  },

  createQuiz: async (payload: CreateQuizPayload): Promise<any> => {
    const response = await api.post("/quiz/create-with-details", payload);
    return response.data;
  },

  getQuizOptions: async (quizId: string): Promise<QuizOptionsResponse> => {
    const response = await api.get(`/qoptions/quiz/${quizId}`);
    return response.data;
  },

  createQuizOption: async (payload: {
    quiz_id: string;
    question: string;
    option_text: string[];
    correct_ans: string;
  }): Promise<any> => {
    const response = await api.post("/qoptions/create", payload);
    return response.data;
  },
  updateQuizStatus: async (
    quizId: string,
    status: "ACTIVE" | "PROCESSING" | "COMPLETED",
  ): Promise<any> => {
    const response = await api.put(`/quiz/${quizId}/status`, {
      status,
    });
    return response.data;
  },
};
