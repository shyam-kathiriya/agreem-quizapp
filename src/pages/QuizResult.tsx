import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { useQuizContext } from '../contexts/quiz-context';

const QuizResult: React.FC = () => {

  const { questions, progressState, handleTryAgain, totalQuestion } = useQuizContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (progressState !== 'result') {
      navigate('/quiz')
    }
  }, [navigate, progressState])

  return (
    <>
      <h1 className='text-center text-4xl text-slate-200 my-8'>Quiz Result</h1>
      <div className='w-1/2 flex flex-col'>
        <div className="flex justify-evenly gap-4">
          <div className='bg-indigo-300 py-5 px-7 rounded-md'>
            <p className='text-xl font-semibold  text-black'>Total Questions:</p>
            <p className='text-4xl font-extrabold text-indigo-500'>{totalQuestion}</p>
          </div>
          <div className='bg-green-300 py-5 px-7 rounded-md'>
            <p className='text-xl font-semibold  text-black'>Correct Questions:</p>
            <p className='text-4xl font-extrabold text-green-500'>
              {questions.reduce((total: number, curr: any) => (curr.result ? total + 1 : total), 0)}
            </p>
          </div>
          <div className='bg-red-300 py-5 px-7 rounded-md'>
            <p className='text-xl font-semibold  text-black'>Wrong Questions:</p>
            <p className='text-4xl font-extrabold text-red-500'>
              {questions.reduce((total: number, curr: any) => (!curr.result ? total + 1 : total), 0)}
            </p>
          </div>
        </div>

        <h2 className='text-xl text-slate-200 mt-8 mb-4'>Overview:</h2>
        {
          questions.map(({ question, result, user_selected_answer, correct_answer }, index) => (<React.Fragment key={question}>
            <div className="flex flex-col items-start w-full">
              <div className="mt-4 mb-2 text-xl text-white flex w-full gap-2 items-center justify-between" >
                <div dangerouslySetInnerHTML={{ __html: `${index + 1}: ` + question }} />
                <span className={clsx('text-sm rounded-md px-2 py-1', { 'bg-red-400': !result, 'bg-green-400': result })}>{result ? 'Correnct' : 'Wrong'}</span>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div
                className={"flex items-center w-full p-3 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl bg-green-600 border-green-700"}
              >
                <p className="ml-2 text-white">{correct_answer}</p>
              </div>
              {
                !result && <div
                  className={"flex items-center w-full p-3 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl bg-red-600 border-red-700"}
                >
                  <p className="ml-2 text-white">{user_selected_answer}</p>
                </div>
              }
            </div>
          </React.Fragment>))
        }
      </div>

      <button className='py-2 px-8 my-8 bg-green-900 text-green-100 rounded-md' onClick={handleTryAgain}>
        Try again
      </button>
    </>
  )
}

export default QuizResult