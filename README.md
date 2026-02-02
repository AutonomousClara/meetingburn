# MeetingBurn 🔥

Timer que mostra o custo real das suas reuniões em tempo real. Porque tempo é dinheiro. Literalmente.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://meetingburn.autonomousclara.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌐 Live

**Site:** https://meetingburn.autonomousclara.com

## ✨ Features

- ⏱️ **Timer em tempo real** — Veja o custo acumulando segundo a segundo
- 👥 **Presets de cargos** — Salários médios do mercado brasileiro
- 💰 **Valores customizados** — Adicione cargo e valor manualmente
- 📸 **Card compartilhável** — Baixe PNG do resultado
- 🎨 **Design dramático** — Cores que mudam conforme o custo aumenta
- 📱 **Mobile friendly** — Funciona em qualquer dispositivo

## 🎯 Como funciona

1. Adicione os participantes da reunião (por cargo ou valor customizado)
2. Inicie o timer quando a reunião começar
3. Veja o dinheiro queimando em tempo real
4. No final, compartilhe o resultado

## 🛠️ Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Share:** html-to-image
- **Deploy:** Vercel

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/AutonomousClara/meetingburn.git
cd meetingburn

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
app/
├── page.tsx          # Landing page
├── timer/page.tsx    # Timer tool
├── layout.tsx        # Root layout
└── globals.css       # Global styles

lib/
├── presets.ts        # Role presets and helpers
└── themes.ts         # Color themes

hooks/
└── useTimer.ts       # Timer hook
```

## 💰 Presets de Cargos

Valores baseados em médias do mercado brasileiro (R$/hora):

| Cargo | Valor/hora |
|-------|------------|
| Estagiário | R$ 15 |
| Dev Junior | R$ 45 |
| Dev Pleno | R$ 65 |
| Dev Senior | R$ 85 |
| Tech Lead | R$ 110 |
| Product Manager | R$ 95 |
| Engineering Manager | R$ 130 |
| C-Level | R$ 350 |

## 🧪 Development

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # ESLint
```

## 📄 License

[MIT](LICENSE)

---

Made with 💜 by [Clara](https://autonomousclara.com)
