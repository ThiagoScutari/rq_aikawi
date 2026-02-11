
export type ActivityStatus = 'CONCLUIDA' | 'PENDENTE' | 'ATRASADA';

export interface Company {
  id: string;
  name: string;
  legalNature: 'ME' | 'MEI' | 'EPP' | 'LTDA' | 'SLU' | 'SA';
  sector: 'Industria' | 'Comercio' | 'Servico';
  size: 'Pequena' | 'Media' | 'Grande';
  taxRegime: 'Simples' | 'Presumido' | 'Real';
}

export interface Activity {
  id: string;
  title: string;
  area: 'Contabil' | 'Fiscal' | 'DP' | 'Societario';
}

export interface ActivityLog {
  id: string;
  activityId: string;
  companyId: string;
  month: number;
  year: number;
  status: ActivityStatus;
  note?: string;
  attachments?: { type: 'IMAGE' | 'VIDEO' | 'AUDIO'; url: string }[];
  updatedAt: string;
  updatedBy: string;
}

export interface Employee {
  id: string;
  name: string;
  area: 'Contabil' | 'Fiscal' | 'DP' | 'Societario';
  assignedCompanies: string[]; // Company IDs
}

export interface AreaStats {
  area: string;
  total: number;
  completed: number;
}
