import { HeaderComponent } from "../../components/header/index.js";
import { OrderDetailsComponent } from "../../components/order-details/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { orderUrls } from "../../modules/orderUrls.js";

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

                <div class="container mt-4">
                    <div class="row">
                        <div class="col-md-7">
                            <div id="details-container"></div>
                        </div>

                        <div class="col-md-5" id="edit-form-container" style="display: none;">
                            <div class="card shadow-sm">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Редактировать приказ</h4>
                                    <form id="edit-order-form">
                                        <div class="mb-3">
                                            <label for="edit-docNumber" class="form-label text-muted small mb-1">Номер приказа</label>
                                            <input type="text" class="form-control" id="edit-docNumber" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="edit-title" class="form-label text-muted small mb-1">Название приказа</label>
                                            <input type="text" class="form-control" id="edit-title" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="edit-department" class="form-label text-muted small mb-1">Подразделение</label>
                                            <input type="text" class="form-control" id="edit-department" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="edit-status" class="form-label text-muted small mb-1">Статус</label>
                                            <select class="form-select" id="edit-status">
                                                <option value="Активен">Активен</option>
                                                <option value="Архив">Архив</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="edit-content" class="form-label text-muted small mb-1">Текст приказа</label>
                                            <textarea class="form-control" id="edit-content" rows="5" required></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary w-100">Сохранить изменения</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    getData() {
        ajax.get(orderUrls.getOrderById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                this.renderError();
            }
        });
    }

    renderData(item) {
        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = '';

        const orderDetails = new OrderDetailsComponent(detailsContainer);
        orderDetails.render(item);

        document.getElementById('edit-form-container').style.display = 'block';

        document.getElementById('edit-docNumber').value = item.docNumber;
        document.getElementById('edit-title').value = item.title;
        document.getElementById('edit-department').value = item.department;
        document.getElementById('edit-status').value = item.status;
        document.getElementById('edit-content').value = item.content;
    }

    renderError() {
        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = "<h3 class='text-center mt-5 text-danger'>Приказ не найден</h3>";
        document.getElementById('edit-form-container').style.display = 'none';
    }

    submitUpdate(e) {
        e.preventDefault();

        const updateData = {
            docNumber: document.getElementById('edit-docNumber').value,
            title: document.getElementById('edit-title').value,
            department: document.getElementById('edit-department').value,
            status: document.getElementById('edit-status').value,
            content: document.getElementById('edit-content').value
        };

        ajax.patch(orderUrls.updateOrderById(this.id), updateData, (data, status) => {
            if (status === 200) {
                this.getData();
            } else {
                alert('Произошла ошибка при сохранении изменений на сервере.');
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const headerContainer = document.getElementById('order-header-container');
        const header = new HeaderComponent(headerContainer);
        header.render(this.clickHome.bind(this));

        const editForm = document.getElementById('edit-order-form');
        if (editForm) {
            editForm.addEventListener('submit', this.submitUpdate.bind(this));
        }

        this.getData();
    }
}
