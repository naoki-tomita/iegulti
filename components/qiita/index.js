const { createApp } = require("vue");
const App = require("./components/app.vue");

class AppElement extends HTMLElement {
  constructor() {
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    createApp(App).mount(this.shadowRoot);
  }
}

customElements.define("qiita-list", AppElement);
