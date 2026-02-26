"use client";

import { Clock, TrendingUp, Users } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  category: string;
  participants: number;
  completionRate: number;
  avgTime: string;
  rating: number;
}

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    category: "Programming",
    participants: 1245,
    completionRate: 78,
    avgTime: "12m 34s",
    rating: 4.8,
  },
  {
    id: "2",
    title: "React Hooks Mastery",
    category: "Web Development",
    participants: 987,
    completionRate: 85,
    avgTime: "18m 12s",
    rating: 4.9,
  },
  {
    id: "3",
    title: "TypeScript Advanced",
    category: "Programming",
    participants: 756,
    completionRate: 72,
    avgTime: "25m 45s",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Node.js Backend",
    category: "Backend",
    participants: 654,
    completionRate: 68,
    avgTime: "32m 10s",
    rating: 4.6,
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    category: "Design",
    participants: 543,
    completionRate: 91,
    avgTime: "15m 30s",
    rating: 4.9,
  },
];

export default function TopQuizzes() {
  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Top Performing Quizzes
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Most popular quizzes by engagement
        </p>
      </div>

      <div className="space-y-4">
        {mockQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4 hover:bg-white hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                  <span className="text-sm font-medium text-blue-600">
                    {quiz.rating}/5
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{quiz.category}</p>

                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {quiz.participants.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {quiz.completionRate}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {quiz.avgTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All Quizzes →
        </button>
      </div>
    </div>
  );
}
