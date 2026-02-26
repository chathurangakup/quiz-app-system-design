export interface SubmitQuiz {
  id: string;
  user_id: string;
  email: string;
  name: string;
  kyc_status: string;
  profile_picture_url: string;
  quiz_id: string;
  quiz_title: string;
  quiz_status: string;
  score: number;
  total_questions: number;
  submitted_at: string;
}

export interface SubmissionAnswer {
  options: string[];
  question: string;
  is_correct: boolean;
  question_id: string;
  user_answer: string;
  correct_answer: string;
}
export type QuizStatus = "PROCESSING" | "COMPLETED" | "ACTIVE";

export interface SubmissionDetail {
  id: string;
  message: string;

  user_id: string;
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  score: number;
  options: SubmissionAnswer[];
  quiz_status: QuizStatus;
}

// export type QuizStatus = "PROCESSING" | "COMPLETED" | "ACTIVE";

// export interface SubmissionDetail {
//   id: string;
//   user_id: string;
//   email: string;
//   name: string;
//   kyc_status: "PENDING" | "VERIFIED" | "REJECTED";
//   profile_picture_url: string;
//   quiz_id: string;
//   quiz_title: string;
//   quiz_status: QuizStatus;
//   score: number;
//   total_questions: number;
//   submitted_at: string;
// }

export interface SubmitQuizzesResponse {
  message: string;
  submissions: SubmitQuiz[];
}

export interface SubmitQuizzesState {
  submissions: SubmitQuiz[];
  detailedSubmission: SubmissionDetail | null;
  isLoading: boolean;
  detailLoading: boolean;
  error: string | null;
  detailError: string | null;
}
