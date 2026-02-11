import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* NAV / HEADER */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/aikawi.png" alt="Aikawi Logo" className="h-10 w-auto" />
            <span className="font-bold text-slate-800 text-xl tracking-tight hidden sm:block">Gestão Contábil Pro</span>
          </div>
          <div className="flex gap-4">
            <Link to="/app" className="px-6 py-2.5 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all">
              Ver Demonstração
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            O Futuro da Aikawi Chegou
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
            Do Documento Word à <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Inteligência Operacional</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200">
            Elimine planilhas manuais e documentos soltos na rede. Centralize sua operação contábil em uma plataforma Web segura, inteligente e baseada em dados reais.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300">
            <Link to="/app" className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
              Acessar Sistema Agora
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* HERO IMAGE SHOWCASE */}
        <div className="max-w-6xl mx-auto mt-20 relative animate-in zoom-in-95 fade-in duration-1000 delay-500">
          <div className="absolute inset-0 bg-indigo-600 blur-[100px] opacity-20 rounded-full"></div>
          <img 
            src="/screenshots/1_Dashboard_Sidebar_IsOpen.png" 
            alt="Dashboard Aikawi" 
            className="relative rounded-[2rem] shadow-2xl border-4 border-white/50 backdrop-blur-sm"
          />
          <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Eficiência</p>
                <p className="text-2xl font-black text-slate-800">+35%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* COMPARISON / PAIN POINTS */}
      <section id="comparativo" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">A Evolução Necessária</h2>
            <p className="text-slate-500 max-w-2xl mx-auto mb-12">
              Migrar para uma aplicação Web não é apenas estética, é sobre segurança, controle e escalabilidade. Veja a diferença:
            </p>

            <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-slate-50 relative group bg-slate-100">
                <div className="absolute inset-0 bg-indigo-900/10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none z-10"></div>
                
                <img
                    src="/gifs/antes_depois.gif"
                    alt="Comparativo visual: Antes (Word) vs Depois (Web App)"
                    className="w-full h-auto object-cover relative z-0"
                />
                
                {/* [REMOVIDO] Overlay "Visualização da Transformação" removido para limpar o visual */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            {/* O Passado */}
            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-4xl text-red-400">cancel</span>
                <h3 className="text-2xl font-bold text-slate-700">Processo Atual (Word/Rede)</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-red-400 shrink-0">description</span>
                  <span>Arquivos descentralizados em pastas de rede (risco de perda).</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-red-400 shrink-0">history</span>
                  <span>Sem histórico de quem editou ou quando ("Versão Final_v2.doc").</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-red-400 shrink-0">visibility_off</span>
                  <span>Gestores "cegos": impossível saber o status real sem perguntar.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600">
                  <span className="material-symbols-outlined text-red-400 shrink-0">lock_open</span>
                  <span>Segurança frágil: qualquer um pode apagar ou copiar arquivos.</span>
                </li>
              </ul>
            </div>

            {/* O Futuro */}
            <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-200 text-white transform scale-105">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-4xl text-white">check_circle</span>
                <h3 className="text-2xl font-bold">Aikawi RQ Web App</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 font-medium">
                  <span className="material-symbols-outlined text-indigo-300 shrink-0">cloud_done</span>
                  <span>Dados na nuvem em tempo real, acessíveis de qualquer lugar.</span>
                </li>
                <li className="flex items-start gap-3 font-medium">
                  <span className="material-symbols-outlined text-indigo-300 shrink-0">verified_user</span>
                  <span>Auditabilidade total: saiba quem fez, quando e o que mudou.</span>
                </li>
                <li className="flex items-start gap-3 font-medium">
                  <span className="material-symbols-outlined text-indigo-300 shrink-0">dashboard</span>
                  <span>Dashboards gerenciais automáticos para tomada de decisão.</span>
                </li>
                <li className="flex items-start gap-3 font-medium">
                  <span className="material-symbols-outlined text-indigo-300 shrink-0">rocket_launch</span>
                  <span>Pronto para integrações (WhatsApp, CRM) e Automação IA.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE 1: CHECKLIST */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-widest">
                Controle Operacional
              </div>
              <h2 className="text-4xl font-black text-slate-900">
                O Fim do "Quem fez o quê?"
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nosso Checklist Visual transforma listas estáticas em um mapa de calor vivo da sua operação.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                    <span className="material-symbols-outlined">table_view</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Visão Anual em Uma Tela</h4>
                    <p className="text-sm text-slate-500">Identifique gargalos e sazonalidades instantaneamente.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                    <span className="material-symbols-outlined">traffic</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Gestão Visual de Status</h4>
                    <p className="text-sm text-slate-500">Cores intuitivas (OK, PD, AT) guiam a atenção para o que importa.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <img 
                src="/screenshots/2_Checklist.png" 
                alt="Checklist Visual" 
                className="rounded-[2rem] shadow-2xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE 2: EXECUÇÃO & EVIDÊNCIA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <img 
                src="/screenshots/3_ActivityModal.png" 
                alt="Modal de Execução" 
                className="rounded-[2rem] shadow-2xl border-4 border-slate-50 -rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest">
                Padronização & Qualidade
              </div>
              <h2 className="text-4xl font-black text-slate-900">
                Evidências que Blindam sua Operação
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Cada atividade registra não apenas o "feito", mas *como* foi feito.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-blue-500 shrink-0">
                    <span className="material-symbols-outlined">mic</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Gravação de Áudio & Anexos</h4>
                    <p className="text-sm text-slate-500">Registre explicações complexas ou anexe comprovantes diretamente na tarefa.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-blue-500 shrink-0">
                    <span className="material-symbols-outlined">history</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Histórico Imutável</h4>
                    <p className="text-sm text-slate-500">Timeline completa de interações. Acabe com o "disse-me-disse" com o cliente.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION - THE "MONEY" SLIDE */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Inteligência que Gera Lucro</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Saia do "achismo". O Aikawi RQ transforma dados operacionais em métricas estratégicas de rentabilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">attach_money</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Rentabilidade por Cliente</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cruze o tempo dedicado pela equipe com os honorários cobrados. Identifique clientes que consomem margem e reajuste contratos com dados.
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Eficiência da Equipe</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quem entrega no prazo? Quem está sobrecarregado? O sistema mostra a performance real por área (Fiscal, Contábil, DP).
              </p>
            </div>

            <div className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Perfil de Risco</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Identifique quais clientes atrasam sistematicamente o envio de documentos, permitindo ações proativas de cobrança e educação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">
            Pronto para transformar a Aikawi?
          </h2>
          <p className="text-xl text-slate-500 mb-12">
            A tecnologia já está aqui. O próximo passo é assumir o controle.
          </p>
          <Link to="/app" className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-indigo-300 hover:bg-indigo-700 hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            Iniciar Piloto Agora
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center opacity-50 text-sm font-medium">
          <p>&copy; 2024 Aikawi Contabilidade. Todos os direitos reservados.</p>
          <p>Desenvolvido com Tecnologia Web de Ponta (React + Vite + IA).</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;