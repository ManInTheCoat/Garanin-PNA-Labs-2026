export let ordersData = [
  {
    id: 1,
    docNumber: "101-О",
    date: "2026-04-01",
    department: "ИУ",
    title: "О проведении летней сессии",
    content: "Утвердить график проведения летней экзаменационной сессии для студентов факультета ИУ."
  },
  {
    id: 2,
    docNumber: "102-У",
    date: "2026-04-05",
    department: "РК",
    title: "О переводе на бюджет",
    content: "Перевести студентов 3 курса факультета РК, обучающихся на платной основе, на вакантные бюджетные места."
  },
  {
    id: 3,
    docNumber: "103-А",
    date: "2026-04-10",
    department: "СМ",
    title: "О назначении стипендии",
    content: "Назначить повышенную государственную академическую стипендию за особые достижения в учебной деятельности."
  },
  {
    id: 4,
    docNumber: "104-О",
    date: "2026-04-15",
    department: "ИУ",
    title: "О ремонте аудиторий",
    content: "Начать косметический ремонт в аудиториях корпуса."
  }
];

export const addOrder = () => {
  if (ordersData.length === 0) return;
  const newOrder = { ...ordersData[0], id: Date.now() };
  ordersData.push(newOrder);
};

export const deleteOrder = (id) => {
  ordersData = ordersData.filter(order => order.id !== id);
};

export const getOrderById = (id) => {
  return ordersData.find(order => order.id === parseInt(id));
};
