(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`home-button`).addEventListener(`click`,e)}getHTML(){return`
            <nav class="navbar navbar-dark bg-dark mb-4">
              <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">МГТУ им. Н.Э. Баумана | Документооборот</span>
                <button id="home-button" class="btn btn-outline-light" type="button">Домой</button>
              </div>
            </nav>
          `}render(e){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.addListeners(e)}},t=class{constructor(e){this.parent=e}addListeners(e,t,n){document.getElementById(`details-btn-${e.id}`).addEventListener(`click`,t),document.getElementById(`delete-btn-${e.id}`).addEventListener(`click`,n)}getHTML(e){return`
            <div class="col">
              <div class="card h-100 shadow-sm">
                <div class="card-header bg-primary text-white">
                    Приказ № ${e.docNumber}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${e.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Подразделение: ${e.department}</h6>
                  <p class="card-text">Дата: ${e.date}</p>
                </div>
                <div class="card-footer bg-transparent d-flex justify-content-between">
                  <button class="btn btn-outline-primary btn-sm" id="details-btn-${e.id}" data-id="${e.id}">Подробнее</button>
                  <button class="btn btn-outline-danger btn-sm" id="delete-btn-${e.id}" data-id="${e.id}">Удалить</button>
                </div>
              </div>
            </div>
          `}render(e,t,n){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e)),this.addListeners(e,t,n)}},n=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="container mt-4">
              <div class="card border-primary">
                <div class="card-header bg-primary text-white text-center h4">
                  Детали приказа № ${e.docNumber}
                </div>
                <div class="card-body">
                  <h5 class="card-title text-center mb-4">${e.title}</h5>
                  <ul class="list-group list-group-flush mb-4">
                    <li class="list-group-item"><strong>Подразделение:</strong> ${e.department}</li>
                    <li class="list-group-item"><strong>Дата выпуска:</strong> ${e.date}</li>
                    <li class="list-group-item"><strong>Идентификатор в системе:</strong> ${e.id}</li>
                  </ul>
                  <div class="alert alert-secondary" role="alert">
                    <strong>Содержание приказа:</strong><br>
                    ${e.content}
                  </div>
                </div>
              </div>
            </div>
          `}render(e){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e))}},r=new class{async get(e){try{let t=await fetch(e);return{data:t.ok?await t.json():null,status:t.status}}catch(e){return console.error(`Сетевая ошибка GET:`,e),{data:null,status:500}}}async post(e,t){try{let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});return{data:n.ok?await n.json():null,status:n.status}}catch(e){return console.error(`Сетевая ошибка POST:`,e),{data:null,status:500}}}async patch(e,t){try{let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});return{data:n.ok?await n.json():null,status:n.status}}catch(e){return console.error(`Сетевая ошибка PATCH:`,e),{data:null,status:500}}}async delete(e){try{return{data:null,status:(await fetch(e,{method:`DELETE`})).status}}catch(e){return console.error(`Сетевая ошибка DELETE:`,e),{data:null,status:500}}}},i=new class{constructor(){this.baseUrl=`http://localhost:3000`}getOrders(){return`${this.baseUrl}/orders`}getOrderById(e){return`${this.baseUrl}/orders/${e}`}createOrder(){return`${this.baseUrl}/orders`}removeOrderById(e){return`${this.baseUrl}/orders/${e}`}updateOrderById(e){return`${this.baseUrl}/orders/${e}`}},a=class{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById(`order-page`)}getHTML(){return`
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
        `}clickHome(){new s(this.parent).render()}async getData(){let{data:e,status:t}=await r.get(i.getOrderById(this.id));t===200&&e?this.renderData(e):this.renderError()}renderData(e){let t=document.getElementById(`details-container`);t.innerHTML=``,new n(t).render(e),document.getElementById(`edit-form-container`).style.display=`block`,document.getElementById(`edit-docNumber`).value=e.docNumber,document.getElementById(`edit-title`).value=e.title,document.getElementById(`edit-department`).value=e.department,document.getElementById(`edit-status`).value=e.status,document.getElementById(`edit-content`).value=e.content}renderError(){let e=document.getElementById(`details-container`);e.innerHTML=`<h3 class='text-center mt-5 text-danger'>Приказ не найден</h3>`,document.getElementById(`edit-form-container`).style.display=`none`}async submitUpdate(e){e.preventDefault();let t={docNumber:document.getElementById(`edit-docNumber`).value,title:document.getElementById(`edit-title`).value,department:document.getElementById(`edit-department`).value,status:document.getElementById(`edit-status`).value,content:document.getElementById(`edit-content`).value},{status:n}=await r.patch(i.updateOrderById(this.id),t);n===200?this.getData():alert(`Произошла ошибка при сохранении изменений на сервере.`)}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),new e(document.getElementById(`order-header-container`)).render(this.clickHome.bind(this));let t=document.getElementById(`edit-order-form`);t&&t.addEventListener(`submit`,this.submitUpdate.bind(this)),this.getData()}},o=class{constructor(e){this.parent=e}getHTML(e){return!e||e.length===0?`
              <div class="container mt-5 mb-5">
                <div class="row">
                  <div class="col-md-6 pe-md-5 d-flex flex-column justify-content-center">
                    <h1 class="fw-bold mb-4 text-dark">МГТУ — твой первый приоритет</h1>
                    <p class="text-secondary mb-4">В данный момент активных приказов нет.</p>
                  </div>
                </div>
              </div>
              <hr class="mb-5">
            `:`
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
                      <span class="mx-2 text-primary fw-bold small" id="carousel-counter">01 — ${e.length<10?`0${e.length}`:e.length}</span>
                      <button class="btn btn-link text-decoration-none text-secondary p-0" type="button" data-bs-target="#ordersCarousel" data-bs-slide="next">></button>
                    </div>

                    <div class="carousel-inner mt-5 mt-md-0 pt-4">
                      ${e.map((e,t)=>`
              <div class="carousel-item ${t===0?`active`:``}">
                <h5 class="text-primary fw-bold mb-2">Приказ № ${e.docNumber}</h5>
                <h2 class="fw-bold mb-4 text-dark">${e.title}</h2>
                <p class="text-secondary mb-4">
                  <strong>Подразделение:</strong> ${e.department}<br>
                  <strong>Дата:</strong> ${e.date}
                </p>
                <div>
                  <button class="btn btn-primary rounded-pill px-4 py-2" id="banner-btn-${e.id}" data-id="${e.id}">Подробнее</button>
                </div>
              </div>
            `).join(``)}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-5">
        `}addListeners(e,t){if(!e||e.length===0)return;e.forEach(e=>{let n=document.getElementById(`banner-btn-${e.id}`);n&&t&&n.addEventListener(`click`,t)});let n=document.getElementById(`ordersCarousel`),r=document.getElementById(`carousel-counter`);if(n&&r){let t=e.length<10?`0${e.length}`:e.length;n.addEventListener(`slide.bs.carousel`,e=>{let n=e.to+1;r.innerHTML=`${n<10?`0${n}`:n} — ${t}`})}}render(e,t){this.parent.insertAdjacentHTML(`beforeend`,this.getHTML(e)),this.addListeners(e,t)}},s=class{constructor(e){this.parent=e,this.filterValue=``}get pageRoot(){return document.getElementById(`main-page`)}get cardsRoot(){return document.getElementById(`cards-container`)}getHTML(){return`
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
        `}async getData(){let e=i.getOrders();this.filterValue&&(e+=`?title=${encodeURIComponent(this.filterValue)}`);let{data:t,status:n}=await r.get(e);n===200&&t&&this.renderData(t)}renderData(e){let n=document.getElementById(`main-banner-container`);n&&(n.innerHTML=``,new o(n).render(e,this.clickDetails.bind(this)));let r=this.cardsRoot;r.innerHTML=``,e.forEach(e=>{new t(r).render(e,this.clickDetails.bind(this),this.clickDelete.bind(this))})}clickDetails(e){let t=e.target.dataset.id;new a(this.parent,t).render()}async clickDelete(e){let t=e.target.dataset.id;if(confirm(`Вы уверены, что хотите удалить приказ?`)){let{status:e}=await r.delete(i.removeOrderById(t));(e===204||e===200)&&this.getData()}}async clickAdd(){let e={docNumber:`Новый-№`,date:new Date().toISOString().split(`T`)[0],department:`ИУ`,title:`Копия приказа`,content:`Текст нового приказа...`,status:`Активен`},{status:t}=await r.post(i.createOrder(),e);t===200||t===201?this.getData():console.error(`Ошибка при добавлении, сервер вернул статус:`,t)}onFilterInput(e){this.filterValue=e.target.value,this.getData()}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),new e(document.getElementById(`header-container`)).render(()=>this.render()),document.getElementById(`add-order-btn`).addEventListener(`click`,this.clickAdd.bind(this)),document.getElementById(`filter-input`).addEventListener(`input`,this.onFilterInput.bind(this)),this.getData()}};new s(document.getElementById(`root`)).render();