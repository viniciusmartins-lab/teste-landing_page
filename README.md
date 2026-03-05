## SucessOdonto – Quiz de Diagnóstico Empresarial

Aplicação React + Vite para o quiz de diagnóstico empresarial da SucessOdonto, reconstruída a partir do fluxo original em PHP.

### Stack

- **React + Vite**
- **Tailwind CSS**
- **Framer Motion** (animações entre etapas)
- **Recharts** (gráficos de barra e pizza)
- **React Hook Form + Zod** (validação de formulário)

### Como rodar o projeto

1. **Instalar dependências**

```bash
npm install
```

2. **Ambiente de desenvolvimento**

```bash
npm run dev
```

3. **Build de produção**

```bash
npm run build
```

O build será gerado na pasta `dist/`.

4. **Deploy na Vercel**

- Suba o repositório para o GitHub.
- Na Vercel, conecte o repositório.
- Configure:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

O arquivo `vercel.json` já está configurado com rewrites para SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

