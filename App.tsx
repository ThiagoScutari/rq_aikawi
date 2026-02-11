import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Checklist from './components/Checklist';
import EmployeeRegistry from './components/EmployeeRegistry';
import LandingPage from './components/LandingPage';
import { EMPLOYEES, COMPANIES, AREAS } from './constants';

export type FilterContextType = {
  selectedMonth: string;
  selectedCompany: string;
  selectedEmployee: string;
  selectedArea: string;
};

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  
  // A Sidebar só existe dentro da rota /app, então não precisamos mais esconder condicionalmente

  // [AJUSTE] Links atualizados para a nova estrutura de rotas (/app)
  const navItems = [
    { label: 'Dashboard', path: '/app', icon: 'dashboard' },
    { label: 'Checklist', path: '/app/checklist', icon: 'fact_check' },
    { label: 'Funcionários', path: '/app/employees', icon: 'badge' },
  ];

  return (
    <aside 
      className={`bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 z-50 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
        isOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0 border-none'
      }`}
    >
      <div className="p-6 flex items-center justify-center">
        <img src="/images/aikawi.png" alt="Aikawi RQ" className="h-10 object-contain" />
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
              // Verifica se o path é exatamente igual para ativar o estilo
              location.pathname === item.path
                ? 'bg-primary-50 text-primary-600 shadow-sm'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">IS</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate text-slate-800">Isadora</p>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Gestora</p>
          </div>
          <button className="text-slate-300 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ 
  filters, 
  setFilters,
  toggleSidebar
}: { 
  filters: FilterContextType, 
  setFilters: React.Dispatch<React.SetStateAction<FilterContextType>>,
  toggleSidebar: () => void
}) => {
  const location = useLocation();
  
  // [AJUSTE] Lógica para identificar se estamos no dashboard principal dentro de /app
  const isDashboard = location.pathname === '/app' || location.pathname === '/app/';
  
  // [AJUSTE] Mostrar busca global exceto em checklist e funcionários
  const showGlobalSearch = !location.pathname.includes('/checklist') && !location.pathname.includes('/employees');

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-40 shadow-sm/50">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 mr-2 text-slate-400 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-all"
          title="Alternar Menu"
        >
          <span className="material-symbols-outlined">menu_open</span>
        </button>

        {isDashboard && (
          <>
            <select 
              value={filters.selectedMonth}
              onChange={(e) => setFilters({...filters, selectedMonth: e.target.value})}
              className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="Junho 2024">Junho 2024</option>
              <option value="Maio 2024">Maio 2024</option>
              <option value="Abril 2024">Abril 2024</option>
            </select>

            <select 
              value={filters.selectedCompany}
              onChange={(e) => setFilters({...filters, selectedCompany: e.target.value})}
              className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 cursor-pointer hover:bg-slate-100 transition-colors max-w-[140px]"
            >
              <option value="all">Todas Empresas</option>
              {COMPANIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            <select 
              value={filters.selectedEmployee}
              onChange={(e) => setFilters({...filters, selectedEmployee: e.target.value})}
              className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              {EMPLOYEES.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>

            <select 
              value={filters.selectedArea}
              onChange={(e) => setFilters({...filters, selectedArea: e.target.value})}
              className="bg-slate-50 border-slate-200 rounded-lg text-xs font-bold text-slate-600 py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="all">Todas Áreas</option>
              {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* [AJUSTE] Link agora aponta para a raiz "/" onde está a Landing Page */}
        <Link to="/" className="text-xs font-bold text-indigo-600 hover:underline">
           Ver Apresentação
        </Link>

        {showGlobalSearch && (
          <div className="relative group animate-in fade-in duration-300">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary-500 transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Pesquisar cliente..." 
              className="bg-slate-50 border-transparent rounded-xl pl-10 pr-4 py-2 text-sm w-[240px] focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-xl relative transition-all">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-xl transition-all">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

const Layout = () => {
  const [filters, setFilters] = useState<FilterContextType>({
    selectedMonth: 'Junho 2024',
    selectedCompany: 'all',
    selectedEmployee: 'all',
    selectedArea: 'all'
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen font-sans bg-[#f6f7f8]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header 
          filters={filters} 
          setFilters={setFilters} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet context={filters} />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* [AJUSTE] Rota raiz agora é a Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* [AJUSTE] Aplicação movida para o prefixo /app */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="employees" element={<EmployeeRegistry />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;