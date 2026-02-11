import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useOutletContext } from 'react-router-dom';
import { EMPLOYEES, MOCK_DASHBOARD_DATA } from '../constants';
import { FilterContextType } from '../App';

const Dashboard: React.FC = () => {
  // Recebe filtros do Header via Contexto
  const filters = useOutletContext<FilterContextType>();
  
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  
  // Dados de estado para os KPIs
  const [kpiData, setKpiData] = useState({
    concludedPct: 0,
    pendingPct: 0,
    latePct: 0,
    concludedTotal: 0,
    pendingTotal: 0,
    lateTotal: 0
  });

  // Atualiza os dados quando os filtros mudam
  useEffect(() => {
    // Lógica simples para simular mudança de dados baseada no filtro de mês
    // Na vida real, filtrariamos o array completo. Aqui pegamos o mês selecionado.
    
    // Default para Junho (índice 5)
    let currentMonthData = MOCK_DASHBOARD_DATA[5]; 

    if (filters.selectedMonth.includes('Maio')) currentMonthData = MOCK_DASHBOARD_DATA[4];
    if (filters.selectedMonth.includes('Abril')) currentMonthData = MOCK_DASHBOARD_DATA[3];

    // Cálculos de Porcentagem
    const total = currentMonthData.total;
    const cPct = Math.round((currentMonthData.concluded / total) * 100);
    const pPct = Math.round((currentMonthData.pending / total) * 100);
    const lPct = Math.round((currentMonthData.late / total) * 100);

    setKpiData({
      concludedPct: cPct,
      pendingPct: pPct,
      latePct: lPct,
      concludedTotal: currentMonthData.concluded,
      pendingTotal: currentMonthData.pending,
      lateTotal: currentMonthData.late
    });

    // Limpa insight ao mudar filtro
    setAiInsight(null);
  }, [filters]);

  // Simulação IA Fake
  const generateAIInsight = () => {
    setIsGeneratingInsight(true);
    setAiInsight(null);

    // Delay de 2.5s para simular requisição
    setTimeout(() => {
      setAiInsight(
        "Analisei os dados de Junho e notei que o setor Societário aumentou em 15% as pendências comparado ao mês anterior. Sugiro realocar mais um analista para apoiar nas alterações contratuais pendentes da empresa Tech Solutions Ltda."
      );
      setIsGeneratingInsight(false);
    }, 2500);
  };

  return (
    // [AJUSTE] Padding geral reduzido de p-8 para p-6 e espaçamento vertical de space-y-8 para space-y-4
    <div className="p-6 space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Visão Geral de Performance</h2>
          <p className="text-slate-500 font-medium mt-1">Acompanhamento consolidado e insights preditivos.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={generateAIInsight}
            disabled={isGeneratingInsight}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            <span className={`material-symbols-outlined text-lg ${isGeneratingInsight ? 'animate-spin' : ''}`}>
              {isGeneratingInsight ? 'sync' : 'auto_awesome'}
            </span>
            {isGeneratingInsight ? 'Analisando...' : 'Insight IA'}
          </button>
        </div>
      </div>

      {/* ÁREA DE INSIGHT IA */}
      {aiInsight && (
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-[1.5rem] flex gap-4 animate-in slide-in-from-top-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <span className="material-symbols-outlined text-9xl text-indigo-900">smart_toy</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
          </div>
          <div className="flex-1 z-10">
            <h4 className="text-xs font-black text-indigo-700 uppercase tracking-widest mb-2 flex items-center gap-2">
              Sugestão de Gestão (IA)
            </h4>
            <p className="text-sm text-indigo-900 leading-relaxed font-medium max-w-4xl">{aiInsight}</p>
          </div>
          <button onClick={() => setAiInsight(null)} className="text-indigo-400 hover:text-indigo-600 z-10 self-start">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      {/* GRID DE KPIs - LAYOUT COMPACTO (HORIZONTAL) */}
      {/* [AJUSTE] Gap reduzido de gap-6 para gap-4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1 - Empresas */}
        <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-center h-full">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Empresas Ativas</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-slate-800">216</h3>
                <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-lg">+12</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-xl">domain</span>
            </div>
          </div>
        </div>

        {/* KPI 2 - Concluídas */}
        <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
           <div className="flex justify-between items-center h-full">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Concluídas</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-status-success">{kpiData.concludedPct}%</h3>
                <span className="text-[10px] font-bold text-slate-400">({kpiData.concludedTotal})</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-xl">check_circle</span>
            </div>
          </div>
        </div>

        {/* KPI 3 - Pendentes */}
        <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
           <div className="flex justify-between items-center h-full">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pendentes</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-status-pending">{kpiData.pendingPct}%</h3>
                <span className="text-[10px] font-bold text-slate-400">({kpiData.pendingTotal})</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-xl">pending</span>
            </div>
          </div>
        </div>

        {/* KPI 4 - Atrasadas (Com Borda Vermelha) */}
        <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group border-l-[6px] border-l-status-error relative overflow-hidden">
           <div className="absolute right-0 top-0 w-20 h-20 bg-red-50 rounded-bl-[100%] -mr-8 -mt-8 opacity-50 pointer-events-none"></div>
           <div className="flex justify-between items-center relative z-10 h-full">
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Em Atraso</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-extrabold text-status-error">{kpiData.latePct}%</h3>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">Ação imediata</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-xl">warning</span>
            </div>
          </div>
        </div>
      </div>

      {/* GRÁFICOS E LISTA */}
      {/* [AJUSTE] Gap reduzido de gap-8 para gap-4 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico Principal */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-black text-slate-800 tracking-tight">Fluxo de Atividades</h4>
              <p className="text-sm font-medium text-slate-400">Volume semestral comparativo</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
                <div className="w-3 h-3 rounded-full bg-status-success"></div> Concluído
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
                <div className="w-3 h-3 rounded-full bg-status-pending"></div> Pendente
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
                <div className="w-3 h-3 rounded-full bg-status-error"></div> Atrasado
              </div>
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_DASHBOARD_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: '#94a3b8' }}
                  dy={15}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="concluded" name="Concluídas" fill="#078838" radius={[4, 4, 4, 4]} barSize={16} />
                <Bar dataKey="pending" name="Pendentes" fill="#f59e0b" radius={[4, 4, 4, 4]} barSize={16} />
                <Bar dataKey="late" name="Atrasadas" fill="#e73908" radius={[4, 4, 4, 4]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lista de Funcionários */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Eficiência da Equipe</h4>
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {EMPLOYEES.filter(e => e.id !== 'all').map((emp, idx) => (
              <div key={emp.id} className="space-y-3 group cursor-default">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${['bg-purple-100 text-purple-600', 'bg-blue-100 text-blue-600', 'bg-pink-100 text-pink-600', 'bg-orange-100 text-orange-600'][idx % 4]}`}>
                        {emp.name.charAt(0)}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-slate-700">{emp.name}</span>
                        <span className="text-[9px] text-slate-400 uppercase font-extrabold">{emp.area}</span>
                     </div>
                  </div>
                  <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{Math.floor(Math.random() * 15 + 85)}%</span>
                </div>
                <div className="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 group-hover:brightness-110 ${['bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-orange-500'][idx % 4]}`}
                    style={{ width: `${Math.floor(Math.random() * 15 + 85)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;