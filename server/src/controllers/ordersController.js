const ordersService = require('../services/ordersService');

const getAllOrders = (req, res) => {
    const { title } = req.query;
    const orders = ordersService.findAll(title);
    res.json(orders);
};

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    const order = ordersService.findOne(id);

    if (!order) {
        return res.status(404).json({ error: 'Приказ не найден' });
    }

    res.json(order);
};

const createOrder = (req, res) => {
    const { docNumber, date, department, title, content, status } = req.body;

    if (!title || !docNumber) {
        return res.status(400).json({ error: 'Заголовок и номер приказа обязательны' });
    }

    const newOrder = ordersService.create({ docNumber, date, department, title, content, status });
    res.status(201).json(newOrder);
};

const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedOrder = ordersService.update(id, req.body);

    if (!updatedOrder) {
        return res.status(404).json({ error: 'Приказ не найден' });
    }

    res.json(updatedOrder);
};

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const success = ordersService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Приказ не найден' });
    }

    res.status(204).send();
};

module.exports = {
    getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder
};
