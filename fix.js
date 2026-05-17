const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');
c = c.replace(
  /onClick=\{.*?window\.open\(r\.url,\s*"_blank"\)\}\}/g,
  'onClick={() => window.open(r.url, "_blank")}'
);
fs.writeFileSync('app/page.tsx', c);
console.log('done');
