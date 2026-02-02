'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import Link from 'next/link';
import { Participant, rolePresets, formatCurrency, formatTime, getCostColor } from '@/lib/presets';
import { useTimer } from '@/hooks/useTimer';

type Screen = 'setup' | 'running' | 'result';

export default function TimerPage() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [customRate, setCustomRate] = useState('');
  const [finalCost, setFinalCost] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  
  const { seconds, isRunning, start, pause, reset, stop } = useTimer();
  const resultCardRef = useRef<HTMLDivElement>(null);

  const totalHourlyRate = participants.reduce((sum, p) => sum + p.hourlyRate, 0);
  const currentCost = (totalHourlyRate / 3600) * seconds;
  const costPerMinute = totalHourlyRate / 60;

  const addFromPreset = () => {
    if (!selectedRole || !rolePresets[selectedRole]) return;
    
    const newParticipant: Participant = {
      id: Date.now().toString(),
      role: selectedRole,
      hourlyRate: rolePresets[selectedRole],
    };
    setParticipants([...participants, newParticipant]);
    setSelectedRole('');
  };

  const addCustom = () => {
    const rate = parseFloat(customRate);
    if (!customRole.trim() || isNaN(rate) || rate <= 0) return;
    
    const newParticipant: Participant = {
      id: Date.now().toString(),
      role: customRole.trim(),
      hourlyRate: rate,
    };
    setParticipants([...participants, newParticipant]);
    setCustomRole('');
    setCustomRate('');
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const startMeeting = () => {
    if (participants.length === 0) return;
    reset();
    start();
    setScreen('running');
  };

  const endMeeting = () => {
    stop();
    setFinalCost(currentCost);
    setFinalTime(seconds);
    setScreen('result');
  };

  const newMeeting = () => {
    reset();
    setScreen('setup');
  };

  const shareResult = async () => {
    if (!resultCardRef.current) return;
    
    try {
      const dataUrl = await toPng(resultCardRef.current, {
        backgroundColor: '#0A0A0B',
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `meetingburn-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {/* SETUP SCREEN */}
        {screen === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            {/* Back */}
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-6">
              ← Voltar
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">🔥 Nova Reunião</h1>
              <p className="text-zinc-400">Adicione os participantes</p>
            </div>

            {/* Participants List */}
            <div className="card p-6 mb-6">
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wide mb-4">
                Participantes ({participants.length})
              </h2>
              
              {participants.length > 0 ? (
                <div className="space-y-2 mb-6">
                  {participants.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg"
                    >
                      <span className="font-medium">{p.role}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400 text-sm">{formatCurrency(p.hourlyRate)}/h</span>
                        <button
                          onClick={() => removeParticipant(p.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-center py-6 mb-4">
                  Nenhum participante ainda
                </p>
              )}

              {/* Add from Preset */}
              <div className="mb-4">
                <label className="text-xs text-zinc-500 uppercase tracking-wide block mb-2">
                  Adicionar por cargo
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="select flex-1"
                  >
                    <option value="">Selecione um cargo...</option>
                    {Object.entries(rolePresets).map(([role, rate]) => (
                      <option key={role} value={role}>
                        {role} — {formatCurrency(rate)}/h
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addFromPreset}
                    disabled={!selectedRole}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <span className="flex-1 h-px bg-zinc-700"></span>
                <span className="text-xs text-zinc-500">ou adicione manualmente</span>
                <span className="flex-1 h-px bg-zinc-700"></span>
              </div>

              {/* Custom Add */}
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wide block mb-2">
                  Cargo e valor customizado
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cargo/Nome"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    className="input flex-1"
                  />
                  <input
                    type="number"
                    placeholder="R$/h"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    className="input w-24"
                  />
                  <button
                    onClick={addCustom}
                    disabled={!customRole.trim() || !customRate || parseFloat(customRate) <= 0}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Summary */}
            {participants.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-6 p-4 bg-zinc-800/30 rounded-xl"
              >
                <p className="text-zinc-400">
                  Custo total por hora
                </p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(totalHourlyRate)}
                </p>
                <p className="text-zinc-500 text-sm">
                  ≈ {formatCurrency(costPerMinute)}/minuto
                </p>
              </motion.div>
            )}

            {/* Start Button */}
            <motion.button
              onClick={startMeeting}
              disabled={participants.length === 0}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-red-600 disabled:hover:to-orange-600"
              whileHover={participants.length > 0 ? { scale: 1.02 } : {}}
              whileTap={participants.length > 0 ? { scale: 0.98 } : {}}
            >
              🔥 INICIAR REUNIÃO
            </motion.button>
          </motion.div>
        )}

        {/* RUNNING SCREEN */}
        {screen === 'running' && (
          <motion.div
            key="running"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-md text-center"
          >
            {/* Timer */}
            <motion.p 
              className="text-7xl md:text-8xl font-bold tabular-nums tracking-tight mb-4"
            >
              {formatTime(seconds)}
            </motion.p>

            {/* Cost */}
            <motion.div
              className={`text-5xl md:text-6xl font-bold mb-2 transition-colors ${getCostColor(currentCost)} ${currentCost > 1000 ? 'burn-pulse' : ''}`}
            >
              {formatCurrency(currentCost)}
            </motion.div>

            {/* Cost bar */}
            <div className="h-1.5 bg-zinc-800 rounded-full mb-6 overflow-hidden max-w-xs mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((currentCost / 1000) * 100, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Info */}
            <p className="text-zinc-400 mb-10">
              +{formatCurrency(costPerMinute)} por minuto
            </p>

            {/* Controls */}
            <div className="flex gap-4 justify-center">
              <motion.button
                onClick={isRunning ? pause : start}
                className="px-8 py-3 rounded-xl font-medium bg-zinc-800 hover:bg-zinc-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? '⏸ Pausar' : '▶ Continuar'}
              </motion.button>
              <motion.button
                onClick={endMeeting}
                className="px-8 py-3 rounded-xl font-medium bg-red-600 hover:bg-red-500 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ⏹ Encerrar
              </motion.button>
            </div>

            {/* Participants info */}
            <p className="text-zinc-500 text-sm mt-10">
              👥 {participants.length} {participants.length === 1 ? 'pessoa' : 'pessoas'} • {formatCurrency(totalHourlyRate)}/h
            </p>
          </motion.div>
        )}

        {/* RESULT SCREEN */}
        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <p className="text-zinc-400 uppercase tracking-wide text-sm font-medium">
                Reunião Encerrada
              </p>
            </div>

            {/* Share Card */}
            <div 
              ref={resultCardRef}
              className="rounded-2xl p-8 text-center mb-6 border border-zinc-800"
              style={{ background: 'linear-gradient(180deg, #141415 0%, #0A0A0B 100%)' }}
            >
              <p className="text-zinc-400 mb-2">Esta reunião custou</p>
              <motion.p 
                className={`text-6xl font-bold mb-6 ${getCostColor(finalCost)}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {formatCurrency(finalCost)}
              </motion.p>
              <div className="flex justify-center gap-8 text-zinc-400 mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">{formatTime(finalTime)}</p>
                  <p className="text-xs uppercase tracking-wide">Duração</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{participants.length}</p>
                  <p className="text-xs uppercase tracking-wide">Pessoas</p>
                </div>
              </div>
              <p className="text-zinc-600 text-xs">meetingburn.vercel.app</p>
            </div>

            {/* Quote */}
            <p className="text-center text-zinc-500 italic mb-6">
              "Será que precisava dessa call?"
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                onClick={shareResult}
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📸 Baixar Imagem
              </motion.button>
              <motion.button
                onClick={newMeeting}
                className="w-full py-4 rounded-xl font-bold bg-zinc-800 hover:bg-zinc-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🔄 Nova Reunião
              </motion.button>
              <Link href="/" className="block">
                <button className="w-full py-3 text-zinc-500 hover:text-zinc-300 transition-colors text-sm">
                  ← Voltar ao início
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
