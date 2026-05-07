import { HeaderComponent } from "../../components/header/index.js";
import { OrderCardComponent } from "../../components/order-card/index.js";
import { OrderPage } from "../order/index.js";
import { MainBannerComponent } from "../../components/main-banner/index.js";
import { ajax } from "../../modules/ajax.js"
import { orderUrls } from "../../modules/orderUrls.js"

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
                            <input type="text" id="filter-input" class="form-control" placeholder="Фильтр по названию..." value="${this.filterValue}">
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

    getData() {
        let url = orderUrls.getOrders();
        if (this.filterValue) {
            url += `?title=${encodeURIComponent(this.filterValue)}`;
        }

        ajax.get(url, (data) => {
            if (data) {
                this.renderData(data);
            }
        });
    }

    renderData(items) {
        const bannerContainer = document.getElementById('main-banner-container');
        if (bannerContainer) {
            bannerContainer.innerHTML = '';
            const mainBanner = new MainBannerComponent(bannerContainer);
            mainBanner.render(items, this.clickDetails.bind(this));
        }

        const container = this.cardsRoot;
        container.innerHTML = '';
        items.forEach((item) => {
            const orderCard = new OrderCardComponent(container);
            orderCard.render(item, this.clickDetails.bind(this), this.clickDelete.bind(this));
        });
    }

    clickDetails(e) {
        const cardId = e.target.dataset.id;
        const orderPage = new OrderPage(this.parent, cardId);
        orderPage.render();
    }

    clickDelete(e) {
        const cardId = e.target.dataset.id;
        if (confirm('Вы уверены, что хотите удалить приказ?')) {
            ajax.delete(orderUrls.removeOrderById(cardId), (data, status) => {
                if (status === 204 || status === 200) {
                    this.getData();
                }
            });
        }
    }

    clickAdd() {
        const newOrderData = {
            docNumber: "Новый-№",
            date: new Date().toISOString().split('T')[0],
            department: "ИУ",
            title: "Копия приказа",
            content: "Текст нового приказа...",
            status: "Активен"
        };

        ajax.post(orderUrls.createOrder(), newOrderData, (data, status) => {
            if (status === 200 || status === 201) {
                this.getData();
            } else {
                console.error("Ошибка при добавлении, сервер вернул статус:", status);
            }
        });
    }

    onFilterInput(e) {
        this.filterValue = e.target.value;
        this.getData();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const headerContainer = document.getElementById('header-container');
        const header = new HeaderComponent(headerContainer);
        header.render(() => this.render());

        document.getElementById('add-order-btn').addEventListener('click', this.clickAdd.bind(this));

        const filterInput = document.getElementById('filter-input');
        filterInput.addEventListener('input', this.onFilterInput.bind(this));

        this.getData();
    }
}
