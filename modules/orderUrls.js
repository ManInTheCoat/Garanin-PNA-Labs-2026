class OrderUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getOrders() {
        return `${this.baseUrl}/orders`;
    }

    getOrderById(id) {
        return `${this.baseUrl}/orders/${id}`;
    }

    createOrder() {
        return `${this.baseUrl}/orders`;
    }

    removeOrderById(id) {
        return `${this.baseUrl}/orders/${id}`;
    }

    updateOrderById(id) {
        return `${this.baseUrl}/orders/${id}`;
    }
}

export const orderUrls = new OrderUrls();
