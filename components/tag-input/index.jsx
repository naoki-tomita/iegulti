const React = require("preact/compat");
const { render, useState } = React;

const TagInput = ({ onComplete }) => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  function onCompleteTag() {
    const newTags = [...tags, currentTag];
    setTags(newTags);
    setCurrentTag("");
    onComplete(newTags);
  }
  return (
    <>
    <span style={{ border: "1px solid #000", display: "inline-block", fontSize: 12 }}>
      {tags.map((it, i) =>
        <>
          <span style={{ backgroundColor: "#f0f0f0", borderRadius: 4 }} key={i}>
            {it}
          </span>,
        </>
      )}
      <input
        style={{ border: "none", height: "100%", outline: "none" }}
        value={currentTag}
        onKeyPress={e => (e.key === "Enter") && onCompleteTag()}
        onChange={e => setCurrentTag(e.target.value)}
      />
    </span>
    </>
  );
};



class TagInputElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  onComplete(tags) {
    const event = new CustomEvent("complete-tag", {
      bubbles: true,
      composed: true,
      detail: { tags },
    });
    this.dispatchEvent(event);
  }

  connectedCallback() {
    render(<TagInput onComplete={this.onComplete.bind(this)} />, this.shadowRoot);
  }
}

customElements.define("tag-input", TagInputElement);
