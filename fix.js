const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');
c = c.replace(
  'type BankItem = typeof BANKS.loans[0] & { isD?: boolean; isC?: boolean; minAmount?: number; maxAmount?: number; maxTerm?: number; monthly?: number; total?: number; unavailable?: string };',
  'type BankItem = typeof BANKS.loans[0] & { isD?: boolean; isC?: boolean; minAmount?: number; maxAmount?: number; maxTerm?: number; monthly?: number; total?: number; unavailable?: string; url: string; conds: string[]; docs: string[]; };'
);
fs.writeFileSync('app/page.tsx', c);
console.log('done');