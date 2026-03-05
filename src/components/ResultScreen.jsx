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
import { useQuiz } from '../hooks/useQuiz';
import { questions } from '../data/questions';

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
      {isLowTicket ? (
        <div className="relative bg-white/5 border border-[rgba(201,168,76,0.35)] backdrop-blur-2xl rounded-[1.9rem] shadow-[0_24px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden">
          <div className="pointer-events-none absolute -inset-24 opacity-[0.09] bg-[radial-gradient(circle_at_0%_0%,#C9A84C_0,transparent_50%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_55%)]" />
          <div className="relative">
          <h3 className="text-2xl font-semibold mb-3 text-left">
            ⚠️ Sua clínica está em fase de construção — e isso é uma oportunidade.
          </h3>
          <p className="text-sm sm:text-base text-textSecondary text-left mb-2">
            O diagnóstico mostrou que existem pontos sensíveis em áreas como precificação, marketing e
            vendas.
          </p>
          <p className="text-sm sm:text-base text-textSecondary text-left">
            Isso significa que, com pequenos ajustes de método, é possível destravar crescimento sem ter
            que aumentar a carga de trabalho.
          </p>
          </div>
        </div>
      ) : (
        <div className="relative bg-white/5 border border-[rgba(201,168,76,0.35)] backdrop-blur-2xl rounded-[1.9rem] shadow-[0_24px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden">
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

      {/* Nota geral */}
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.9rem] shadow-[0_22px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 overflow-hidden">
        <div className="pointer-events-none absolute -inset-24 opacity-[0.06] bg-[radial-gradient(circle_at_0%_0%,#C9A84C_0,transparent_50%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_50%)]" />
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
      </div>

      {/* Gráficos */}
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.9rem] shadow-[0_22px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-visible">
        <div className="pointer-events-none absolute -inset-24 opacity-[0.04] bg-[radial-gradient(circle_at_0%_0%,#C9A84C_0,transparent_55%),radial-gradient(circle_at_100%_0%,#E8C96D_0,transparent_55%)]" />
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

