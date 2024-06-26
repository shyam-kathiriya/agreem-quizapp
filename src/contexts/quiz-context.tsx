

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  totalQuestion: number,
  currentQuestion: number;
  progressState: string;
  questions: QuizQuestion[];
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  setProgressState: React.Dispatch<React.SetStateAction<ProgressState>>;
  handleStartQuiz: () => void;
  handleAnsSubmit: (ans: string | boolean) => void;
  handleTryAgain: () => void;
}

const initialState: Props = {
  totalQuestion: 10,
  currentQuestion: 0,
  progressState: 'start',
  questions: [],
  setCurrentQuestion: () => { },
  setProgressState: () => { },
  handleStartQuiz: () => { },
  handleAnsSubmit: () => { },
  handleTryAgain: () => { },
}

const QuizContext = createContext<Props>(initialState);

const useQuizContext = () => useContext(QuizContext);

const QuizContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [progressState, setProgressState] = useState<ProgressState>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const navigate = useNavigate();

  async function getQuizQuetions() {
    let response = await fetch(`https://opentdb.com/api.php?amount=${initialState.totalQuestion}`);
    response = await response.json();
    return response;
  }

  const handleStartQuiz = async () => {
    setProgressState('load');
    const res: any = await getQuizQuetions();
    if (res.response_code === 0) {
      setQuestions(res.results);
      setProgressState('quiz');
    } else {
      alert('Data fetch issue please try again.');
      setProgressState('start');
    }
  }

  const handleAnsSubmit = (ans: string | boolean) => {
    const _ques = [...questions];
    _ques[currentQuestion].user_selected_answer = ans;
    _ques[currentQuestion].result = _ques[currentQuestion].correct_answer === ans;
    setQuestions(_ques);
  }

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setProgressState('start');
    setQuestions([]);
    navigate('/quiz');
  }

  return (
    <QuizContext.Provider value={{
      ...initialState,
      currentQuestion,
      progressState,
      questions,
      setCurrentQuestion,
      setProgressState,
      handleStartQuiz,
      handleAnsSubmit,
      handleTryAgain
    }}>
      {children}
    </QuizContext.Provider>
  )
}

export { QuizContextProvider, useQuizContext }
