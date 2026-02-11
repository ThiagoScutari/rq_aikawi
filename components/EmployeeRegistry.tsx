import React, { useState } from 'react';
import { COMPANIES, EMPLOYEES, AREAS } from '../constants';
import { Employee } from '../types';

const EmployeeRegistry: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('Contabil');
  const [name, setName] = useState('');
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  
  // [AJUSTE] Busca Local de Funcionários
  const [employeeSearch, setEmployeeSearch] = useState('');

  // [AJUSTE] Estado para seleção múltipla de empresas no modal
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  
  // Filters for company list in modal
  const [filters, setFilters] = useState({
    nature: '',
    sector: '',
    size: '',
    regime: ''
  });

  const filteredCompanies = COMPANIES.filter(c => {
    if (filters.nature && c.legalNature !== filters.nature) return false;
    if (filters.sector && c.sector !== filters.sector) return false;
    if (filters.size && c.size !== filters.size) return false;
    if (filters.regime && c.taxRegime !== filters.regime) return false;
    return true;
  });

  const openModal = (employee?: Employee) => {
    if (employee) {
      setCurrentEmployee(employee);
      setName(employee.name);
      setSelectedArea(employee.area);
      setSelectedCompanyIds(employee.assignedCompanies); // Carrega empresas atuais
    } else {
      setCurrentEmployee(null);
      setName('');
      setSelectedArea('Contabil');
      setSelectedCompanyIds([]);
    }
    setIsModalOpen(true);
  };

  // [AJUSTE] Função Selecionar Todas / Toggle Individual
  const handleToggleCompany = (companyId: string) => {
    setSelectedCompanyIds(prev => 
      prev.includes(companyId) ? prev.filter(id => id !== companyId) : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    // Se todas as filtradas já estão selecionadas, remove todas elas. Senão, adiciona todas.
    const allFilteredIds = filteredCompanies.map(c => c.id);
    const allSelected = allFilteredIds.every(id => selectedCompanyIds.includes(id));

    if (allSelected) {
      // Remove apenas as filtradas da seleção atual
      setSelectedCompanyIds(prev => prev.filter(id => !allFilteredIds.includes(id)));
    } else {
      // Adiciona as que faltam
      const newIds = [...selectedCompanyIds];
      allFilteredIds.forEach(id => {
        if (!newIds.includes(id)) newIds.push(id);
      });
      setSelectedCompanyIds(newIds);
    }
  };

  // [AJUSTE] Filtro visual da lista de funcionários (Remove "Todos" e aplica busca)
  const displayEmployees = EMPLOYEES
    .filter(emp => emp.id !== 'all')
    .filter(emp => emp.name.toLowerCase().includes(employeeSearch.toLowerCase()));

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Equipe Operacional</h2>
          <p className="text-slate-500">Gerencie permissões e atribuições de empresas por colaborador</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* [AJUSTE] Campo de Busca de Colaborador */}
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary-500 transition-colors">search</span>
            <input 
              type="text" 
              value={employeeSearch}
              onChange={(e) => setEmployeeSearch(e.target.value)}
              placeholder="Buscar colaborador..." 
              className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-[240px] focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all placeholder:text-slate-400 font-bold shadow-sm"
            />
          </div>

          <button 
            onClick={() => openModal()}
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Novo Funcionário
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayEmployees.map((emp) => (
          // [AJUSTE] Card Compacto: Padding reduzido (p-4), arredondamento ajustado
          <div key={emp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-black text-sm">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{emp.name}</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{emp.area}</span>
                </div>
              </div>
              
              {/* [AJUSTE] Botão de Edição sempre visível e funcional */}
              <button 
                onClick={() => openModal(emp)}
                className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                title="Editar Colaborador"
              >
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Empresas Atribuídas</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 rounded">{emp.assignedCompanies.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 h-16 overflow-hidden content-start">
                {emp.assignedCompanies.map(cid => {
                  const comp = COMPANIES.find(c => c.id === cid);
                  return (
                    <span key={cid} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[9px] font-bold rounded-md border border-slate-100 truncate max-w-full">
                      {comp?.name}
                    </span>
                  );
                })}
              </div>
            </div>
            
            {/* [AJUSTE] Removido rodapé "Gerenciar Acesso" para compactar */}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[95vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-black text-slate-800">{currentEmployee ? 'Editar Colaborador' : 'Registrar Novo Colaborador'}</h3>
                <p className="text-slate-500 text-xs font-medium">Configure o perfil e a carteira de clientes.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Área de Atuação</label>
                  <select 
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
                  >
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                   <span className="material-symbols-outlined text-base">filter_alt</span>
                   Filtro de Carteira
                </h4>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Natureza</label>
                      <select 
                        value={filters.nature} 
                        onChange={e => setFilters({...filters, nature: e.target.value})}
                        className="w-full bg-white border-none rounded-lg py-1.5 px-3 text-xs font-bold focus:ring-2 focus:ring-primary-400 cursor-pointer"
                      >
                        <option value="">Todas</option>
                        <option value="ME">ME</option>
                        <option value="MEI">MEI</option>
                        <option value="LTDA">LTDA</option>
                        <option value="SA">SA</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Setor</label>
                      <select 
                        value={filters.sector} 
                        onChange={e => setFilters({...filters, sector: e.target.value})}
                        className="w-full bg-white border-none rounded-lg py-1.5 px-3 text-xs font-bold focus:ring-2 focus:ring-primary-400 cursor-pointer"
                      >
                        <option value="">Todos</option>
                        <option value="Servico">Serviço</option>
                        <option value="Comercio">Comércio</option>
                        <option value="Industria">Indústria</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Porte</label>
                      <select 
                        value={filters.size} 
                        onChange={e => setFilters({...filters, size: e.target.value})}
                        className="w-full bg-white border-none rounded-lg py-1.5 px-3 text-xs font-bold focus:ring-2 focus:ring-primary-400 cursor-pointer"
                      >
                        <option value="">Todos</option>
                        <option value="Pequena">Pequena</option>
                        <option value="Media">Média</option>
                        <option value="Grande">Grande</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Regime</label>
                      <select 
                        value={filters.regime} 
                        onChange={e => setFilters({...filters, regime: e.target.value})}
                        className="w-full bg-white border-none rounded-lg py-1.5 px-3 text-xs font-bold focus:ring-2 focus:ring-primary-400 cursor-pointer"
                      >
                        <option value="">Todos</option>
                        <option value="Simples">Simples Nacional</option>
                        <option value="Presumido">Lucro Presumido</option>
                        <option value="Real">Lucro Real</option>
                      </select>
                   </div>
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex justify-between items-end">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresas Filtradas ({filteredCompanies.length})</h4>
                   {/* [AJUSTE] Botão Selecionar Todas Funcional */}
                   <button 
                    onClick={handleSelectAll}
                    className="text-[10px] font-bold text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
                   >
                     <span className="material-symbols-outlined text-sm">done_all</span>
                     {filteredCompanies.every(c => selectedCompanyIds.includes(c.id)) ? 'Deselecionar Todas' : 'Selecionar Todas'}
                   </button>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm max-h-60 overflow-y-auto custom-scrollbar">
                   <table className="w-full text-left">
                      <thead className="bg-slate-50 sticky top-0 z-10">
                         <tr>
                            <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Empresa</th>
                            <th className="py-3 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detalhes</th>
                            <th className="py-3 px-6 text-right"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredCompanies.map(c => {
                          const isSelected = selectedCompanyIds.includes(c.id);
                          return (
                            <tr key={c.id} className={`hover:bg-slate-50/50 group transition-colors ${isSelected ? 'bg-primary-50/30' : ''}`}>
                               <td className="py-3 px-6">
                                  <span className={`text-xs font-bold ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}>{c.name}</span>
                               </td>
                               <td className="py-3 px-6">
                                  <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-500 mr-2 uppercase">{c.legalNature}</span>
                                  <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-500 uppercase">{c.taxRegime}</span>
                               </td>
                               <td className="py-3 px-6 text-right">
                                  <input 
                                    type="checkbox" 
                                    checked={isSelected}
                                    onChange={() => handleToggleCompany(c.id)}
                                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-400 w-4 h-4 cursor-pointer" 
                                  />
                               </td>
                            </tr>
                          );
                        })}
                      </tbody>
                   </table>
                </div>
              </section>
            </div>

            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all">
                Cancelar
              </button>
              <button className="bg-primary-600 text-white px-8 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all">
                Salvar Colaborador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeRegistry;