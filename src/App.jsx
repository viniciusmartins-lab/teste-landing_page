import { AnimatePresence, motion } from 'framer-motion';
import { StepForm } from './components/StepForm';
import { ProgressBar } from './components/ProgressBar';
import { QuizQuestion } from './components/QuizQuestion';
import { MidwayStep } from './components/MidwayStep';
import { ResultScreen } from './components/ResultScreen';
import { useQuiz, QuizProvider } from './hooks/useQuiz';
import { questions } from './data/questions';
import Header from './components/Header';

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function QuizFlow() {
  const {
    state: { step, currentQuestionIndex, isMidway, answers },
    dispatch
  } = useQuiz();

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = answers[currentQuestionIndex];

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1 && !isMidway;

  const canGoNext =
    step === 2
      ? isMidway || typeof selectedValue === 'number'
      : true;

  const handleSelectAnswer = (value) => {
    dispatch({ type: 'SET_ANSWER', payload: { index: currentQuestionIndex, value } });
  };

  const handleNext = () => {
    if (!canGoNext) return;
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handlePrev = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  const progressCurrent = isMidway ? currentQuestionIndex + 1 : currentQuestionIndex + 1;

  return (
    <div className="min-h-screen text-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 pt-0 pb-6 sm:pt-0 sm:pb-10 space-y-6">
          <section className="pt-5 pb-2 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold-soft">
              SUCESSODONTO • DIAGNÓSTICO EMPRESARIAL
            </p>
            <h1 className="font-playfair text-[clamp(32px,5vw,56px)] leading-[1.15] text-textMain">
              <span className="block font-normal">Descubra por que sua clínica</span>
              <span className="block font-extrabold">
                não fatura o que{' '}
                <span className="text-gold italic">deveria</span>
              </span>
            </h1>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[12px] text-[#666666] w-fit">
              <span>⏱ 3 minutos · Resultado imediato ao final</span>
            </div>
          </section>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="mb-[88px] sm:mb-[88px]">
                  <p className="inline-flex items-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] px-3.5 py-1 text-[11px] uppercase tracking-[0.15em] text-gold-soft">
                    ETAPA 1  /  SEUS DADOS
                  </p>
                  <p className="mt-3 text-[15px] sm:text-[16px] text-[#C8C8C8] leading-[1.8] max-w-xl text-left">
                    Em menos de 3 minutos nossa análise identifica os gargalos que travam o crescimento
                    da sua clínica — e quem concluir pode falar com nosso time ainda hoje.
                  </p>
                </div>
                <StepForm />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="mb-6 sm:mb-8">
                  <p className="inline-flex items-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] px-3.5 py-1 text-[11px] uppercase tracking-[0.15em] text-gold-soft">
                    ETAPA 2  /  RODA DOS 10 PILARES
                  </p>
                  <p className="mt-3 text-[15px] sm:text-[16px] text-[#C8C8C8] leading-[1.8] max-w-xl text-left">
                    Dê uma nota de 1 a 10 para cada pilar. Seja{' '}
                    <span className="italic text-gold-soft">sincero(a)</span>: quanto mais realista, mais
                    preciso será o diagnóstico.
                  </p>
                </div>

                <ProgressBar current={progressCurrent} total={totalQuestions} />

                <AnimatePresence mode="wait">
                  {isMidway ? (
                    <MidwayStep key="midway" />
                  ) : (
                    <motion.div
                      key={currentQuestion.id}
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <QuizQuestion
                        index={currentQuestionIndex + 1}
                        total={totalQuestions}
                        question={currentQuestion}
                        selectedValue={selectedValue}
                        onSelect={handleSelectAnswer}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0 && !isMidway}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-textSecondary bg-black/40 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#111111] transition"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cta-greenSecondary to-cta-greenPrimary text-white shadow-[0_0_26px_rgba(46,204,113,0.6)] disabled:opacity-40 disabled:cursor-not-allowed transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    {isMidway ? 'Continuar' : isLastQuestion ? 'Finalizar' : 'Avançar'}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="mb-6 sm:mb-8">
                  <p className="inline-flex items-center rounded-full border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] px-3.5 py-1 text-[11px] uppercase tracking-[0.15em] text-gold-soft">
                    ETAPA 3  /  SEU DIAGNÓSTICO
                  </p>
                  <p className="mt-3 text-[15px] sm:text-[16px] text-[#C8C8C8] leading-[1.8] max-w-xl text-left">
                    Este é o mapa dos principais gargalos e oportunidades da sua clínica. Use-o para
                    direcionar suas próximas decisões estratégicas.
                  </p>
                </div>
                <ResultScreen />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <QuizFlow />
    </QuizProvider>
  );
}

