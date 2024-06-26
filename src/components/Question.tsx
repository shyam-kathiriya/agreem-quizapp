import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import { useQuizContext } from '../contexts/quiz-context';

// helpers
import { insertAtRandomIndex } from '../helpers';

const Question: React.FC<QuizQuestion> = ({ difficulty, question, incorrect_answers, correct_answer }) => {

  const [selectedAns, setSelectedAns] = useState<string | boolean>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { currentQuestion, totalQuestion, handleAnsSubmit, setCurrentQuestion, setProgressState } = useQuizContext();
  const navigate = useNavigate();

  const answers = useMemo(() => insertAtRandomIndex(incorrect_answers, correct_answer), [incorrect_answers, correct_answer])

  const handleAnswerSelect = (ans: string | boolean) => {
    if (isSubmitted) return;
    setSelectedAns(ans);
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
    handleAnsSubmit(selectedAns);
  }

  const handleNextClick = () => {
    if (currentQuestion < totalQuestion - 1) {
      setCurrentQuestion(prev => prev + 1);
      setIsSubmitted(false);
      setSelectedAns('');
    } else {
      setProgressState('result');
      navigate('/quiz-result');
    }
  }

  return (
    <div className='w-1/2'>
      <div className='flex justify-between items-center mb-3'>
        <h4 className="text-xl text-white/80">Question {currentQuestion + 1} of {totalQuestion} :</h4>
        <span className={
          clsx("text-xs font-medium me-2 px-2.5 py-0.5 rounded",
            {
              "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300": difficulty === 'easy',
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ": difficulty === 'medium',
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": difficulty === 'hard',
            }
          )}
        >
          {difficulty.toUpperCase()}
        </span>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="mt-4 mb-2 text-2xl text-white">
          <div dangerouslySetInnerHTML={{ __html: question }} />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {answers.map((answer: string, index: number) => (
          <div
            key={answer}
            className={
              clsx("flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl",
                {
                  "bg-green-600 border-green-700": isSubmitted && answer === correct_answer,
                  "bg-red-600 border-red-700": isSubmitted && selectedAns === answer && selectedAns !== correct_answer,
                  "bg-gray-600 border-gray-700": !isSubmitted && selectedAns === answer,
                }
              )
            }
            onClick={() => handleAnswerSelect(answer)}
          >
            <div className="ml-2 text-white"><div dangerouslySetInnerHTML={{ __html: answer }} /></div>
          </div>
        ))}
      </div>

      <div className="flex items-end mt-2">
        {!isSubmitted && <button
          className={"py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all ml-auto disabled:pointer-events-none disabled:opacity-50"}
          onClick={handleSubmit}
          disabled={!selectedAns}
        >
          Submit
        </button>}

        {isSubmitted && <button
          className="py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all ml-auto"
          onClick={handleNextClick}
        >
          Next
        </button>}
      </div>
    </div>
  )
}

export default Question