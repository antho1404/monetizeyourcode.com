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
    fetch("/list.json")
      .then((x) => x.json())
      .then((x) => x.values.map((y) => y.value))
      .then((x) => (this.items = x));
  },
});
