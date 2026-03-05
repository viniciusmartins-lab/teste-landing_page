import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { questions } from '../data/questions';

const QuizContext = createContext(null);

const initialState = {
  step: 1, // 1: form, 2: quiz, 3: result
  user: {
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    faturamento: ''
  },
  answers: Array(questions.length).fill(null),
  currentQuestionIndex: 0,
  isMidway: false,
  summary: null,
  hasPosted: false
};

function computeSummary(answers) {
  const numeric = answers.filter((v) => typeof v === 'number');
  const soma = numeric.reduce((acc, v) => acc + v, 0);
  const media = numeric.length ? Number((soma / numeric.length).toFixed(1)) : 0;

  let npsDetratores = 0;
  let npsNeutros = 0;
  let npsPromotores = 0;

  numeric.forEach((nota) => {
    if (nota >= 1 && nota <= 6) npsDetratores += 1;
    else if (nota >= 7 && nota <= 8) npsNeutros += 1;
    else if (nota >= 9 && nota <= 10) npsPromotores += 1;
  });

  const respostasDetalhadas = {};
  questions.forEach((q, index) => {
    respostasDetalhadas[q.category] = answers[index] ?? 0;
  });

  return {
    media,
    npsDetratores,
    npsNeutros,
    npsPromotores,
    respostasDetalhadas
  };
}

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        step: action.payload
      };
    case 'SET_ANSWER': {
      const { index, value } = action.payload;
      const newAnswers = [...state.answers];
      newAnswers[index] = value;
      return {
        ...state,
        answers: newAnswers
      };
    }
    case 'NEXT_QUESTION': {
      // after Q4 (index 3), show midway step
      if (!state.isMidway && state.currentQuestionIndex === 3) {
        return {
          ...state,
          isMidway: true
        };
      }

      if (state.isMidway) {
        return {
          ...state,
          isMidway: false,
          currentQuestionIndex: state.currentQuestionIndex + 1
        };
      }

      if (state.currentQuestionIndex < questions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1
        };
      }

      // last question -> finish quiz
      return {
        ...state,
        step: 3,
        summary: computeSummary(state.answers)
      };
    }
    case 'PREV_QUESTION': {
      if (state.isMidway) {
        return {
          ...state,
          isMidway: false
        };
      }
      if (state.currentQuestionIndex > 0) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex - 1
        };
      }
      return state;
    }
    case 'SET_SUMMARY':
      return {
        ...state,
        summary: action.payload
      };
    case 'MARK_POSTED':
      return {
        ...state,
        hasPosted: true
      };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Envio ao webhook apenas uma vez após conclusão (step 3 e summary disponível)
  useEffect(() => {
    const { step, summary, hasPosted, user, answers } = state;
    if (step !== 3 || !summary || hasPosted) return;

    const payload = {
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      empresa: user.empresa,
      faturamento: user.faturamento,
      media: summary.media,
      respostas_detalhadas: summary.respostasDetalhadas,
      nps_detratores: summary.npsDetratores,
      nps_neutros: summary.npsNeutros,
      nps_promotores: summary.npsPromotores,
      respostas: answers
    };

    fetch('https://webmkt.sucessodonto.com.br/webhook/quiz-v4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .catch(() => {
        // erro silencioso; não bloqueia UI
      })
      .finally(() => {
        dispatch({ type: 'MARK_POSTED' });
      });
  }, [state]);

  return React.createElement(QuizContext.Provider, { value: { state, dispatch } }, children);
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) {
    throw new Error('useQuiz deve ser usado dentro de QuizProvider');
  }
  return ctx;
}

