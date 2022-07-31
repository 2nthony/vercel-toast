import ghCorner from "@saika/github-corner";
import "../src/style.css";
import { createToast, destroyAllToasts } from "../src";
import { copyCode } from "saika-code-block-buttons";

window.createToast = createToast;
window.destroyAllToasts = destroyAllToasts;

new Saika({
  target: "app",
  highlight: ["bash"],
  nav: [
    {
      title: "GitHub",
      link: "https://github.com/2nthony/vercel-toast",
    },
  ],
  router: {
    mode: "history",
  },

  plugins: [
    ghCorner({
      repo: "2nthony/vercel-toast",
      pinned: true,
    }),
  ],

  codeBlockButtons: [copyCode],

  footer: `© {{ new Date().getFullYear() }} Made with <font color="#f04">❤</font> by
  <a href="https://github.com/2nthony">2nthony</a>.
  Powered by <a href="https://saika.vercel.app">Saika</a>.`,
});
