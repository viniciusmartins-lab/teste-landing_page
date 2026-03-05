import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuiz } from '../hooks/useQuiz';
import { CustomSelect } from './CustomSelect';

const phoneDigits = (value) => (value || '').replace(/\D/g, '');

const formatPhone = (value) => {
  const digits = phoneDigits(value).slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const areaOptions = [
  { value: 'Dentista', label: 'Dentista', emoji: '🦷' },
  { value: 'Médico', label: 'Médico', emoji: '🩺' },
  { value: 'outros', label: 'Outros', emoji: '💼' }
];

const faturamentoOptions = [
  { value: '0k-20k', label: 'Até R$ 20.000/mês', badge: 'Iniciante', badgeColor: 'red' },
  { value: '20k-50k', label: 'R$ 20.000 a R$ 50.000/mês', badge: 'Crescendo', badgeColor: 'yellow' },
  { value: '50k-100k', label: 'R$ 50.000 a R$ 100.000/mês', badge: 'Consolidado', badgeColor: 'green' },
  { value: '100k-200k', label: 'R$ 100.000 a R$ 200.000/mês', badge: 'Premium', badgeColor: 'green' },
  { value: '200k', label: 'Acima de R$ 200.000/mês', badge: 'Elite', badgeColor: 'gold' }
];

const schema = z.object({
  nome: z.string().min(2, 'Informe seu nome completo'),
  email: z.string().email('E-mail inválido'),
  telefone: z
    .string()
    .transform((v) => phoneDigits(v))
    .refine((v) => v.length >= 10, 'Informe um WhatsApp válido'),
  empresa: z.string().min(1, 'Selecione sua área de atuação'),
  faturamento: z.string().min(1, 'Selecione o faturamento atual')
});

export function StepForm() {
  const { state, dispatch } = useQuiz();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: state.user.nome,
      email: state.user.email,
      telefone: state.user.telefone,
      empresa: state.user.empresa || '',
      faturamento: state.user.faturamento || ''
    }
  });

  const telefoneWatch = watch('telefone');

  useEffect(() => {
    // mantém máscara alinhada caso venha do estado
    if (state.user.telefone && !telefoneWatch) {
      setValue('telefone', formatPhone(state.user.telefone));
    }
  }, [setValue, state.user.telefone, telefoneWatch]);

  const onSubmit = (data) => {
    const normalizedPhone = phoneDigits(data.telefone);
    dispatch({
      type: 'SET_USER_INFO',
      payload: {
        nome: data.nome,
        email: data.email,
        telefone: normalizedPhone,
        empresa: data.empresa,
        faturamento: data.faturamento
      }
    });
    dispatch({ type: 'GO_TO_STEP', payload: 2 });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-white/5 border border-[rgba(201,168,76,0.2)] backdrop-blur-2xl rounded-[2rem] shadow-[0_22px_70px_rgba(0,0,0,0.85)] p-6 sm:p-8 space-y-6 overflow-visible"
    >
      <div className="pointer-events-none absolute -inset-16 opacity-[0.08] bg-[radial-gradient(circle_at_10%_20%,#C9A84C_0,transparent_45%),radial-gradient(circle_at_90%_10%,#E8C96D_0,transparent_50%)]" />
      <div className="relative space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-textMain" htmlFor="nome">
          Nome completo *
        </label>
        <input
          id="nome"
          type="text"
          className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-[#555] focus:outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(201,168,76,0.2)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(201,168,76,0.55)';
            e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(201,168,76,0.2)';
            e.target.style.boxShadow = 'none';
          }}
          placeholder="Como prefere ser chamado(a)?"
          {...register('nome')}
        />
        {errors.nome && <p className="text-xs text-red-400">{errors.nome.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain" htmlFor="email">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-[#555] focus:outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(201,168,76,0.2)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(201,168,76,0.55)';
              e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(201,168,76,0.2)';
              e.target.style.boxShadow = 'none';
            }}
            placeholder="seu@email.com"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain" htmlFor="telefone">
            WhatsApp *
          </label>
          <Controller
            name="telefone"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <input
                id="telefone"
                type="tel"
                inputMode="numeric"
                className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-[#555] focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(201,168,76,0.2)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(201,168,76,0.55)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(201,168,76,0.2)';
                  e.target.style.boxShadow = 'none';
                  onBlur();
                }}
                placeholder="(11) 99999-9999"
                value={value || ''}
                onChange={(e) => {
                  onChange(formatPhone(e.target.value));
                }}
              />
            )}
          />
          {errors.telefone && <p className="text-xs text-red-400">{errors.telefone.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Controller
          name="empresa"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              label="Área de atuação *"
              placeholder="Selecione sua área de atuação"
              options={areaOptions}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.empresa && <p className="text-xs text-red-400">{errors.empresa.message}</p>}
      </div>

      <div className="space-y-2">
        <Controller
          name="faturamento"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomSelect
              label="Faturamento mensal atual *"
              placeholder="Selecione a faixa da sua clínica"
              options={faturamentoOptions}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {errors.faturamento && <p className="text-xs text-red-400">{errors.faturamento.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-gradient-to-r from-cta-greenSecondary to-cta-greenPrimary text-white font-bold text-sm sm:text-base rounded-2xl py-3.5 px-4 shadow-[0_0_40px_rgba(62,161,54,0.4)] transition-transform transition-shadow duration-150 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-[0_0_55px_rgba(62,161,54,0.7)]"
      >
        Iniciar meu diagnóstico gratuito →
      </button>

      <p className="text-[11px] text-center text-textSecondary">
        ✓ Resultado imediato · ✓ Reunião ainda hoje · ✓ 100% gratuito
      </p>
      </div>
    </form>
  );
}

