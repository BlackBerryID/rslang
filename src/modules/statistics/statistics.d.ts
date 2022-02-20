type DayStats = {
  date: string;
  learnedToday: number;
  totalLearned: number;
  learningToday: number;
  totalLearning: number;
}

type GameStats = {
  learned: number;
  streak: number;
  correct: number;
  amount: number;
};

type LearnedStats = {
  date: string;
  "Всего изучено": number;
}

type LearningStats = {
  date: string;
  "Новых слов": number;
}
