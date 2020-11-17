import Vue from "vue";
import App from "./components/App";

class AppElement extends HTMLElement {
  constructor() {
    super();
    this.div = document.createElement("div");
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
    @import 'https://unpkg.com/mvp.css';
    * {
      --border-radius: 5px;
      --box-shadow: 2px 2px 10px;
      --color: #118bee;
      --color-accent: #118bee0b;
      --color-bg: #fff;
      --color-bg-secondary: #e9e9e9;
      --color-secondary: #920de9;
      --color-secondary-accent: #920de90b;
      --color-shadow: #f4f4f4;
      --color-text: #000;
      --color-text-secondary: #999;
      --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      --hover-brightness: 1.2;
      --justify-important: center;
      --justify-normal: left;
      --line-height: 150%;
      --width-card: 285px;
      --width-card-medium: 460px;
      --width-card-wide: 800px;
      --width-content: 1080px;
    }
    </style>`;
    this.shadowRoot.append(this.div);
  }

  connectedCallback() {
    new Vue(App).$mount(this.div);
  }
}

customElements.define("qiita-list", AppElement);
