const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');
c = c.replace(
  /onClick=\{\(\) => setModal\(r\)\}/g,
  'onClick={() => { window.open(r.url, "_blank"); }}'
);
fs.writeFileSync('app/page.tsx', c);
console.log('done, count:', (c.match(/window\.open/g) || []).length);