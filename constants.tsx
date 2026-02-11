import { Company, Activity, Employee, ActivityLog } from './types';

export const AREAS = ['Contabil', 'Fiscal', 'DP', 'Societario'] as const;

export const COMPANIES: Company[] = [
  { id: '1', name: 'Tech Solutions Ltda', legalNature: 'LTDA', sector: 'Servico', size: 'Media', taxRegime: 'Presumido' },
  { id: '2', name: 'Inova Contábil SLU', legalNature: 'SLU', sector: 'Servico', size: 'Pequena', taxRegime: 'Simples' },
  { id: '3', name: 'Global Alimentos S/A', legalNature: 'SA', sector: 'Industria', size: 'Grande', taxRegime: 'Real' },
  { id: '4', name: 'Varejo Express ME', legalNature: 'ME', sector: 'Comercio', size: 'Pequena', taxRegime: 'Simples' },
  { id: '5', name: 'Oficina do Micro MEI', legalNature: 'MEI', sector: 'Servico', size: 'Pequena', taxRegime: 'Simples' },
];

export const ACTIVITIES: Activity[] = [
  { id: 'a01', title: 'Abertura', area: 'Societario' },
  { id: 'a02', title: 'Alvará', area: 'Societario' },
  { id: 'a03', title: 'Consulta Receita PMI', area: 'Fiscal' },
  { id: 'a04', title: 'Consulta DIR', area: 'Fiscal' },
  { id: 'a05', title: 'Totais ISS', area: 'Fiscal' },
  { id: 'a06', title: 'Totais ICMS', area: 'Fiscal' },
  { id: 'a07', title: 'Interligar DP', area: 'DP' },
  { id: 'a08', title: 'Banco', area: 'Contabil' },
  { id: 'a09', title: 'Caixa', area: 'Contabil' },
  { id: 'a10', title: 'Clientes', area: 'Contabil' },
  { id: 'a11', title: 'Fornecedores', area: 'Contabil' },
  { id: 'a12', title: 'Simples Nacional', area: 'Fiscal' },
  { id: 'a13', title: 'Pró-Labore', area: 'DP' },
  { id: 'a14', title: 'INSS', area: 'DP' },
  { id: 'a15', title: 'Adiantamento ao Sócio', area: 'Contabil' },
  { id: 'a16', title: 'AFAC', area: 'Contabil' },
  { id: 'a17', title: 'Distribuição de Lucros', area: 'Contabil' },
  { id: 'a18', title: 'Exportar Lançamentos', area: 'Contabil' },
  { id: 'a19', title: 'Zeramento das Contas', area: 'Contabil' },
  { id: 'a20', title: 'Salvar Balanço', area: 'Contabil' },
];

export const EMPLOYEES: Employee[] = [
  { id: 'all', name: 'Todos os Colaboradores', area: 'Contabil', assignedCompanies: [] },
  { id: 'e1', name: 'Marcos André', area: 'Fiscal', assignedCompanies: ['1', '3'] },
  { id: 'e2', name: 'Carla Silva', area: 'Contabil', assignedCompanies: ['2', '4', '5'] },
  { id: 'e3', name: 'Isadora (Gestora)', area: 'Societario', assignedCompanies: ['1'] },
  { id: 'e4', name: 'Roberto Campos', area: 'DP', assignedCompanies: ['3'] },
];

export const generateMockData = () => {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'];
  const data = [];

  for (let m = 0; m < months.length; m++) {
    const totalMonth = Math.floor(Math.random() * 100) + 200; 
    const done = Math.floor(totalMonth * 0.75);
    const pending = Math.floor(totalMonth * 0.20);
    const late = totalMonth - done - pending;

    data.push({
      name: months[m],
      monthIndex: m,
      total: totalMonth,
      concluded: done,
      pending: pending,
      late: late
    });
  }
  return data;
};

export const MOCK_DASHBOARD_DATA = generateMockData();

// [AJUSTE SPRINT 2] Gerador de logs massivos para preencher a tabela visualmente
const generateFullMockLogs = () => {
  const logs: ActivityLog[] = [];
  const statuses = ['CONCLUIDA', 'PENDENTE', 'ATRASADA'] as const;

  COMPANIES.forEach(company => {
    ACTIVITIES.forEach(activity => {
      // Gera dados para todos os 12 meses
      for (let m = 0; m < 12; m++) {
        // 70% de chance de ter um log (para deixar alguns buracos realistas)
        if (Math.random() > 0.3) {
          // Pesos: 60% Concluída, 30% Pendente, 10% Atrasada
          const rand = Math.random();
          let status: any = 'CONCLUIDA';
          if (rand > 0.6) status = 'PENDENTE';
          if (rand > 0.9) status = 'ATRASADA';

          // Se for mês futuro (ex: > Junho), tende a ser vazio ou pendente
          if (m > 5) {
             if (Math.random() > 0.8) status = 'PENDENTE';
             else continue; // Pula meses futuros na maioria das vezes
          }

          logs.push({
            id: `log-${company.id}-${activity.id}-${m}`,
            activityId: activity.id,
            companyId: company.id,
            month: m,
            year: 2024,
            status: status,
            updatedAt: '2024-01-01',
            updatedBy: 'Sistema'
          });
        }
      }
    });
  });
  return logs;
};

export const MOCK_LOGS: ActivityLog[] = generateFullMockLogs();