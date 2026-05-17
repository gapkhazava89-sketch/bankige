"use client";
import { useState } from "react";

const BANKS = {
  loans: [
    { bank: "TBC ბანკი", short: "TBC", product: "სწრაფი სესხი", rate: 15.9, color: "#00a3e0", bg: "#e6f5fb", badges: ["best", "online"], maxAmount: 100000, maxTerm: 84, url: "https://www.tbcbank.ge/web/ka/web/guest/consumer-loans", conds: ["მინ. ასაკი 21 წელი", "სამსახური ბოლო 3 თვე", "შემოსავალი 600₾+"], docs: ["პირადობა", "სამსახურის ცნობა", "ამონაწერი 3 თვე"] },
    { bank: "ProCredit", short: "PRO", product: "სტანდარტული სესხი", rate: 16.5, color: "#e30613", bg: "#fce8e8", badges: ["fast"], maxAmount: 50000, maxTerm: 60, url: "https://www.procreditbank.ge/ka/individuals/loans", conds: ["ასაკი 23–65", "მუდმივი შემოსავალი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "BOG", short: "BOG", product: "მომხმარებლის სესხი", rate: 17.5, color: "#e31e24", bg: "#fce8e8", badges: [], maxAmount: 80000, maxTerm: 72, url: "https://bankofgeorgia.ge/ka/retail/loans/consumer-loan", conds: ["ასაკი 21–70", "დასაქმება 6+ თვე"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Express სესხი", rate: 19.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], maxAmount: 30000, maxTerm: 48, url: "https://www.basisbank.ge/ka/individuals/loans", conds: ["ასაკი 22–65", "სამსახური ან ბიზნესი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "Liberty Bank", short: "LIB", product: "პირადი სესხი", rate: 20.5, color: "#f37021", bg: "#fef3e8", badges: [], maxAmount: 40000, maxTerm: 60, url: "https://libertybank.ge/ka/individuals/loans", conds: ["ასაკი 21+", "ნებისმიერი შემოსავალი"], docs: ["პირადობა", "პენსიის/სამსახურის ცნობა"] },
    { bank: "Credo Bank", short: "CRE", product: "მცირე სესხი", rate: 22.0, color: "#00529b", bg: "#e6eef8", badges: [], maxAmount: 20000, maxTerm: 36, url: "https://www.credobank.ge/ka/individuals/loans", conds: ["ასაკი 20–65", "მინ. შემოსავალი 400₾"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
  ],
  mortgage: [
    { bank: "TBC ბანკი", short: "TBC", product: "იპოთეკური სესხი", rate: 8.5, color: "#00a3e0", bg: "#e6f5fb", badges: ["best", "online"], maxAmount: 1000000, maxTerm: 360, url: "https://www.tbcbank.ge/web/ka/web/guest/mortgage", conds: ["ქონების 80%-მდე", "სადაზღვევო სავალდებულო"], docs: ["პირადობა", "ქონების დოკუმენტები", "ამონაწერი"] },
    { bank: "ProCredit", short: "PRO", product: "Green Home", rate: 8.9, color: "#e30613", bg: "#fce8e8", badges: ["new"], maxAmount: 500000, maxTerm: 240, url: "https://www.procreditbank.ge/ka/individuals/mortgage", conds: ["ენერგოეფექტური ბინები — 0.5% ფასდაკლება"], docs: ["პირადობა", "ენერგოსერტიფიკატი"] },
    { bank: "BOG", short: "BOG", product: "სახლი", rate: 9.0, color: "#e31e24", bg: "#fce8e8", badges: [], maxAmount: 800000, maxTerm: 360, url: "https://bankofgeorgia.ge/ka/retail/loans/mortgage", conds: ["პირველი შენატანი 20%", "ვადა 30 წლამდე"], docs: ["პირადობა", "ქონების ნასყიდობა"] },
    { bank: "Basis Bank", short: "BAS", product: "იპოთეკა", rate: 9.8, color: "#2d2d6b", bg: "#ebebf5", badges: [], maxAmount: 300000, maxTerm: 300, url: "https://www.basisbank.ge/ka/individuals/mortgage", conds: ["მინ. 25% შენატანი"], docs: ["პირადობა", "ქონების შეფასება"] },
    { bank: "Liberty Bank", short: "LIB", product: "სახლი Plus", rate: 10.2, color: "#f37021", bg: "#fef3e8", badges: [], maxAmount: 250000, maxTerm: 240, url: "https://libertybank.ge/ka/individuals/mortgage", conds: ["პირველი შენატანი 30%"], docs: ["პირადობა", "ქონების დოკუმენტები"] },
  ],
  deposits: [
    { bank: "Credo Bank", short: "CRE", product: "12 თვიანი დეპოზიტი", rate: 12.0, color: "#00529b", bg: "#e6eef8", badges: ["best"], isD: true, minAmount: 500, maxTerm: 24, url: "https://www.credobank.ge/ka/individuals/deposits", conds: ["მინ. 500₾", "ვადამდე გამოტანა — პროცენტის დაკარგვა"], docs: ["პირადობა"] },
    { bank: "TBC ბანკი", short: "TBC", product: "TBC დეპოზიტი", rate: 11.5, color: "#00a3e0", bg: "#e6f5fb", badges: ["online"], isD: true, minAmount: 100, maxTerm: 36, url: "https://www.tbcbank.ge/web/ka/web/guest/deposits", conds: ["მინ. 100₾", "ონლაინ გახსნა"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "ლარი Plus", rate: 11.0, color: "#f37021", bg: "#fef3e8", badges: [], isD: true, minAmount: 1000, maxTerm: 24, url: "https://libertybank.ge/ka/individuals/deposits", conds: ["მინ. 1000₾"], docs: ["პირადობა", "TIN"] },
    { bank: "BOG", short: "BOG", product: "ფიქსირებული", rate: 10.5, color: "#e31e24", bg: "#fce8e8", badges: [], isD: true, minAmount: 200, maxTerm: 12, url: "https://bankofgeorgia.ge/ka/retail/deposits", conds: ["მინ. 200₾", "6 ან 12 თვე"], docs: ["პირადობა"] },
    { bank: "Basis Bank", short: "BAS", product: "სტანდარტული", rate: 10.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], isD: true, minAmount: 300, maxTerm: 24, url: "https://www.basisbank.ge/ka/individuals/deposits", conds: ["მინ. 300₾"], docs: ["პირადობა"] },
  ],
  cards: [
    { bank: "BOG", short: "BOG", product: "Visa Platinum", rate: 22.5, color: "#e31e24", bg: "#fce8e8", badges: ["best"], isC: true, url: "https://bankofgeorgia.ge/ka/retail/cards", conds: ["Cashback 2%", "VIP lounge"], docs: ["პირადობა", "შემოსავალი 1500₾+"] },
    { bank: "TBC ბანკი", short: "TBC", product: "Mastercard Gold", rate: 24.0, color: "#00a3e0", bg: "#e6f5fb", badges: ["online"], isC: true, url: "https://www.tbcbank.ge/web/ka/web/guest/credit-cards", conds: ["Cashback 1.5%", "Apple/Google Pay"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Visa Classic", rate: 26.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], isC: true, url: "https://www.basisbank.ge/ka/individuals/cards", conds: ["წლიური 10₾"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "Mastercard Classic", rate: 28.0, color: "#f37021", bg: "#fef3e8", badges: [], isC: true, url: "https://libertybank.ge/ka/individuals/cards", conds: ["ემისია უფასო"], docs: ["პირადობა"] },
    { bank: "Credo Bank", short: "CRE", product: "Visa Standard", rate: 30.0, color: "#00529b", bg: "#e6eef8", badges: [], isC: true, url: "https://www.credobank.ge/ka/individuals/cards", conds: ["ლიმიტი 1000₾"], docs: ["პირადობა"] },
  ]
};

const DISCLAIMER = {
  ka: "⚠️ ინფორმაცია შეგროვებულია საჯარო წყაროებიდან და შეიძლება არ იყოს ზუსტი. დეტალური და განახლებული პირობებისთვის მიმართეთ უშუალოდ ბანკს. BankiGe არ იღებს პასუხისმგებლობას მოცემულ მონაცემებზე.",
  en: "⚠️ Information is collected from public sources and may not be accurate. For detailed and up-to-date terms, please contact the bank directly. BankiGe is not responsible for the data provided.",
  ru: "⚠️ Информация собрана из открытых источников и может быть неточной. Для получения подробных условий обращайтесь непосредственно в банк. BankiGe не несёт ответственности за предоставленные данные."
};

function mp(P: number, r: number, n: number) {
  const m = r / 12 / 100;
  if (m === 0) return P / n;
  return (P * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

type TabKey = keyof typeof BANKS;
type BankItem = typeof BANKS.loans[0] & { isD?: boolean; isC?: boolean; minAmount?: number; maxAmount?: number; maxTerm?: number };

export default function Home() {
  const [curTab, setCurTab] = useState<TabKey>("loans");
  const [amount, setAmount] = useState("10000");
  const [term, setTerm] = useState("24");
  const [amountErr, setAmountErr] = useState("");
  const [termErr, setTermErr] = useState("");
  const [modal, setModal] = useState<BankItem | null>(null);
  const [lang, setLang] = useState<keyof typeof DISCLAIMER>("ka");
  const [sortBy, setSortBy] = useState("rate");
  const [filterBank, setFilterBank] = useState("all");

  const amt = parseFloat(amount) || 0;
  const trm = parseInt(term) || 0;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "loans", label: "სესხები" },
    { key: "mortgage", label: "იპოთეკა" },
    { key: "deposits", label: "დეპოზიტები" },
    { key: "cards", label: "ბარათები" },
  ];

  const banks = ["TBC", "BOG", "BAS", "LIB", "CRE", "PRO"];

  function getRows() {
    let rows = (BANKS[curTab] as BankItem[]).map((r) => {
      const isD = r.isD;
      const isC = r.isC;
      let unavailable = "";
      if (!isD && !isC) {
        if (r.maxAmount && amt > r.maxAmount) unavailable = `მაქს. თანხა: ${r.maxAmount.toLocaleString()}₾`;
        else if (r.maxTerm && trm > r.maxTerm) unavailable = `მაქს. ვადა: ${r.maxTerm} თვე`;
      }
      if (isD && r.minAmount && amt < r.minAmount) unavailable = `მინ. თანხა: ${r.minAmount.toLocaleString()}₾`;
      if (isD && r.maxTerm && trm > r.maxTerm) unavailable = `მაქს. ვადა: ${r.maxTerm} თვე`;
      const monthly = isD ? amt * (r.rate / 100 / 12) : isC ? 0 : mp(amt, r.rate, trm);
      const total = isD ? monthly * trm : isC ? 0 : monthly * trm;
      return { ...r, monthly, total, unavailable };
    });

    if (filterBank !== "all") rows = rows.filter((r) => r.short === filterBank);
    rows.sort((a, b) => {
      if (a.unavailable && !b.unavailable) return 1;
      if (!a.unavailable && b.unavailable) return -1;
      const isD = a.isD;
      if (sortBy === "rate") return isD ? b.rate - a.rate : a.rate - b.rate;
      if (sortBy === "monthly") return isD ? b.monthly - a.monthly : a.monthly - b.monthly;
      return isD ? b.total - a.total : a.total - b.total;
    });
    return rows;
  }

  const rows = getRows();
  const available = rows.filter((r) => !r.unavailable);
  const best = available[0];
  const worst = available[available.length - 1];
  const saving = best && worst ? (best.isD ? best.total - worst.total : worst.total - best.total) : 0;

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "var(--color-background-primary, #fff)", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "#0f1923", padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "#e94560", borderRadius: 7, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 7 }}>
            <span style={{ background: "#fff", borderRadius: 2 }} /><span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} /><span style={{ background: "#fff", borderRadius: 2, opacity: 0.25 }} />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 18, letterSpacing: 0.3 }}>BankiGe</div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>ბანკების შედარება</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["ka", "en", "ru"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: "0.5px solid", borderColor: lang === l ? "#e94560" : "rgba(255,255,255,.2)", background: lang === l ? "#e94560" : "transparent", color: "#fff", cursor: "pointer" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* DISCLAIMER BANNER */}
      <div style={{ background: "#fff8e1", borderBottom: "1px solid #ffe082", padding: "0.65rem 1.5rem", fontSize: 12, color: "#7B6000", lineHeight: 1.5 }}>
        {DISCLAIMER[lang]}
      </div>

      {/* TABS */}
      <div style={{ background: "#141f2b", display: "flex", padding: "0 1.5rem", borderBottom: "0.5px solid rgba(255,255,255,.07)" }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setCurTab(t.key); setFilterBank("all"); }} style={{ padding: "0.75rem 1.1rem", fontSize: 12, color: curTab === t.key ? "#fff" : "rgba(255,255,255,.4)", background: "transparent", border: "none", borderBottom: curTab === t.key ? "2px solid #e94560" : "2px solid transparent", cursor: "pointer", fontFamily: "Georgia, serif", letterSpacing: 0.5, textTransform: "uppercase" }}>{t.label}</button>
        ))}
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 8, padding: "0.9rem 1.5rem", borderBottom: "0.5px solid #eee", flexWrap: "wrap", alignItems: "center", background: "#fafafa" }}>
        <span style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>ბანკი:</span>
        {["all", ...banks].map((b) => (
          <button key={b} onClick={() => setFilterBank(b)} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, border: "0.5px solid", borderColor: filterBank === b ? "#0f1923" : "#ddd", background: filterBank === b ? "#0f1923" : "transparent", color: filterBank === b ? "#fff" : "#555", cursor: "pointer", fontFamily: "Georgia, serif" }}>{b === "all" ? "ყველა" : b}</button>
        ))}
        <div style={{ width: 1, height: 20, background: "#ddd", margin: "0 4px" }} />
        <span style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>სორტი:</span>
        <select onChange={(e) => setSortBy(e.target.value)} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 6, border: "0.5px solid #ddd", background: "#fff", fontFamily: "Georgia, serif", cursor: "pointer" }}>
          <option value="rate">განაკვეთი</option>
          <option value="monthly">თვიური</option>
          <option value="total">სულ</option>
        </select>
      </div>

      {/* CALC BAR */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "1rem 1.5rem", background: "#f5f5f5", borderBottom: "0.5px solid #eee" }}>
        <div style={{ background: "#fff", border: "0.5px solid #eee", borderRadius: 10, padding: "0.75rem 1rem" }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>თანხა (₾)</div>
          <input type="number" value={amount} min={1} onChange={(e) => { setAmount(e.target.value); setAmountErr(parseFloat(e.target.value) < 1 ? "მინ. 1₾" : ""); }} style={{ width: "100%", fontSize: 20, fontWeight: 500, border: "none", outline: "none", fontFamily: "Georgia, serif", background: "transparent", color: amountErr ? "#ef4444" : "#111" }} placeholder="მაგ. 15000" />
          {amountErr && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>{amountErr}</div>}
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #eee", borderRadius: 10, padding: "0.75rem 1rem" }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 6 }}>ვადა (თვე)</div>
          <input type="number" value={term} min={1} onChange={(e) => { setTerm(e.target.value); setTermErr(parseInt(e.target.value) < 1 ? "მინ. 1 თვე" : ""); }} style={{ width: "100%", fontSize: 20, fontWeight: 500, border: "none", outline: "none", fontFamily: "Georgia, serif", background: "transparent", color: termErr ? "#ef4444" : "#111" }} placeholder="მაგ. 36" />
          {termErr && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>{termErr}</div>}
        </div>
      </div>

      {/* SUMMARY */}
      {best && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "0.9rem 1.5rem", borderBottom: "0.5px solid #eee" }}>
          {[{ label: "საუკეთესო განაკვეთი", val: best.rate.toFixed(1) + "%", color: "#10b981" },
            { label: "მინ. თვიური", val: (best.isD ? "+" : "") + Math.round(best.monthly).toLocaleString() + " ₾", color: "#111" },
            { label: "დაზოგვა", val: (saving > 0 ? "+" : "") + Math.round(Math.abs(saving)).toLocaleString() + " ₾", color: "#10b981" }
          ].map((s) => (
            <div key={s.label} style={{ background: "#fafafa", border: "0.5px solid #eee", borderRadius: 8, padding: "0.65rem 0.9rem" }}>
              <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{s.label}</div>
              <div style={{ fontSize: 17, fontWeight: 500, fontFamily: "Georgia, serif", color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#0f1923" }}>
              {["ბანკი", "წლ. განაკვეთი", "თვიური", "სულ გადახდა", "ლინკი", ""].map((h) => (
                <th key={h} style={{ padding: "0.7rem 1rem", textAlign: "left", fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,.55)", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: "0.5px solid #eee", background: r.unavailable ? "#fafafa" : i === 0 ? "rgba(16,185,129,.04)" : "#fff", cursor: r.unavailable ? "default" : "pointer" }}
                onClick={() => !r.unavailable && setModal(r)}>
                <td style={{ padding: "0.75rem 1rem", borderLeft: i === 0 && !r.unavailable ? "3px solid #10b981" : "3px solid transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: r.unavailable ? 0.45 : 1 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 500, color: r.color, border: "0.5px solid #eee", flexShrink: 0 }}>{r.short}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{r.bank}</div>
                      <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>{r.product}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "0.75rem 1rem", opacity: r.unavailable ? 0.4 : 1 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, fontFamily: "Georgia, serif", color: r.unavailable ? "#999" : r.rate < 18 ? "#10b981" : r.rate < 24 ? "#f59e0b" : "#ef4444" }}>{r.rate.toFixed(1)}%</span>
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  {r.unavailable ? <span style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", padding: "3px 8px", borderRadius: 6 }}>❌ {r.unavailable}</span>
                    : <span style={{ fontWeight: 500 }}>{(r.isD ? "+" : "") + Math.round(r.monthly).toLocaleString()} ₾</span>}
                </td>
                <td style={{ padding: "0.75rem 1rem", color: "#888", fontSize: 12, opacity: r.unavailable ? 0.4 : 1 }}>
                  {!r.isC && !r.unavailable ? Math.round(r.total).toLocaleString() + " ₾" : r.isC ? "—" : "—"}
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                    style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "#0f1923", color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}>
                    ბანკის საიტი ↗
                  </a>
                </td>
                <td style={{ padding: "0.75rem 1rem" }}>
                  {!r.unavailable && (
                    <button onClick={(e) => { e.stopPropagation(); setModal(r); }}
                      style={{ fontSize: 11, padding: "5px 12px", borderRadius: 6, border: "0.5px solid #ddd", background: "transparent", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                      დეტალები
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER DISCLAIMER */}
      <div style={{ padding: "1.5rem", borderTop: "0.5px solid #eee", marginTop: "1rem", background: "#fafafa" }}>
        <div style={{ fontSize: 11, color: "#999", lineHeight: 1.7, maxWidth: 700 }}>
          <strong style={{ color: "#666" }}>BankiGe · {new Date().getFullYear()}</strong><br />
          {DISCLAIMER[lang]}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }}>
            <div style={{ background: "#0f1923", padding: "1.1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 500 }}>{modal.bank} — {modal.product}</div>
              <button onClick={() => setModal(null)} style={{ width: 28, height: 28, borderRadius: "50%", border: "0.5px solid rgba(255,255,255,.2)", background: "transparent", color: "rgba(255,255,255,.7)", fontSize: 16, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" }}>
                {[
                  { l: "წლ. განაკვეთი", v: modal.rate.toFixed(1) + "%", c: "#10b981" },
                  { l: "თვიური", v: (modal.isD ? "+" : "") + Math.round(modal.monthly!).toLocaleString() + " ₾", c: "#111" },
                  { l: "სულ გადახდა", v: modal.isC ? "—" : Math.round(modal.total!).toLocaleString() + " ₾", c: "#111" },
                  { l: "გადაჭარბება", v: modal.isC || modal.isD ? "—" : Math.round(modal.total! - amt).toLocaleString() + " ₾", c: "#f59e0b" },
                ].map((s) => (
                  <div key={s.l} style={{ background: "#f9f9f9", borderRadius: 8, padding: "0.65rem 0.85rem" }}>
                    <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontSize: 16, fontWeight: 500, fontFamily: "Georgia, serif", color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "0.9rem" }}>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>პირობები</div>
                {modal.conds.map((c, i) => <div key={i} style={{ fontSize: 13, color: "#555", padding: "4px 0", borderBottom: "0.5px solid #f0f0f0", display: "flex", gap: 7, alignItems: "center" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />{c}</div>)}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>საჭირო დოკუმენტები</div>
                {modal.docs.map((d, i) => <div key={i} style={{ fontSize: 13, color: "#555", padding: "4px 0", borderBottom: "0.5px solid #f0f0f0", display: "flex", gap: 7, alignItems: "center" }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, display: "inline-block" }} />{d}</div>)}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={modal.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "0.7rem", borderRadius: 8, background: "#0f1923", color: "#fff", textAlign: "center", textDecoration: "none", fontSize: 13, fontFamily: "Georgia, serif" }}>ბანკის საიტი ↗</a>
                <button onClick={() => setModal(null)} style={{ flex: 1, padding: "0.7rem", borderRadius: 8, background: "transparent", border: "0.5px solid #ddd", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif" }}>დახურვა</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
