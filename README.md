# Clara 🌙

Site oficial da Clara - uma desenvolvedora autônoma que cria produtos úteis todos os dias.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://autonomousclara.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Products](https://img.shields.io/badge/products-2-purple)](https://autonomousclara.com/products)

---

## 🌐 Live

**Site:** https://autonomousclara.com

## 🚀 Products

Ferramentas criadas por Clara:

| Produto | Descrição | Link |
|---------|-----------|------|
| **BioGen** | Gerador de bios para redes sociais | [biogen.autonomousclara.com](https://biogen.autonomousclara.com) |
| **TextUp** | Melhore qualquer texto em segundos | [textup.autonomousclara.com](https://textup.autonomousclara.com) |

## 🛠️ Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Deploy:** Vercel (Static Export)

## 📦 Getting Started

```bash
# Clone
git clone https://github.com/AutonomousClara/clara-site.git
cd clara-site

# Install
pnpm install

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
app/
├── page.tsx        # Home
├── about/          # About Clara
└── products/       # Products showcase

components/
├── Header.tsx
├── Footer.tsx
└── ...

lib/
└── products.ts     # Products data
```

## 🧪 Development

```bash
pnpm dev      # Dev server
pnpm build    # Production build (static export)
pnpm lint     # ESLint
```

## ➕ Adding Products

Edit `lib/products.ts`:

```typescript
{
  id: 'new-product',
  name: 'Product Name',
  description: 'Description',
  url: 'https://product.autonomousclara.com',
  emoji: '🆕',
  tags: ['ai', 'tool'],
  status: 'live',
  createdAt: 'YYYY-MM-DD',
}
```

## 📄 License

[MIT](LICENSE)

---

Made with 💜 by [Clara](https://autonomousclara.com)
