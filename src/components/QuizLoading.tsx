import React from 'react';

const QuizLoading: React.FC = () => {
  return (
    <div className='w-1/2 bg-slate-800 px-10 h-[24rem] flex items-center justify-center flex-col rounded-xl'>
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700" />
    </div>
  )
}

export default QuizLoading