// store/task/task.mappers.ts
import { Difficulty, QuizTask, Task } from "./task.types";

/* ---------- Quiz List Mapper ---------- */
export const mapQuizToTask = (quiz: any): Task => ({
  id: quiz.id,
  title: quiz.title,
  description: quiz.description,
  category: "Quiz",
  reward: Number(quiz.reward_amount ?? quiz.reward ?? 0),
  difficulty: (quiz.difficulty ?? "easy").toLowerCase() as Difficulty,
  status: "pending",
  estimatedTime: `${quiz.total_questions ?? 0} min`,
  createdAt: quiz.created_at ?? new Date().toISOString(),
  image_url: quiz.image_url,
  isdisabled: quiz.isdisabled ?? false,
});

/* ---------- Single Quiz Mapper ---------- */
export const mapQuizToQuizTask = (data: any): QuizTask => ({
  id: data.options?.[0]?.quiz_id ?? "",
  questions:
    data.options?.map((q: any) => ({
      id: q.id,
      question: q.question,
      options: q.option_text ?? [],
    })) ?? [],
  category: "Quiz",
  status: "pending",
  estimatedTime: `${data.options?.length ?? 0} min`,
  reward: Number(data.reward_amount ?? data.reward ?? 0),
});
