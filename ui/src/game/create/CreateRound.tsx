import { Button, HRText, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { CreateGameRequest, Category, Question } from "../../Models";
import CreateCategory from "./CreateCategory";
import { HiPlus, HiTrash } from "react-icons/hi";
import { useState } from "react";
import GenerateCategory from "./GenerateCategory";

type Props = {
  round: Category[];
  roundNumber: number;
  setRequest: React.Dispatch<React.SetStateAction<CreateGameRequest>>;
};

export default function CreateRound({ round, roundNumber, setRequest }: Props) {
  const [genCategoryOpen, setGenCategoryOpen] = useState(false);

  const addCategory = (round: number, category?: string, questions?: Question[]) => {
    setRequest((r) => {
      const newQuestions = questions
        ? questions
        : [
            {
              questionId: crypto.randomUUID(),
              answered: false,
              correctAnswer: "",
              detail: "",
              value: 100,
            },
          ];

      const rounds = r.rounds;
      let newCategoryName = category ? category : `Category ${rounds[round].length + 1}`;
      if (newCategoryName in rounds[round]) {
        newCategoryName += Math.round(Math.random() * 100);
      }
      rounds[round].push({
        categoryId: crypto.randomUUID(),
        name: newCategoryName,
        questions: newQuestions,
      });
      return { ...r, rounds: rounds };
    });
  };

  const removeRound = () => {
    setRequest((r) => {
      r.rounds.splice(roundNumber, 1);
      return { ...r };
    });
  };

  return (
    <div className="flex flex-col">
      <HRText text={`Round ${roundNumber + 1}`} />
      <div className="flex gap-2 self-center">
        <Button className="p-5 leading-4" size="sm" onClick={() => addCategory(roundNumber)}>
          <span className="mr-2 text-lg">
            <HiPlus />
          </span>
          <span>Add Category</span>
        </Button>
        <Button
          className="p-5 leading-4 bg-linear-to-br from-pink-500 to-orange-400 text-white hover:bg-linear-to-bl focus:ring-pink-200 dark:focus:ring-pink-800"
          size="sm"
          onClick={() => setGenCategoryOpen(true)}
        >
          <span className="mr-2 text-lg">
            <HiPlus />
          </span>
          <span>Generate Category</span>
        </Button>
        <Button className="p-5 leading-4" size="sm" color="red" outline onClick={removeRound}>
          <span className="mr-2 text-lg">
            <HiTrash />
          </span>
          <span>Remove Round</span>
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap mt-4">
        {round.map((category, categoryIdx) => {
          return (
            <CreateCategory
              key={categoryIdx}
              category={category}
              categoryIndex={categoryIdx}
              setRequest={setRequest}
              roundNumber={roundNumber}
            />
          );
        })}

        <div className="flex flex-col gap-2"></div>
      </div>

      <Modal show={genCategoryOpen} size="7xl" dismissible onClose={() => setGenCategoryOpen(false)}>
        <ModalHeader>
          <span>Generate Category</span>
        </ModalHeader>
        <ModalBody>
          <GenerateCategory
            onAdd={(category, q) => {
              addCategory(roundNumber, category, q);
              setGenCategoryOpen(false);
            }}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}
