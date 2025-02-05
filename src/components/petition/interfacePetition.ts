export interface Petition {
  id: string;
  author: string; //Advogado lider do processo
  defendantName: string; //Reu
  processType: string;
  partner?: string;
}
