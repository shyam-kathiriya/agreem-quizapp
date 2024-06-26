import React from 'react'
import { useQuizContext } from '../contexts/quiz-context';

const QuizStart: React.FC = () => {
  const {  handleStartQuiz } = useQuizContext();

  return (
    <div className='w-1/2 bg-slate-800 px-10 h-[24rem] flex items-center justify-center flex-col rounded-xl'>
      <h1 className='text-white text-5xl'>Welcome to The React Quiz!</h1>
      <p className='my-5 text-gray-50 text-center text-xl'>Test Your General Knowledge</p>

      <button
        className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all"
        onClick={handleStartQuiz}
      >
        Let's Start
      </button>
    </div>
  )
}

export default QuizStart