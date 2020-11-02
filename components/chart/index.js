import * as c3 from "c3";

class SimpleChart extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.css">
      <div></div>
    `;
    this.div = this.shadowRoot.querySelector("div");
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.columns = JSON.parse(this.dataset.columns);
    this.type = this.dataset.type ?? "line";
    if (this.renderedChart) {
      this.renderedChart && this.renderedChart.load({
        columns: this.columns,
      });
    } else {
      this.renderedChart = c3.generate({
        bindto: this.div,
        data: {
          columns: this.columns,
          type: this.type,
        },
      });
    }
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  disconnectedCallback() {
    this.renderedChart = this.renderedChart.destroy();
  }

  static get observedAttributes() {
    return ["data-columns", "data-type"];
  }
}

function main() {
  customElements.define("simple-chart", SimpleChart);
}

main();
