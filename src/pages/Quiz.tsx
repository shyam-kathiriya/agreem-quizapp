import React from 'react'

// contexts
import { useQuizContext } from '../contexts/quiz-context'

// components
import QuizStart from '../components/QuizStart';
import QuizLoading from '../components/QuizLoading';
import Question from '../components/Question';

const Quiz: React.FC = () => {

  const { progressState, questions, currentQuestion } = useQuizContext();

  return (
    <>
      {progressState === 'start' && <QuizStart />}

      {progressState === 'load' && <QuizLoading />}

      {progressState === 'quiz' && <Question {...questions[currentQuestion]} />}
    </>
  )
}

export default Quiz