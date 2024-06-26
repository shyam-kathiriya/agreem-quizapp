type ProgressState = 'start' | 'quiz' | 'load' | 'result';

type QuizQuestion = {
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_selected_answer?: string | boolean;
  result?: boolean;
};