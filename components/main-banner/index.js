export class MainBannerComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        if (!data || data.length === 0) {
            return `
              <div class="container mt-5 mb-5">
                <div class="row">
                  <div class="col-md-6 pe-md-5 d-flex flex-column justify-content-center">
                    <h1 class="fw-bold mb-4 text-dark">МГТУ — твой первый приоритет</h1>
                    <p class="text-secondary mb-4">В данный момент активных приказов нет.</p>
                  </div>
                </div>
              </div>
              <hr class="mb-5">
            `;
        }

        const totalStr = data.length < 10 ? `0${data.length}` : data.length;

        const slides = data.map((order, index) => {
            const isActive = index === 0 ? 'active' : '';
            return `
              <div class="carousel-item ${isActive}">
                <h5 class="text-primary fw-bold mb-2">Приказ № ${order.docNumber}</h5>
                <h2 class="fw-bold mb-4 text-dark">${order.title}</h2>
                <p class="text-secondary mb-4">
                  <strong>Подразделение:</strong> ${order.department}<br>
                  <strong>Дата:</strong> ${order.date}
                </p>
                <div>
                  <button class="btn btn-primary rounded-pill px-4 py-2" id="banner-btn-${order.id}" data-id="${order.id}">Подробнее</button>
                </div>
              </div>
            `;
        }).join('');

        return `
            <div class="container mt-5 mb-5">
              <div class="row">
                <div class="col-md-6 pe-md-5 d-flex flex-column justify-content-center">
                  <h1 class="fw-bold mb-4 text-dark">МГТУ — твой первый приоритет</h1>
                  <p class="text-secondary mb-4">
                    Университет предоставляет безграничные возможности для развития: от прохождения стажировки на крупнейших промышленных предприятиях и в высокотехнологичных компаниях до реализации собственного инженерного проекта. Каждый день в стенах Бауманки проходят десятки научных и профориентационных мероприятий, а также масштабные студенческие активности, главное — желание развиваться и идти к цели!
                  </p>
                </div>

                <div class="col-md-6 ps-md-5 border-start position-relative">
                  <div id="ordersCarousel" class="carousel slide" data-bs-ride="carousel">

                    <div class="position-absolute top-0 end-0 d-flex align-items-center z-3">
                      <button class="btn btn-link text-decoration-none text-secondary p-0" type="button" data-bs-target="#ordersCarousel" data-bs-slide="prev"><</button>
                      <span class="mx-2 text-primary fw-bold small" id="carousel-counter">01 — ${totalStr}</span>
                      <button class="btn btn-link text-decoration-none text-secondary p-0" type="button" data-bs-target="#ordersCarousel" data-bs-slide="next">></button>
                    </div>

                    <div class="carousel-inner mt-5 mt-md-0 pt-4">
                      ${slides}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-5">
        `;
    }

    addListeners(data, detailsListener) {
        if (!data || data.length === 0) return;

        data.forEach(order => {
            const btn = document.getElementById(`banner-btn-${order.id}`);
            if (btn && detailsListener) {
                btn.addEventListener('click', detailsListener);
            }
        });

        const carouselElement = document.getElementById('ordersCarousel');
        const counterElement = document.getElementById('carousel-counter');

        if (carouselElement && counterElement) {
            const totalStr = data.length < 10 ? `0${data.length}` : data.length;

            carouselElement.addEventListener('slide.bs.carousel', event => {
                const current = event.to + 1;
                const currentStr = current < 10 ? `0${current}` : current;
                counterElement.innerHTML = `${currentStr} — ${totalStr}`;
            });
        }
    }

    render(data, detailsListener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        this.addListeners(data, detailsListener);
    }
}
