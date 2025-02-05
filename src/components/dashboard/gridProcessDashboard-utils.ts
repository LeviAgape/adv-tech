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
