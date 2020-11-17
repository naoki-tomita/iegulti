<template>
  <div>
  <header>
    <h1>Qiita list</h1>
  </header>
  <main>
    <div style="display: flex; justify-content: center">
      <img
        style="width: 120px;"
        v-if="loading"
        src="https://lh3.googleusercontent.com/proxy/DqyXiV4iIzAH9s5SPo2IHeU-y1VqtSV8RpFz4TaT2av0OPL2ufRZr-YTPbVtuimo39ZIfO4h8xTWKGb9X8n_XfVRdRpW1Z3Qadmz9RJ88r1961d3cD-4FSA726VQQ42oI3dgVPAk6yAmWtLa3qC3d4VqzBgWG-ykRZZGPA"
      >
    </div>
    <section v-if="!loading">
      <aside v-for="item in list" v-bind:key="item.id">
        <h3>{{ item.title }}</h3>
        <sup>{{ item.userName }}</sup>
        <p style="
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden; word-break: break-all;"
        >{{ item.abstract }}</p>
      </aside>
    </section>
  </main>
  <footer>
    <p>Powered by <a href="https://qiita.com/">Qiita</a></p>
  </footer>
  </div>
</template>

<script>
import { markdown } from "markdown";
const qitems = require("./list.json");

function fetch() {
  return new Promise(ok => setTimeout(() => ok({ json: () => qitems }), 2000));
}

export default {
  beforeMount() {
    this.fetchList();
  },
  data() {
    return {
      loading: false,
      list: [],
    };
  },
  methods: {
    async fetchList() {
      this.loading = true;
      const response = await fetch("http://qiita.com/api/v2/items?page=1&per_page=20")
      const items = await response.json();
      this.loading = false;
      this.list = items.map(it => (console.log(it.name),({
        title: it.title,
        abstract: extractText(markdown.parse(it.body)).slice(0, 200),
        body: it.rendered_body,
        userName: it.user.name || it.user.id || it.user.github_login_name
      })));
    }
  }
}
function extractText(parsed) {
  if (typeof parsed === "string") {
    return parsed;
  }
  switch (parsed[0]) {
    case "header":
    case "link":
      return parsed.slice(2).map(it => extractText(it)).join("");
    case "link_ref":
      return "<LinkRef>";
    case "img":
      return "<Image>";
    case "markdown":
      return parsed.slice(1).map(it => extractText(it)).join(" ");
    default:
      return parsed.slice(1).map(it => extractText(it)).join("");
  }
}
</script>

<style>
</style>
