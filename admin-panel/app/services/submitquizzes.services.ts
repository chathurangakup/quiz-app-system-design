// REMOVE: import { cookies } from "next/headers";
import {
  SubmissionDetail,
  SubmitQuizzesResponse,
} from "../types/submitquizzes.types";
import api from "./api"; // Import your axios instance

export const submitquizzesService = {
  getAllSubmitQuizzes: async (): Promise<SubmitQuizzesResponse> => {
    // Axios automatically sends the cookie because of 'withCredentials: true'
    const response = await api.get<SubmitQuizzesResponse>(
      "/submitquiz/getsubmitquiz",
    );
    return response.data;
  },

  getSubmissionDetail: async (id: string): Promise<SubmissionDetail> => {
    const response = await api.get<SubmissionDetail>(
      `/submitquiz/getsubmitquiz/${id}`,
    );
    return response.data;
  },
};
