export class OrderDetailsComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(data) {
    return `
            <div class="container mt-4">
              <div class="card border-primary">
                <div class="card-header bg-primary text-white text-center h4">
                  Детали приказа № ${data.docNumber}
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center mb-4">${data.title}</h5>
                  <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item"><strong>Подразделение:</strong> ${data.department}</li>
                    <li class="list-group-item"><strong>Дата выпуска:</strong> ${data.date}</li>
                    <li class="list-group-item"><strong>Идентификатор в системе:</strong> ${data.id}</li>
                  </ul>
                  <div class="alert alert-secondary" role="alert">
                    <strong>Содержание приказа:</strong><br>
                    ${data.content}
                  </div>
                </div>
              </div>
            </div>
          `;
  }

  render(data) {
    this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
  }
}
