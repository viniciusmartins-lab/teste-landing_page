import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import { questions } from '../data/questions';
import img02 from '../assets/img02.webp';

const NPS_COLORS = {
  detrator: '#d9534f',
  neutro: '#f0ad4e',
  promotor: '#5cb85c'
};

export function ResultScreen() {
  const {
    state: { user, summary, answers }
  } = useQuiz();

  if (!summary) return null;

  const { media, npsDetratores, npsNeutros, npsPromotores } = summary;

  const lowTicketContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
        staggerChildren: 0.15
      }
    }
  };

  const lowTicketSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1]
      }
    }
  };

  let notaClass = 'bg-nps-detrator';
  if (media >= 9) notaClass = 'bg-nps-promotor';
  else if (media >= 7) notaClass = 'bg-nps-neutro';

  const barData = questions.map((q, index) => {
    const value = answers[index] ?? 0;
    let color = NPS_COLORS.detrator;
    if (value >= 7 && value <= 8) color = NPS_COLORS.neutro;
    else if (value >= 9) color = NPS_COLORS.promotor;
    return {
      name: q.category,
      value,
      fill: color
    };
  });

  const pieData = [
    { name: 'Detratores', value: npsDetratores, fill: NPS_COLORS.detrator },
    { name: 'Neutros', value: npsNeutros, fill: NPS_COLORS.neutro },
    { name: 'Promotores', value: npsPromotores, fill: NPS_COLORS.promotor }
  ];

  const isLowTicket = user.faturamento === '0k-20k' || user.faturamento === '20k-50k';

  return (
    <div className="space-y-6 pb-28 sm:pb-32">
      {/* Cards condicionais de diagnóstico */}
      {isLowTicket ? null : (
        <div className="relative bg-white/5 border border-[rgba(201,168,76,0.35)] backdrop-blur-2xl rounded-[1.9rem] shadow-[0_18px_45px_rgba(0,0,0,0.55)] p-6 sm:p-8 overflow-hidden">
          <div className="pointer-events-none absolute -inset-24 opacity-[0.09] bg-[radial-gradient(circle_at_0%_0%,#d9534f_0,transparent_55%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_55%)]" />
          <div className="relative">
          <h3 className="text-2xl font-semibold mb-3 text-left">
            ⚠️ Sua clínica está literalmente perdendo dinheiro todos os dias.
          </h3>
          <p className="text-sm sm:text-base text-textSecondary text-left mb-2">
            O diagnóstico mostrou que sua operação está no vermelho em áreas vitais como precificação,
            marketing e vendas.
          </p>
          <p className="text-sm sm:text-base text-textSecondary text-left">
            Você pode estar trabalhando muito… e lucrando pouco — ou quase nada.
          </p>
          </div>
        </div>
      )}

      {/* Dashboard completo: nota geral + gráficos */}
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.9rem] shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-6 sm:p-8 space-y-6 overflow-visible">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_0%_0%,#C9A84C_0,transparent_55%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_55%)] rounded-[1.9rem]" />
        {/* Nota geral */}
        <div className="relative flex flex-col sm:flex-row items-center gap-4 w-full">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-1">Sua avaliação geral</h2>
            <p className="text-sm text-textSecondary">
              Esta nota resume o nível atual de estrutura da sua clínica nos 10 pilares avaliados.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400 font-medium">Média Geral</span>
            <div
              className={`${notaClass} px-5 py-3 rounded-2xl text-3xl font-bold shadow-lg border border-white/20`}
            >
              {media.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="relative">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Desempenho por categoria</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 70 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#e5e5e5' }}
                    interval={0}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#e5e5e5' }} />
                  <Tooltip
                    contentStyle={{
                      background: '#111',
                      borderRadius: 12,
                      border: '1px solid #333',
                      fontSize: 12,
                      color: '#FFFFFF'
                    }}
                    labelStyle={{ color: '#E5E5E5' }}
                    itemStyle={{ color: '#FFFFFF' }}
                  />
                  <Bar dataKey="value">
                    {barData.map((entry, index) => (
                      <Cell key={entry.name} fill={entry.fill} radius={[6, 6, 0, 0]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Distribuição NPS</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-xs text-neutral-200">{value}</span>
                    )}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#111',
                      borderRadius: 12,
                      border: '1px solid #333',
                      fontSize: 12,
                      color: '#FFFFFF'
                    }}
                    labelStyle={{ color: '#E5E5E5' }}
                    itemStyle={{ color: '#FFFFFF' }}
                    formatter={(value, name) => [`${value}`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bloco LOW TICKET completo abaixo do dashboard */}
      {isLowTicket && (
        <motion.div
          className="relative mx-auto max-w-[900px] rounded-[2rem] border border-[rgba(201,168,76,0.35)] bg-white/5 shadow-[0_22px_60px_rgba(0,0,0,0.55)] overflow-hidden"
          variants={lowTicketContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="pointer-events-none absolute -inset-32 opacity-[0.4] bg-[radial-gradient(circle_at_0%_0%,rgba(201,168,76,0.32)_0,transparent_55%),radial-gradient(circle_at_100%_0%,rgba(201,168,76,0.16)_0,transparent_60%)]" />
          <div className="relative p-6 sm:p-10 space-y-10">
            {/* Seção 1 — Masterclass */}
            <motion.section
              className="space-y-6"
              variants={lowTicketSectionVariants}
            >
              <div className="relative bg-white/5 border border-[rgba(201,168,76,0.2)] backdrop-blur-xl rounded-[1.5rem] p-6 sm:p-10 shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
                <div className="relative space-y-6">
                  <header className="space-y-2">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gold-soft/80">
                      Masterclass para clínicas em crescimento
                    </p>
                    <h3 className="font-playfair text-[28px] sm:text-[36px] leading-tight font-semibold text-textMain">
                      Você já deu o primeiro passo, que foi o Quiz
                    </h3>
                    <p className="text-sm sm:text-base text-textSecondary/90 max-w-2xl">
                      Foi exatamente por isso que criamos uma masterclass com todos os fundamentos do
                      marketing odontológico para ver sua clínica cheia de pacientes particulares
                      recorrentes.
                    </p>
                  </header>

                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-textSecondary">
                      Uma aula prática, direta e acessível, onde você vai entender:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        '5 estratégias para captar mais pacientes',
                        'Mapeamento da jornada do lead',
                        'Cálculo de previsibilidade com marketing',
                        'Linha editorial de postagens para cada dia',
                        '3 estratégias para fluxo de caixa rápido'
                      ].map((item) => (
                        <div
                          key={item}
                          className="inline-flex items-start gap-3 rounded-xl bg-[rgba(46,204,113,0.08)] border border-[rgba(46,204,113,0.2)] px-4 py-3 text-sm sm:text-[15px] text-textMain shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
                        >
                          <span className="mt-[6px] h-2 w-2 rounded-full bg-[#2ECC71]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="space-y-1 text-sm sm:text-base text-textSecondary">
                      <p>Sem promessas milagrosas. Sem teoria desnecessária. Sem dias de estudo.</p>
                      <p>
                        Tudo que você precisa saber, em 2 horas de aula, por apenas{' '}
                        <span className="text-[20px] font-semibold text-[#C9A84C]">
                          12x de R$10,59 (ou R$127 à vista)
                        </span>
                        .
                      </p>
                      <p className="text-textSecondary/90">
                        Este é o próximo passo LÓGICO rumo aos 300k de faturamento.
                      </p>
                    </div>

                    <div className="pt-2">
                      <motion.a
                        href="https://pay.hotmart.com/N99359746A"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#2ECC71,#27AE60)] px-10 py-4 text-[16px] sm:text-[17px] font-semibold tracking-wide text-white shadow-[0_0_32px_rgba(46,204,113,0.35)] hover:shadow-[0_0_44px_rgba(46,204,113,0.7)] transition-transform duration-150 hover:-translate-y-0.5"
                        whileHover={{
                          scale: 1.03,
                          boxShadow: '0 0 40px rgba(46,204,113,0.7)',
                          transition: { duration: 0.35, repeat: Infinity, repeatType: 'reverse' }
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        QUERO ASSISTIR A AULA
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Divisor */}
            <div className="border-t border-[rgba(201,168,76,0.15)]" />

            {/* Seção 2 — Prova social */}
            <motion.section
              className="relative grid gap-6 sm:gap-8"
              variants={lowTicketSectionVariants}
            >
              <div className="relative space-y-4">
                <h4 className="text-lg sm:text-[20px] font-semibold text-textMain max-w-2xl">
                  Dos 7.500 dentistas que já ajudei, a imensa maioria sofre com os mesmos problemas
                  identificados no seu diagnóstico…
                </h4>
                <p className="text-sm sm:text-base text-textSecondary/90 max-w-xl">
                  Porque ninguém aprende, na formação:
                </p>
                <div className="space-y-3">
                  {[
                    'Como estruturar marketing com previsibilidade',
                    'Como precificar pensando em margem real',
                    'Como transformar interesse em tratamento fechado'
                  ].map((item) => (
                    <div
                      key={item}
                      className="border-l-2 border-[#C9A84C] pl-4 text-sm sm:text-[15px] text-textMain"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-sm sm:text-[15px] text-textSecondary/90 max-w-xl">
                  O problema não é falta de esforço. É falta de direção clara.
                </p>
              </div>
            </motion.section>

            {/* Divisor */}
            <div className="border-t border-[rgba(201,168,76,0.15)]" />

            {/* Seção 3 — Instrutor */}
            <motion.section
              className="relative grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center"
              variants={lowTicketSectionVariants}
            >
              <div className="space-y-5">
                <h4 className="font-playfair text-2xl sm:text-[28px] font-semibold text-textMain">
                  Quem <span className="italic text-[#C9A84C]">ministra</span> a aula?
                </h4>
                <p className="text-sm sm:text-base text-textSecondary/90">
                  Ricardo Novack é referência em gestão e marketing odontológico, atuando como sócio e mentor
                  de algumas das clínicas de maior faturamento do país.
                </p>
                <div className="space-y-3">
                  {[
                    'Sócio-proprietário de 8 clínicas odontológicas. Fundou a primeira escola de gestão e marketing para odontologia do Brasil',
                    'Mais de 7.500 dentistas e profissionais da saúde participaram de seus cursos on-line e presenciais',
                    'Clínicas clientes alcançando faturamentos de até R$1milhão/mês',
                    'Proprietário da clínica com maior faturamento em 2024 segundo o Clinicorp'
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[10px] bg-[rgba(201,168,76,0.05)] px-4 py-3 text-sm sm:text-[15px] text-textMain"
                    >
                      <span className="mt-[3px] text-sm text-[#C9A84C]">★</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-[22px] bg-[radial-gradient(circle_at_0%_0%,rgba(201,168,76,0.35),transparent_55%)] opacity-60 blur-md" />
                  <div className="relative rounded-[20px] border border-[rgba(201,168,76,0.4)] bg-black/60 overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.6)] max-w-[380px]">
                    <img
                      src={img02}
                      alt="Foto de Ricardo Novack"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      )}

      {/* Barra fixa CTA WhatsApp */}
      <div className="fixed bottom-0 inset-x-0 z-20">
        <div className="mx-auto max-w-5xl px-4 pb-4">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 shadow-[0_18px_60px_rgba(0,0,0,0.95)]">
            <div className="flex-1 text-sm text-textSecondary">
              <span className="font-semibold text-gold-soft">
                Quer um plano prático para aplicar esse diagnóstico?
              </span>{' '}
              Fale agora com nosso time e receba orientações personalizadas para a sua clínica.
            </div>
            <a
              href="https://wa.me/5511978377742"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cta-greenSecondary to-cta-greenPrimary text-sm font-semibold shadow-[0_0_30px_rgba(46,204,113,0.55)] hover:shadow-[0_0_40px_rgba(46,204,113,0.8)] transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Abrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

