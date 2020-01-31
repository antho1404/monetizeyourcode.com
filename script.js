async function fetchSpreadsheetData(url, cols) {
  const resp = await fetch(url)
  const data = await resp.json()
  const res = []
  for (const entry of data.feed.entry) {
    const cell = entry["gs$cell"]
    if (cell.row === "1") {
      continue
    }
    res[cell.row - 2] = res[cell.row - 2] || {}
    res[cell.row - 2][cols[cell.col - 1]] = cell["$t"] === 'TRUE'
      ? true
      : cell["$t"] === 'FALSE'
        ? false
        : cell["$t"]
  }
  return res
    .filter(x => x)
}

async function load() {
  const items = await fetchSpreadsheetData(
    'https://spreadsheets.google.com/feeds/cells/1OS1cIxGmVGwqvwXs0bU0qzCDkZIN-Yrsw3Dx5scFy8c/1/public/full?alt=json',
    ['id', 'name', 'url', 'category', 'payoutType', 'payMethod', 'fees', 'openSourceFocus', 'devFocus', 'screenshot', 'short', 'description', 'logo']
  )

  new Vue({
    el: '.list',
    data: {
      items: items.map(x => ({ ...x, open: false }))
    },
    methods: {
      toggle(item) {
        item.open = !item.open
        if (item.open) {
          dataLayer.push({
            id: item.id,
            category: item.category,
            type: 'open'
          })
        }
      }
    }
  })
}

load()
