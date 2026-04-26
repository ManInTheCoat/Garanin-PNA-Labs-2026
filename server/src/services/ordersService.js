const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const orders = fileService.readData(dataFilePath);
    if (title) {
        return orders.filter(order =>
            order.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return orders;
};

const findOne = (id) => {
    const orders = fileService.readData(dataFilePath);
    return orders.find(order => order.id === id);
};

const create = (orderData) => {
    const orders = fileService.readData(dataFilePath);

    const newId = orders.length > 0
        ? Math.max(...orders.map(o => o.id)) + 1
        : 1;

    const newOrder = { id: newId, ...orderData };
    orders.push(newOrder);
    fileService.writeData(dataFilePath, orders);

    return newOrder;
};

const update = (id, orderData) => {
    const orders = fileService.readData(dataFilePath);
    const index = orders.findIndex(o => o.id === id);

    if (index === -1) return null;

    orders[index] = { ...orders[index], ...orderData };
    fileService.writeData(dataFilePath, orders);

    return orders[index];
};

const remove = (id) => {
    const orders = fileService.readData(dataFilePath);
    const filteredOrders = orders.filter(o => o.id !== id);

    if (filteredOrders.length === orders.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredOrders);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
