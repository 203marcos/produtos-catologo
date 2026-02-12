# Catálogo de Produtos

Frontend para gerenciar um catálogo de produtos com filtros, busca e dark mode.

## Tech Stack

**React 19** - Framework JS. Escolhi porque é simples e tem grande comunidade.

**TypeScript** - Pra evitar erros bobos com tipos. Facilita refatoração depois.

**Vite** - Build tool. Muito mais rápido que Webpack no desenvolvimento. HMR funciona bem.

**Tailwind CSS** - Utilitários de CSS. Pronto pra usar, não precisa escrever CSS do zero.

**Radix UI** - Componentes base (dialogs, buttons, inputs). Já vêm acessíveis e funcionam bem.

**React Hook Form** - Gerencia estado de formulários. Leve e funciona bem com validação.

**Zod** - Validação de dados no client/server. Simples de usar.

**Sonner** - Notificações (toasts). Melhor visual que o toast padrão.

**Next-themes** - Light/dark mode. Persiste a preferência do usuário.

**Axios** - HTTP client. Mais simples que fetch puro.

## Como rodar

```bash
npm install
npm run dev
```

App roda em `http://localhost:5174`

## Estrutura

```
src/
├── components/        # Componentes da UI
│   ├── catalogo/     # Catalogo de produtos
│   └── ui/           # Componentes base (button, input, etc)
├── hooks/            # Custom hooks
├── lib/              # Funções utilitárias, tipos, schemas
└── services/         # Chamadas pra API
```

## Dark mode

Usa `next-themes`. Detecta tema do sistema automaticamente. Botão sol/lua na header muda o tema.
