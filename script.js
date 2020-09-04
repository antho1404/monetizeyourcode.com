new Vue({
  el: ".list",
  data: function () {
    return {
      items: [],
    };
  },
  methods: {
    toggle(id) {
      const item = this.items.find((x) => x.id === id);
      item.open = !item.open;
      if (item.open) {
        dataLayer.push({
          id: item.id,
          category: item.category,
          type: "open",
        });
      }
      this.items = [...this.items];
    },
  },
  mounted() {
    fetch("https://gateway.liteflow.com/af07defd-730f-4f8f-9593-34f6148d3c48", {
      method: "POST",
    })
      .then((x) => x.json())
      .then((x) => x.outputs.values.map((y) => y.value))
      .then((x) => (this.items = x));
  },
});
