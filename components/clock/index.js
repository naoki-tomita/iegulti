import React, { useState } from "react";
import { render, unmountComponentAtNode } from "react-dom";

class SimpleClock extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    render(<Clock />, this.shadow);
  }

  disconnectedCallback() {
    unmountComponentAtNode(this.shadow);
  }
}


const Clock = () => {
  const [now, setTime] = useState(new Date());
  setTimeout(() => setTime(new Date()), 250);
  now.getSeconds
  return (
    <h1>{now.toISOString()}</h1>
  );
}

function main() {
  customElements.define("simple-clock", SimpleClock);
}

main();
