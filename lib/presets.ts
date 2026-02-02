export interface Participant {
  id: string;
  role: string;
  hourlyRate: number;
}

export const rolePresets: Record<string, number> = {
  'Estagiário': 15,
  'Dev Junior': 45,
  'Dev Pleno': 65,
  'Dev Senior': 85,
  'Tech Lead': 110,
  'Product Manager': 95,
  'Product Owner': 90,
  'Designer': 75,
  'UX Designer': 80,
  'UX Researcher': 70,
  'Data Analyst': 70,
  'Data Scientist': 95,
  'QA Engineer': 55,
  'DevOps': 90,
  'Scrum Master': 75,
  'Agile Coach': 95,
  'Engineering Manager': 130,
  'Head of Product': 150,
  'Director': 180,
  'VP': 250,
  'C-Level': 350,
  'CEO': 400,
};

export const roleCategories = {
  'Engenharia': ['Dev Junior', 'Dev Pleno', 'Dev Senior', 'Tech Lead', 'DevOps', 'QA Engineer'],
  'Produto': ['Product Manager', 'Product Owner', 'UX Designer', 'UX Researcher', 'Designer'],
  'Dados': ['Data Analyst', 'Data Scientist'],
  'Gestão': ['Scrum Master', 'Agile Coach', 'Engineering Manager'],
  'Liderança': ['Head of Product', 'Director', 'VP', 'C-Level', 'CEO'],
  'Outros': ['Estagiário'],
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function getCostColor(cost: number): string {
  if (cost < 100) return 'text-green-500';
  if (cost < 500) return 'text-yellow-500';
  if (cost < 1000) return 'text-orange-500';
  return 'text-red-500';
}

export function getCostBgColor(cost: number): string {
  if (cost < 100) return 'from-green-500/20 to-green-600/10';
  if (cost < 500) return 'from-yellow-500/20 to-yellow-600/10';
  if (cost < 1000) return 'from-orange-500/20 to-orange-600/10';
  return 'from-red-500/20 to-red-600/10';
}
