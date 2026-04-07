import { HeaderComponent } from "../../components/header/index.js";
import { OrderDetailsComponent } from "../../components/order-details/index.js";
import { MainPage } from "../main/index.js";
import { getOrderById } from "../../modules/mockData.js";

export class OrderPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = id;
  }

  get pageRoot() {
    return document.getElementById('order-page');
  }

  getHTML() {
    return `
            <div id="order-page" class="container-fluid p-0">
              <div id="order-header-container"></div>
              <div id="details-container"></div>
            </div>
          `;
  }

  clickHome() {
    const mainPage = new MainPage(this.parent);
    mainPage.render();
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const headerContainer = document.getElementById('order-header-container');
    const header = new HeaderComponent(headerContainer);
    header.render(this.clickHome.bind(this));

    const data = getOrderById(this.id);
    if (data) {
      const detailsContainer = document.getElementById('details-container');
      const orderDetails = new OrderDetailsComponent(detailsContainer);
      orderDetails.render(data);
    } else {
      document.getElementById('details-container').innerHTML = "<h3 class='text-center mt-5'>Приказ не найден</h3>";
    }
  }
}
