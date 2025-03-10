export interface Process {
  id?: string;
  numberProcess: string;
  forumName: string;
  courtName: string; //Nome da vara
  courtNumber: string;
  author: string; //Advogado lider do processo
  defendantName: string; //Reu
  processStatus?: string; // Situação Processual
  status: "available" | "archived" | "processing"; // Situação de Status
  pending?: string; // Pendências
  note?: string; // Observação
  processDate: string; // Data do Processo (como timestamp)
  partner: string; // Parceiro
  department: string; // Departamento
  processOutcome: "won" | "lost" | "undefined"; // Perda ou Ganho de Processo
  value: number; // Valor
  portion: number; // Parcela
}

export interface FilterProcessFinance {
  id?: string;
  numberProcess: string;
  defendantName: string;
  value: number;
  portion: number;
}
