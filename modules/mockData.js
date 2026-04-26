export let ordersData = [
  {
    id: 1,
    docNumber: "101-О",
    date: "2026-04-01",
    department: "ИУ",
    title: "О проведении летней сессии",
    content: "Утвердить график проведения летней экзаменационной сессии для студентов факультета ИУ.",
    status: "Активен"
  },
  {
    id: 2,
    docNumber: "102-У",
    date: "2026-04-05",
    department: "РК",
    title: "О переводе на бюджет",
    content: "Перевести студентов 3 курса факультета РК, обучающихся на платной основе, на вакантные бюджетные места.",
    status: "Активен"
  },
  {
    id: 3,
    docNumber: "103-А",
    date: "2026-04-10",
    department: "СМ",
    title: "О назначении стипендии",
    content: "Назначить повышенную государственную академическую стипендию за особые достижения в учебной деятельности.",
    status: "Активен"
  },
  {
    id: 4,
    docNumber: "104-О",
    date: "2026-04-15",
    department: "ИУ",
    title: "О ремонте аудиторий",
    content: "Начать косметический ремонт в аудиториях корпуса.",
    status: "Архив"
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

/**
 * Задание 2.4: Разность двух массивов.
 */
export const getUnprocessedOrders = (allOrders, processedOrders) => {
    const processedIds = new Set(processedOrders.map(order => order.id));
    const diffResult = [];

    let queue = [...allOrders];
    let currentOrder = queue.shift();

    while (currentOrder !== undefined && currentOrder.status !== 'Архив') {
        if (!processedIds.has(currentOrder.id)) {
            diffResult.push(currentOrder);
        }
        currentOrder = queue.shift();
    }

    return diffResult;
};

/**
 * Задание 3.2: Инверсия массива.
 * @param {Array} ordersCollection - Исходная коллекция приказов
 * @param {number} keepCount - Число элементов, которые остаются на месте
 * @returns {Array} - Новый массив с инвертированным порядком
 */
export const inverseOrders = (ordersCollection, keepCount = 0) => {
    let arr = [...ordersCollection];

    let start = 0;
    let end = arr.length - 1;

    if (keepCount > 0) {
        start = keepCount;
    } else if (keepCount < 0) {
        end = arr.length - 1 + keepCount;
    }

    if (start >= end || arr.length === 0) return arr;

    do {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;

        start++;
        end--;
    } while (start < end);

    return arr;
};
