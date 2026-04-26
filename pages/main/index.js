import { HeaderComponent } from "../../components/header/index.js";
import { OrderCardComponent } from "../../components/order-card/index.js";
import { OrderPage } from "../order/index.js";
import { MainBannerComponent } from "../../components/main-banner/index.js";
import { ordersData, addOrder, deleteOrder, getUnprocessedOrders, inverseOrders } from "../../modules/mockData.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.filterValue = "";
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get cardsRoot() {
        return document.getElementById('cards-container');
    }

    getHTML() {
        return `
            <div id="main-page" class="container-fluid p-0">
                <div id="header-container"></div>

                <div id="main-banner-container"></div>

                <div class="container mt-3">

                    <div class="row mb-4 align-items-center">
                        <div class="col-md-5 mb-2 mb-md-0">
                            <input type="text" id="filter-input" class="form-control" placeholder="Фильтр по названию или подразделению..." value="${this.filterValue}">
                        </div>
                        <div class="col-md-4 mb-2 mb-md-0 d-flex gap-2">
                            <button id="btn-homework-2-4" class="btn btn-outline-warning w-50" title="Задание 2.4">ДЗ 2.4</button>
                            <button id="btn-homework-3-2" class="btn btn-outline-info w-50" title="Задание 3.2">ДЗ 3.2</button>
                        </div>
                        <div class="col-md-3 text-end">
                            <button id="add-order-btn" class="btn btn-success w-100">Добавить приказ</button>
                        </div>
                    </div>

                    <div id="cards-container" class="row row-cols-1 row-cols-md-3 g-4 justify-content-start"></div>

                </div>
            </div>
        `;
    }

    clickDetails(e) {
        const cardId = e.target.dataset.id;
        const orderPage = new OrderPage(this.parent, cardId);
        orderPage.render();
    }

    clickDelete(e) {
        const cardId = parseInt(e.target.dataset.id);
        deleteOrder(cardId);
        this.render();
    }

    clickAdd() {
        addOrder();
        this.render();
    }

    clickHomework() {
        const processedOrders = [ordersData[0]];

        const newOrders = getUnprocessedOrders(ordersData, processedOrders);

        const container = this.cardsRoot;
        container.innerHTML = '';

        newOrders.forEach((item) => {
            const orderCard = new OrderCardComponent(container);
            orderCard.render(item, this.clickDetails.bind(this), this.clickDelete.bind(this));
        });
    }

    clickInverse() {
        const reversedOrders = inverseOrders(ordersData, 1);

        const container = this.cardsRoot;
        container.innerHTML = '';

        reversedOrders.forEach((item) => {
            const orderCard = new OrderCardComponent(container);
            orderCard.render(item, this.clickDetails.bind(this), this.clickDelete.bind(this));
        });
    }

    onFilterInput(e) {
        this.filterValue = e.target.value;
        this.renderCards();
    }

    renderCards() {
        const container = this.cardsRoot;
        container.innerHTML = '';

        const filteredData = ordersData.filter(order =>
            order.title.toLowerCase().includes(this.filterValue.toLowerCase()) ||
            order.department.toLowerCase().includes(this.filterValue.toLowerCase())
        );

        filteredData.forEach((item) => {
            const orderCard = new OrderCardComponent(container);
            orderCard.render(item, this.clickDetails.bind(this), this.clickDelete.bind(this));
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const headerContainer = document.getElementById('header-container');
        const header = new HeaderComponent(headerContainer);
        header.render(() => this.render());

        const bannerContainer = document.getElementById('main-banner-container');
        const mainBanner = new MainBannerComponent(bannerContainer);
        mainBanner.render(ordersData, this.clickDetails.bind(this));

        document.getElementById('add-order-btn').addEventListener('click', this.clickAdd.bind(this));

        document.getElementById('btn-homework-2-4').addEventListener('click', this.clickHomework.bind(this));

        document.getElementById('btn-homework-3-2').addEventListener('click', this.clickInverse.bind(this));

        const filterInput = document.getElementById('filter-input');
        filterInput.addEventListener('input', this.onFilterInput.bind(this));

        this.renderCards();
    }
}
