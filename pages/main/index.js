import { HeaderComponent } from "../../components/header/index.js";
import { OrderCardComponent } from "../../components/order-card/index.js";
import { OrderPage } from "../order/index.js";
import { ordersData, addOrder, deleteOrder } from "../../modules/mockData.js";
import { MainBannerComponent } from "../../components/main-banner/index.js";

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
                <div class="row mb-4">
                  <div class="col-md-8">
                    <input type="text" id="filter-input" class="form-control" placeholder="Фильтр по названию или подразделению..." value="${this.filterValue}">
                  </div>
                  <div class="col-md-4 text-end">
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

    const filterInput = document.getElementById('filter-input');
    filterInput.addEventListener('input', this.onFilterInput.bind(this));

    this.renderCards();
  }
}
