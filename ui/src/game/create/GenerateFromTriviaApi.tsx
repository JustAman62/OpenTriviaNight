import { Button, Label, Select } from "flowbite-react";
import { Question } from "../../Models";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import useApiClient from "../../useApiClient";

type Props = {
  updateQuestions: (category: string, questions: Question[]) => void;
};

type TriviaQuestionResponse = {
  correctAnswer: string;
  question: { text: string };
};

const CATEGORIES: { id: string; name: string }[] = [
  {
    id: "music",
    name: "Music",
  },
  {
    id: "sport_and_leisure",
    name: "Sport & Leisure",
  },
  {
    id: "film_and_tv",
    name: "Film & TV",
  },
  {
    id: "arts_and_literature",
    name: "Arts & Literature",
  },
  {
    id: "history",
    name: "History",
  },
  {
    id: "society_and_culture",
    name: "Society & Culture",
  },
  {
    id: "science",
    name: "Science",
  },
  {
    id: "geography",
    name: "Geography",
  },
  {
    id: "food_and_drink",
    name: "Food & Drink",
  },
  {
    id: "general_knowledge",
    name: "General Knowledge",
  },
];

export default function GenerateFromTriviaApi({ updateQuestions }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("general_knowledge");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const apiClient = useApiClient();

  const generateQuestions = () => {
    // TODO: Support tags for more fine grained categories
    apiClient.getQuestionsFromTriviaApi(selectedCategory, difficulty)?.then((res: TriviaQuestionResponse[]) => {
      const questions: Question[] = res.map((r, count) => {
        return {
          questionId: crypto.randomUUID(),
          detail: r.question.text,
          correctAnswer: r.correctAnswer,
          value: (count + 1) * 100,
          answered: false,
        };
      });
      const category = CATEGORIES.find((x) => x.id == selectedCategory);
      updateQuestions(category?.name ?? "Unknown", questions);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 grow">
          <Label className="mt-1" htmlFor="categories">Select Category</Label>
          <Select id="categories" required value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {CATEGORIES.map((c) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </Select>
        </div>

        <div className="flex-1 grow">
          <Label className="mt-2" htmlFor="difficulty">Select Difficulty</Label>
          <Select id="difficulty" required value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
      </div>

      <Button
        className="mt-4 bg-linear-to-br from-pink-500 to-orange-400 text-white hover:bg-linear-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
        onClick={generateQuestions}
      >
        <HiOutlineRefresh className="h-5 mr-2" />
        Generate Questions
      </Button>
    </div>
  );
}
