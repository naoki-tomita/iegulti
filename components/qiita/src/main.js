import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

class VueApp extends HTMLElement {
  constructor() {
    this.shadowRoot = this.attachShadow;
  }

  connectedCallback() {
    createApp(App).mount(this);
  }
}

customElements.define("qiita-list", VueApp);
