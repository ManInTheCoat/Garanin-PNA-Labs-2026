export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("home-button").addEventListener("click", listener);
    }

    getHTML() {
        return `
            <nav class="navbar navbar-dark bg-dark mb-4">
              <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">МГТУ им. Н.Э. Баумана | Документооборот</span>
                <button id="home-button" class="btn btn-outline-light" type="button">Домой</button>
              </div>
            </nav>
          `;
    }

    render(listener) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.addListeners(listener);
    }
}
