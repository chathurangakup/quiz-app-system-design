// store/task/task.types.ts

export type Difficulty = "easy" | "medium" | "hard";

/* ---------- Quiz List Item ---------- */
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  difficulty: Difficulty;
  status: "pending" | "completed" | "cancelled";
  estimatedTime: string;
  createdAt: string;
  image_url?: string;
  isdisabled?: boolean;
}

/* ---------- Quiz Question ---------- */
export interface QuizOption {
  id: string;
  question: string;
  options: string[];
}

/* ---------- Full Quiz ---------- */
export interface QuizTask {
  id: string;
  questions: QuizOption[];
  category: string;
  reward?: number;
  status: "pending" | "completed";
  estimatedTime?: string;
}

/* ---------- Slice State ---------- */
export interface TaskState {
  tasks: Task[];
  selectedTask: QuizTask | null;
  loading: boolean;
  error: string | null;
  submissions: QuizSubmission[]; // ✅ NE
}

export type QuizStatus = "ACTIVE" | "PROCESSING" | "COMPLETED";

export interface QuizSubmission {
  id: string;
  user_id: string;
  email: string;
  quiz_id: string;
  quiz_title: string;
  quiz_status: QuizStatus;
  score: number;
  total_questions: number;
  submitted_at: string;
}
