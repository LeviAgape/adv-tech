export const nameTranslatedInGrid = [
  { name: "Número do Processo" },
  { name: "Fórum" },
  { name: "Nome da Vara" },
  { name: "Número da Vara" },
  { name: "Advogado" },
  { name: "Réu" },
  { name: "Situação Processual" },
  { name: "Status" },
  { name: "Pendências" },
  { name: "Observações" },
  { name: "Data do Processo" },
  { name: "Parceiro" },
  { name: "Departamento" },
  //{ name: "Resultado do Processo" },
  { name: "Editar" },
];

export const formFields = [
  { label: "Número do Processo", key: "numberProcess" },
  { label: "Fórum", key: "forumName" },
  { label: "Nome da Vara", key: "courtName" },
  { label: "Número da Vara", key: "courtNumber" },
  { label: "Advogado", key: "author" },
  { label: "Réu", key: "defendantName" },
  { label: "Situação Processual", key: "processStatus" },
  {
    label: "Status",
    key: "status",
    type: "select",
    options: [
      { value: "available", label: "Diligenciado" },
      { value: "archived", label: "Arquivado" },
      { value: "processing", label: "Em andamento" },
    ],
  },
  { label: "Pendências", key: "pending" },
  { label: "Observações", key: "note" },
  { label: "Data do Processo", key: "processDate" },
  { label: "Parceiro", key: "partner" },
  { label: "Departamento", key: "department" },
  { label: "Valor", key: "value" },
  { label: "Parcela", key: "portion" },
  {
    label: "Resultado do Processo",
    key: "processOutcome",
    type: "select",
    options: [
      { value: "won", label: "Concluído" },
      { value: "lost", label: "Perdido" },
      { value: "undefined", label: "Indefinido" },
    ],
  },
];

export const translatedStatus = (status: string) => {
  if (status === "processing") {
    return "Em andamento";
  } else if (status === "available") {
    return "Diligenciado";
  } else {
    return "Arquivado";
  }
};

export const translatedProcessOutCome = (status: string) => {
  if (status === "won") {
    return "Concluído";
  } else if (status === "lost") {
    return "Perdido";
  } else {
    return "Indefinido";
  }
};
