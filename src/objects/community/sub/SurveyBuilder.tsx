import { ChangeEvent, useState } from "react";
import { GreenButton } from "../../../components/buttons/BasicButtons";
import { Input, Label, LabelSize } from "../../../components/input/TextInput";
import { MouseEvent } from "react";

enum QuestionType {
  FreeResponse,
}

interface Question {
  id: string;
  label: string;
  value: string;
  name: string;
  questionType: QuestionType;
  editing: boolean;
}

const DeleteX = () => (
  <div className="relative">
    <input type="text" className="bg-white rounded-md shadow-sm p-2 w-full" />
  </div>
);

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
};

const QuestionBuilder = ({
  deleteHandler,
  saveHandler,
  changeHandler,
  question,
  editing,
}: {
  deleteHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  saveHandler: (e: MouseEvent<HTMLButtonElement>) => void;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  question: Question;
  editing: boolean;
}) => {
  return (
    <div className="mt-2 flex p-4 justify-between items-center border border-gray-500">
      <button onClick={deleteHandler}>
        <DeleteIcon />
      </button>
      <Label id={question.id} text={question.label} size={LabelSize.Medium} />
      <div className="w-2/3">
        {editing ? (
          <Input
            id={question.id}
            name={question.name}
            changeHandler={changeHandler}
            value={question.value}
          />
        ) : (
          <span>{question.value}</span>
        )}
      </div>
      <button onClick={saveHandler}>{editing ? "Save" : "Edit"}</button>
    </div>
  );
};

type InputChangeEvent = ChangeEvent<HTMLInputElement>;

const newQuestion = {
  id: "uuid",
  label: "Question 1", // needs to be generated
  value: "", // handled by parent component
  name: "q1", // also to be generated
  questionType: QuestionType.FreeResponse, // can be selected
  editing: true,
};

export default () => {
  const [questions, setQuestions] = useState<Record<string, Question>>({
    [newQuestion.name]: newQuestion,
  });

  const changeHandler = (e: InputChangeEvent) => {
    const updatedQ = { ...questions[e.target.name], value: e.target.value };

    setQuestions({
      ...questions,
      [e.target.name]: updatedQ,
    });
  };

  const createNewQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const qNumber = Object.keys(questions).length + 1;
    const qLabel = `Question ${qNumber}`;
    const nextQuestion = {
      id: `${qNumber}`,
      label: qLabel,
      name: `q${qNumber}`,
      value: "",
      questionType: QuestionType.FreeResponse,
      editing: true,
    };

    for (const k in questions) {
      questions[k] = { ...questions[k], editing: false };
    }

    setQuestions({ ...questions, [nextQuestion.name]: nextQuestion });
  };

  const copyQuestion = (q: Question, index: number) => {
    const id = `${index + 1}`;
    const label = `Question ${id}`;
    const name = `q${id}`;
    return {
      ...q,
      id,
      label,
      name,
    };
  };

  const deleteHandler =
    (targetName: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const updatedQs: Record<string, Question> = Object.keys(questions)
        .filter((n) => n !== targetName)
        .map((k, i: number) => {
          console.log(k, i);
          const newQ = copyQuestion(questions[k], i);
          return {
            [newQ.name]: newQ,
          };
        })
        .reduce((prev, curr) => {
          return {
            ...prev,
            ...curr,
          };
        });

      setQuestions({ ...updatedQs });
    };

  const saveHandler =
    (targetName: string) => (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      if (!questions[targetName].editing) {
        setQuestions({
          ...questions,
          [targetName]: { ...questions[targetName], editing: true },
        });
      } else {
        setQuestions({
          ...questions,
          [targetName]: { ...questions[targetName], editing: false },
        });
      }
    };

  return (
    <div>
      <h2 className="text-xl py-2">Entrance Survey</h2>
      <div className="bg-slate-200 p-3 border border-slate-400 shadow-sm">
        {Object.values(questions).map((q) => (
          <QuestionBuilder
            deleteHandler={deleteHandler(q.name)}
            saveHandler={saveHandler(q.name)}
            editing={q.editing}
            question={q}
            changeHandler={changeHandler}
          />
        ))}
        <div className="w-1/4 p-3">
          <GreenButton clickHandler={createNewQuestion}>
            <div className="flex justify-around items-center">
              <AddIcon />
              <span>Question</span>
            </div>
          </GreenButton>
        </div>
      </div>
    </div>
  );
};
