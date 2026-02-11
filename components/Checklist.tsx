import React, { useState, useMemo } from 'react';
import { COMPANIES, ACTIVITIES, MOCK_LOGS } from '../constants';
import ActivityModal from './ActivityModal';
import { ActivityStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Checklist: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0].id);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCell, setActiveCell] = useState<{ activityId: string; month: number } | null>(null);
  
  const [activitySearch, setActivitySearch] = useState('');

  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const company = COMPANIES.find(c => c.id === selectedCompany)!;

  const stats = useMemo(() => {
    const totalSlots = ACTIVITIES.length * 12;
    const companyLogs = MOCK_LOGS.filter(l => l.companyId === selectedCompany && l.year === selectedYear);
    
    const ok = companyLogs.filter(l => l.status === 'CONCLUIDA').length;
    const pd = companyLogs.filter(l => l.status === 'PENDENTE').length;
    const at = companyLogs.filter(l => l.status === 'ATRASADA').length;
    const empty = totalSlots - (ok + pd + at);

    return {
      total: totalSlots,
      ok,
      okPct: Math.round((ok / totalSlots) * 100),
      pd,
      pdPct: Math.round((pd / totalSlots) * 100),
      at,
      atPct: Math.round((at / totalSlots) * 100),
      empty,
      emptyPct: Math.round((empty / totalSlots) * 100)
    };
  }, [selectedCompany, selectedYear]);

  const chartData = [
    { name: 'OK', value: stats.ok, color: '#10b981' },
    { name: 'PD', value: stats.pd, color: '#f59e0b' },
    { name: 'AT', value: stats.at, color: '#ef4444' },
    { name: 'Vazio', value: stats.empty, color: '#e2e8f0' },
  ];

  const getStatusColor = (status?: ActivityStatus) => {
    switch (status) {
      case 'CONCLUIDA': 
        return 'bg-emerald-50 text-emerald-700 border-2 border-emerald-400 font-bold hover:bg-emerald-100 shadow-sm';
      case 'PENDENTE': 
        return 'bg-amber-50 text-amber-700 border-2 border-amber-400 font-bold hover:bg-amber-100 shadow-sm';
      case 'ATRASADA': 
        return 'bg-red-50 text-red-700 border-2 border-red-400 font-bold hover:bg-red-100 shadow-sm';
      default: 
        return 'bg-slate-50 text-slate-400 border-2 border-dashed border-slate-200 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600';
    }
  };

  const handleCellClick = (activityId: string, month: number) => {
    setActiveCell({ activityId, month });
    setIsModalOpen(true);
  };

  const filteredActivities = ACTIVITIES.filter(a => 
    a.title.toLowerCase().includes(activitySearch.toLowerCase())
  );

  return (
    // [CORREÇÃO] h-full -> min-h-screen ou h-screen com flex-col para garantir scroll em landscape
    <div className="flex flex-col h-full md:h-screen bg-[#f6f7f8] p-4 md:p-6 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
      
      {/* 1. Área de Resumo (Responsiva) */}
      <div className="shrink-0 flex flex-col xl:flex-row gap-4 bg-white p-4 md:p-5 rounded-[1.5rem] border border-slate-200 shadow-sm overflow-y-auto max-h-[40vh] md:max-h-none">
        <div className="flex-1 flex flex-col md:flex-row gap-6 items-center">
           <div className="w-full md:w-auto space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight truncate">{company.name}</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Exercício {selectedYear}</p>
              </div>
              <div className="flex gap-2 md:gap-3 flex-wrap">
                 <select 
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-700 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 cursor-pointer w-full md:w-48"
                  >
                    {COMPANIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-700 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 cursor-pointer w-24"
                  >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                  </select>
              </div>
           </div>

           <div className="hidden md:block w-px h-20 bg-slate-100"></div>

           {/* Stats Visual (Gráfico + Números) - [CORREÇÃO] Flex-wrap para evitar overflow do 'AT' */}
           <div className="flex-1 w-full flex flex-wrap md:flex-nowrap items-center justify-around gap-4 md:gap-6">
              
              <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={18}
                      outerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value} (${Math.round(value/stats.total*100)}%)`, name]}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   <span className="text-[9px] md:text-[10px] font-black text-slate-400">{stats.total}</span>
                </div>
              </div>
              
              <div className="text-center min-w-[60px]">
                <span className="block text-[9px] font-black text-emerald-600 uppercase mb-1">OK</span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-emerald-500 tracking-tighter">{stats.ok}</span>
                  <span className="text-[10px] md:text-sm font-bold text-emerald-600/60">{stats.okPct}%</span>
                </div>
              </div>
              
              <div className="text-center min-w-[60px]">
                <span className="block text-[9px] font-black text-amber-600 uppercase mb-1">PD</span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-amber-500 tracking-tighter">{stats.pd}</span>
                  <span className="text-[10px] md:text-sm font-bold text-amber-600/60">{stats.pdPct}%</span>
                </div>
              </div>
              
              <div className="text-center min-w-[60px]">
                <span className="block text-[9px] font-black text-red-600 uppercase mb-1">AT</span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-2xl md:text-3xl font-black text-red-500 tracking-tighter">{stats.at}</span>
                  <span className="text-[10px] md:text-sm font-bold text-red-600/60">{stats.atPct}%</span>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Área da Tabela */}
      <div className="flex-1 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0">
        <div className="px-4 md:px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
               <span className="material-symbols-outlined text-lg">table_view</span>
            </div>
            <h3 className="font-bold text-slate-700 text-sm">Mapa de Obrigações</h3>
          </div>
          
          <div className="relative group w-full md:w-auto">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary-500">search</span>
            <input 
              type="text"
              value={activitySearch}
              onChange={(e) => setActivitySearch(e.target.value)}
              placeholder="Filtrar atividade..."
              className="pl-9 pr-4 py-1.5 bg-slate-50 border-slate-200 rounded-lg text-xs font-bold w-full md:w-48 focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Container com Scroll */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <table className="w-full text-left border-collapse min-w-[800px] md:min-w-[1200px]">
            <thead className="sticky top-0 z-20 bg-white shadow-sm ring-1 ring-slate-100">
              <tr>
                {/* [CORREÇÃO] Largura responsiva da coluna fixa: w-[120px] no mobile, w-[260px] no desktop */}
                <th className="py-3 px-3 md:px-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-white border-b border-slate-100 w-[120px] md:w-[260px] whitespace-nowrap sticky left-0 z-30 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                   Atividade
                </th>
                {months.map(m => (
                  <th key={m} className="py-3 px-1 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white border-b border-slate-100 min-w-[60px]">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* [CORREÇÃO] Coluna de Atividades Fixa: Reduzida e com Truncate no mobile */}
                  <td className="py-2 px-3 md:px-6 align-middle bg-white sticky left-0 z-10 border-r border-slate-50/50 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] max-w-[120px] md:max-w-[260px]">
                    <span className="text-[10px] md:text-[11px] font-bold text-slate-700 block truncate" title={activity.title}>
                      {activity.title}
                    </span>
                  </td>
                  {months.map((_, mIndex) => {
                    const log = MOCK_LOGS.find(l => l.activityId === activity.id && l.companyId === selectedCompany && l.month === mIndex);
                    return (
                      <td key={mIndex} className="p-1 align-middle h-10 min-w-[60px]">
                        <button 
                          onClick={() => handleCellClick(activity.id, mIndex)}
                          className={`w-full h-8 rounded-lg text-[10px] transition-all duration-200 flex items-center justify-center ${getStatusColor(log?.status)}`}
                        >
                          {log ? (
                            log.status === 'CONCLUIDA' ? 'OK' : log.status === 'PENDENTE' ? 'PD' : 'AT'
                          ) : (
                            <span className="material-symbols-outlined text-base opacity-0 hover:opacity-100 scale-75">add</span>
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
              {filteredActivities.length === 0 && (
                 <tr>
                    <td colSpan={13} className="py-10 text-center text-slate-400 text-xs font-medium italic">
                       Nenhuma atividade encontrada com este termo.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && activeCell && (
        <ActivityModal 
          activityId={activeCell.activityId}
          companyId={selectedCompany}
          month={activeCell.month}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Checklist;