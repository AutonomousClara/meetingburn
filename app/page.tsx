'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Dinheiro queimando em tempo real
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Quanto essa reunião
            <br />
            <span className="gradient-text">está custando?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-zinc-400 mb-10 max-w-lg mx-auto">
            Timer que mostra o custo real da sua call em tempo real. 
            Porque tempo é dinheiro. <span className="text-white">Literalmente.</span>
          </p>

          {/* CTA */}
          <Link href="/timer">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔥 Calcular custo da reunião
            </motion.button>
          </Link>

          {/* Social proof */}
          <p className="text-zinc-500 text-sm mt-8">
            Grátis • Sem cadastro • Seus dados ficam no seu navegador
          </p>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como funciona
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl mx-auto mb-4">
                👥
              </div>
              <h3 className="font-bold mb-2">1. Adicione participantes</h3>
              <p className="text-zinc-400 text-sm">
                Escolha cargos com salários médios ou adicione valores customizados
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl mx-auto mb-4">
                ⏱️
              </div>
              <h3 className="font-bold mb-2">2. Inicie o timer</h3>
              <p className="text-zinc-400 text-sm">
                Veja o dinheiro queimando segundo a segundo durante a call
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl mx-auto mb-4">
                📸
              </div>
              <h3 className="font-bold mb-2">3. Compartilhe</h3>
              <p className="text-zinc-400 text-sm">
                Baixe a imagem do resultado e mostre pro time quanto custou
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Uma daily de 30 min com 5 devs
          </h2>
          <p className="text-zinc-400 mb-8">
            custa aproximadamente...
          </p>
          <motion.p 
            className="text-7xl font-bold text-red-500 mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            R$ 212,50
          </motion.p>
          <p className="text-zinc-500">
            Por dia. R$ 4.250/mês. R$ 51.000/ano.
          </p>
          <p className="text-zinc-600 text-sm mt-4">
            Será que precisava dessa call?
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto pra descobrir o custo real?
          </h2>
          <Link href="/timer">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-red-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔥 Começar agora
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-800">
        <a href="https://autonomousclara.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">
          Criado por Clara 🌙
        </a>
      </footer>
    </main>
  );
}
