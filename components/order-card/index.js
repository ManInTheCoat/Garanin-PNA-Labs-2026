export class OrderCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  addListeners(data, detailsListener, deleteListener) {
    document
      .getElementById(`details-btn-${data.id}`)
      .addEventListener("click", detailsListener);

    document
      .getElementById(`delete-btn-${data.id}`)
      .addEventListener("click", deleteListener);
  }

  getHTML(data) {
    return `
            <div class="col">
              <div class="card h-100 shadow-sm">
                <div class="card-header bg-primary text-white">
                    Приказ № ${data.docNumber}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${data.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Подразделение: ${data.department}</h6>
                  <p class="card-text">Дата: ${data.date}</p>
                </div>
                <div class="card-footer bg-transparent d-flex justify-content-between">
                  <button class="btn btn-outline-primary btn-sm" id="details-btn-${data.id}" data-id="${data.id}">Подробнее</button>
                  <button class="btn btn-outline-danger btn-sm" id="delete-btn-${data.id}" data-id="${data.id}">Удалить</button>
                </div>
              </div>
            </div>
          `;
  }

  render(data, detailsListener, deleteListener) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    this.addListeners(data, detailsListener, deleteListener);
  }
}
