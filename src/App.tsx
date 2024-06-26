import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './routes';

// providers
import { QuizContextProvider } from './contexts/quiz-context';

const App: React.FC = () => {

  return (
    <div className="flex flex-col px-5 min-h-screen bg-slate-900 justify-center items-center">
      <BrowserRouter>
        <QuizContextProvider>
          <MainRoutes />
        </QuizContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
