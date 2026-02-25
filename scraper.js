const { chromium } = require('playwright');

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=1",
  "https://sanand0.github.io/tdsdata/js_table/?seed=2",
  "https://sanand0.github.io/tdsdata/js_table/?seed=3",
  "https://sanand0.github.io/tdsdata/js_table/?seed=4",
  "https://sanand0.github.io/tdsdata/js_table/?seed=5",
  "https://sanand0.github.io/tdsdata/js_table/?seed=6",
  "https://sanand0.github.io/tdsdata/js_table/?seed=7",
  "https://sanand0.github.io/tdsdata/js_table/?seed=8",
  "https://sanand0.github.io/tdsdata/js_table/?seed=9",
  "https://sanand0.github.io/tdsdata/js_table/?seed=10"
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });

    const numbers = await page.$$eval("table", tables => {
      const extracted = [];
      tables.forEach(table => {
        table.querySelectorAll("td").forEach(td => {
          const value = parseFloat(td.innerText.replace(/[^0-9.-]/g, ''));
          if (!isNaN(value)) extracted.push(value);
        });
      });
      return extracted;
    });

    const pageTotal = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageTotal;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();