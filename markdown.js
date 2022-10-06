// Assuming a 'markdown-it' global
const md = window.markdownit({
    html: true,
    xhtmlOut: true,
    breaks: false,
    linkify: true,
    typographer: true,
    highlight: true
  })

class MarkdownElement extends HTMLElement {
  connectedCallback() {
    // Wait for DOM to load
    setTimeout(() => {
      let content = this.textContent;
      // Split by newline
      let lines = content.split("\n");
      // Remove first line if it's blank
      if (lines[0].match(/^\s*$/)) {
        lines.shift();
      }
      // Remove last line if it's blank
      if (lines[lines.length - 1].match(/^\s*$/)) {
        lines = lines.slice(0, lines.length - 1);
      }
      // Get base indent level
      let baseIndent = Infinity;
      for (let line of lines) {
        let thisIndent = 0;
        for (let c of line) {
          if (c === " ") {
            thisIndent += 1;
          }
        }
        baseIndent = Math.min(baseIndent, thisIndent);
      }
      // Dedent by base level
      let newContent = "";
      for (let line of lines) {
        newContent += line.substring(baseIndent - 1);
        newContent += "\n";
      }
      // Render content
      let htmlContent = md.render(newContent)
      console.log(htmlContent)
      this.innerHTML = htmlContent;
    });
  }
}
customElements.define("mark-down", MarkdownElement);