"use client";
import { useState } from "react";

const BANKS = {
  loans: [
    { bank: "TBC ბანკი", short: "TBC", product: "სწრაფი სესხი", rate: 15.9, color: "#00a3e0", bg: "#e6f5fb", badges: ["best", "online"], maxAmount: 100000, maxTerm: 84, url: "https://www.tbcbank.ge/web/ka/web/guest/consumer-loans", conds: ["მინ. ასაკი 21 წელი", "სამსახური ბოლო 3 თვე", "შემოსავალი 600₾+"], docs: ["პირადობა", "სამსახურის ცნობა", "ამონაწერი 3 თვე"] },
    { bank: "ProCredit", short: "PRO", product: "სტანდარტული სესხი", rate: 16.5, color: "#e30613", bg: "#fce8e8", badges: ["fast"], maxAmount: 50000, maxTerm: 60, url: "https://www.procreditbank.ge/ka/individuals/loans/consumer-loan", conds: ["ასაკი 23-65", "მუდმივი შემოსავალი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "BOG", short: "BOG", product: "მომხმარებლის სესხი", rate: 17.5, color: "#e31e24", bg: "#fce8e8", badges: [], maxAmount: 80000, maxTerm: 72, url: "https://bankofgeorgia.ge/ka/retail/loans/consumer-loan", conds: ["ასაკი 21-70", "დასაქმება 6+ თვე"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Express სესხი", rate: 19.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], maxAmount: 30000, maxTerm: 48, url: "https://www.basisbank.ge/ka/individuals/loans/express-loan", conds: ["ასაკი 22-65", "სამსახური ან ბიზნესი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "Liberty Bank", short: "LIB", product: "პირადი სესხი", rate: 20.5, color: "#f37021", bg: "#fef3e8", badges: [], maxAmount: 40000, maxTerm: 60, url: "https://libertybank.ge/ka/individuals/loans/personal-loan", conds: ["ასაკი 21+", "ნებისმიერი შემოსავალი"], docs: ["პირადობა", "პენსიის/სამსახურის ცნობა"] },
    { bank: "Credo Bank", short: "CRE", product: "მცირე სესხი", rate: 22.0, color: "#00529b", bg: "#e6eef8", badges: [], maxAmount: 20000, maxTerm: 36, url: "https://www.credobank.ge/ka/individuals/loans/consumer-loan", conds: ["ასაკი 20-65", "მინ. შემოსავალი 400 ლარი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
  ],
  mortgage: [
    { bank: "TBC ბანკი", short: "TBC", product: "იპოთეკური სესხი", rate: 8.5, color: "#00a3e0", bg: "#e6f5fb", badges: ["best", "online"], maxAmount: 1000000, maxTerm: 360, url: "https://www.tbcbank.ge/web/ka/web/guest/mortgage-loan-calculator", conds: ["ქონების 80%-მდე", "სადაზღვევო სავალდებულო"], docs: ["პირადობა", "ქონების დოკუმენტები"] },
    { bank: "ProCredit", short: "PRO", product: "Green Home", rate: 8.9, color: "#e30613", bg: "#fce8e8", badges: ["new"], maxAmount: 500000, maxTerm: 240, url: "https://www.procreditbank.ge/ka/individuals/loans/mortgage", conds: ["ენერგოეფექტური ბინები"], docs: ["პირადობა", "ენერგოსერტიფიკატი"] },
    { bank: "BOG", short: "BOG", product: "სახლი", rate: 9.0, color: "#e31e24", bg: "#fce8e8", badges: [], maxAmount: 800000, maxTerm: 360, url: "https://bankofgeorgia.ge/ka/retail/loans/mortgage", conds: ["პირველი შენატანი 20%"], docs: ["პირადობა", "ქონების ნასყიდობა"] },
    { bank: "Basis Bank", short: "BAS", product: "იპოთეკა", rate: 9.8, color: "#2d2d6b", bg: "#ebebf5", badges: [], maxAmount: 300000, maxTerm: 300, url: "https://www.basisbank.ge/ka/individuals/loans/mortgage", conds: ["მინ. 25% შენატანი"], docs: ["პირადობა", "ქონების შეფასება"] },
    { bank: "Liberty Bank", short: "LIB", product: "სახლი Plus", rate: 10.2, color: "#f37021", bg: "#fef3e8", badges: [], maxAmount: 250000, maxTerm: 240, url: "https://libertybank.ge/ka/individuals/loans/mortgage", conds: ["პირველი შენატანი 30%"], docs: ["პირადობა", "ქონების დოკუმენტები"] },
  ],
  deposits: [
    { bank: "Credo Bank", short: "CRE", product: "12 თვიანი დეპოზიტი", rate: 12.0, color: "#00529b", bg: "#e6eef8", badges: ["best"], isD: true, minAmount: 500, maxTerm: 24, url: "https://www.credobank.ge/ka/individuals/deposits", conds: ["მინ. 500 ლარი", "ვადამდე გამოტანა - პროცენტის დაკარგვა"], docs: ["პირადობა"] },
    { bank: "TBC ბანკი", short: "TBC", product: "TBC დეპოზიტი", rate: 11.5, color: "#00a3e0", bg: "#e6f5fb", badges: ["online"], isD: true, minAmount: 100, maxTerm: 36, url: "https://www.tbcbank.ge/web/ka/web/guest/deposits", conds: ["მინ. 100 ლარი", "ონლაინ გახსნა"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "ლარი Plus", rate: 11.0, color: "#f37021", bg: "#fef3e8", badges: [], isD: true, minAmount: 1000, maxTerm: 24, url: "https://libertybank.ge/ka/individuals/deposits", conds: ["მინ. 1000 ლარი"], docs: ["პირადობა"] },
    { bank: "BOG", short: "BOG", product: "ფიქსირებული", rate: 10.5, color: "#e31e24", bg: "#fce8e8", badges: [], isD: true, minAmount: 200, maxTerm: 12, url: "https://bankofgeorgia.ge/ka/retail/deposits", conds: ["მინ. 200 ლარი"], docs: ["პირადობა"] },
    { bank: "Basis Bank", short: "BAS", product: "სტანდარტული", rate: 10.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], isD: true, minAmount: 300, maxTerm: 24, url: "https://www.basisbank.ge/ka/individuals/deposits", conds: ["მინ. 300 ლარი"], docs: ["პირადობა"] },
  ],
  cards: [
    { bank: "BOG", short: "BOG", product: "Visa Platinum", rate: 22.5, color: "#e31e24", bg: "#fce8e8", badges: ["best"], isC: true, url: "https://bankofgeorgia.ge/ka/retail/cards/credit-cards", conds: ["Cashback 2%", "VIP lounge"], docs: ["პირადობა", "შემოსავალი 1500 ლარი+"] },
    { bank: "TBC ბანკი", short: "TBC", product: "Mastercard Gold", rate: 24.0, color: "#00a3e0", bg: "#e6f5fb", badges: ["online"], isC: true, url: "https://www.tbcbank.ge/web/ka/web/guest/credit-cards", conds: ["Cashback 1.5%", "Apple/Google Pay"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Visa Classic", rate: 26.0, color: "#2d2d6b", bg: "#ebebf5", badges: [], isC: true, url: "https://www.basisbank.ge/ka/individuals/cards/credit-cards", conds: ["წლიური 10 ლარი"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "Mastercard Classic", rate: 28.0, color: "#f37021", bg: "#fef3e8", badges: [], isC: true, url: "https://libertybank.ge/ka/individuals/cards/credit-cards", conds: ["ემისია უფასო"], docs: ["პირადობა"] },
    { bank: "Credo Bank", short: "CRE", product: "Visa Standard", rate: 30.0, color: "#00529b", bg: "#e6eef8", badges: [], isC: true, url: "https://www.credobank.ge/ka/individuals/cards/credit-cards", conds: ["ლიმიტი 1000 ლარი"], docs: ["პირადობა"] },
  ]
};

const DISCLAIMER = {
  ka: "ინფორმაცია შეგროვებულია საჯარო წყაროებიდან და შეიძლება არ იყოს ზუსტი. დეტალური პირობებისთვის მიმართეთ უშუალოდ ბანკს. BankiGe არ იღებს პასუხისმგებლობას.",
  en: "Information is collected from public sources and may not be accurate. For detailed terms, contact the bank directly. BankiGe is not responsible for the data.",
  ru: "Информация собрана из открытых источников и может быть неточной. За подробными условиями обращайтесь в банк. BankiGe не несёт ответственности."
};

function mp(P: number, r: number, n: number): number {
  const m = r / 12 / 100;
  if (m === 0) return P / n;
  return (P * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

interface BankRow {
  bank: string;
  short: string;
  product: string;
  rate: number;
  color: string;
  bg: string;
  badges: string[];
  url: string;
  conds: string[];
  docs: string[];
  isD?: boolean;
  isC?: boolean;
  minAmount?: number;
  maxAmount?: number;
  maxTerm?: number;
  monthly: number;
  total: number;
  unavailable: string;
}

type TabKey = keyof typeof BANKS;
type LangKey = keyof typeof DISCLAIMER;

export default function Home() {
  const [curTab, setCurTab] = useState<TabKey>("loans");
  const [amount, setAmount] = useState("10000");
  const [term, setTerm] = useState("24");
  const [lang, setLang] = useState<LangKey>("ka");
  const [sortBy, setSortBy] = useState("rate");
  const [filterBank, setFilterBank] = useState("all");
  const [modal, setModal] = useState<BankRow | null>(null);

  const amt = parseFloat(amount) || 0;
  const trm = parseInt(term) || 0;

  const tabs: { key: TabKey; label: string }[] = [
    { key: "loans", label: "სესხები" },
    { key: "mortgage", label: "იპოთეკა" },
    { key: "deposits", label: "დეპოზიტები" },
    { key: "cards", label: "ბარათები" },
  ];

  const banks = ["TBC", "BOG", "BAS", "LIB", "CRE", "PRO"];

  function getRows(): BankRow[] {
    const raw = BANKS[curTab];
    let rows: BankRow[] = raw.map((r) => {
      let unavailable = "";
      if (!r.isD && !r.isC) {
        if (r.maxAmount && amt > r.maxAmount) unavailable = "მაქს. " + r.maxAmount.toLocaleString() + " ლარი";
        else if (r.maxTerm && trm > r.maxTerm) unavailable = "მაქს. " + r.maxTerm + " თვე";
      }
      if (r.isD && r.minAmount && amt < r.minAmount) unavailable = "მინ. " + r.minAmount.toLocaleString() + " ლარი";
      if (r.isD && r.maxTerm && trm > r.maxTerm) unavailable = "მაქს. " + r.maxTerm + " თვე";
      const monthly = r.isD ? amt * (r.rate / 100 / 12) : r.isC ? 0 : mp(amt, r.rate, trm);
      const total = r.isD ? monthly * trm : r.isC ? 0 : monthly * trm;
      return { ...r, monthly, total, unavailable };
    });

    if (filterBank !== "all") rows = rows.filter((r) => r.short === filterBank);
    rows.sort((a, b) => {
      if (a.unavailable && !b.unavailable) return 1;
      if (!a.unavailable && b.unavailable) return -1;
      if (sortBy === "rate") return a.isD ? b.rate - a.rate : a.rate - b.rate;
      if (sortBy === "monthly") return a.isD ? b.monthly - a.monthly : a.monthly - b.monthly;
      return a.isD ? b.total - a.total : a.total - b.total;
    });
    return rows;
  }

  const rows = getRows();
  const available = rows.filter((r) => !r.unavailable);
  const best = available[0];
  const worst = available[available.length - 1];
  const saving = best && worst ? (best.isD ? best.total - worst.total : worst.total - best.total) : 0;

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#fff", minHeight: "100vh" }}>

      <div style={{ background: "#0f1923", padding: "0.9rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#e94560", borderRadius: 7, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 6, flexShrink: 0 }}>
            <span style={{ background: "#fff", borderRadius: 2 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.25 }} />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 17 }}>BankiGe</div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" as const }}>ბანკების შედარება</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {(["ka", "en", "ru"] as LangKey[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 20, border: "0.5px solid", borderColor: lang === l ? "#e94560" : "rgba(255,255,255,.2)", background: lang === l ? "#e94560" : "transparent", color: "#fff", cursor: "pointer" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff8e1", borderBottom: "1px solid #ffe082", padding: "0.5rem 1rem", fontSize: 11, color: "#7B6000", lineHeight: 1.5 }}>
        &#9888; {DISCLAIMER[lang]}
      </div>

      <div style={{ background: "#141f2b", display: "flex", overflowX: "auto" as const, borderBottom: "0.5px solid rgba(255,255,255,.07)" }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setCurTab(t.key); setFilterBank("all"); }} style={{ padding: "0.6rem 0.9rem", fontSize: 11, color: curTab === t.key ? "#fff" : "rgba(255,255,255,.4)", background: "transparent", border: "none", borderBottom: curTab === t.key ? "2px solid #e94560" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap" as const }}>{t.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, padding: "0.6rem 1rem", borderBottom: "0.5px solid #eee", flexWrap: "wrap" as const, background: "#fafafa" }}>
        {["all", ...banks].map((b) => (
          <button key={b} onClick={() => setFilterBank(b)} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, border: "0.5px solid", borderColor: filterBank === b ? "#0f1923" : "#ddd", background: filterBank === b ? "#0f1923" : "transparent", color: filterBank === b ? "#fff" : "#555", cursor: "pointer" }}>{b === "all" ? "ყველა" : b}</button>
        ))}
        <select onChange={(e) => setSortBy(e.target.value)} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, border: "0.5px solid #ddd", marginLeft: "auto" }}>
          <option value="rate">განაკვეთი</option>
          <option value="monthly">თვიური</option>
          <option value="total">სულ</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0.8rem 1rem", background: "#f5f5f5", borderBottom: "0.5px solid #eee" }}>
        <div style={{ background: "#fff", border: "0.5px solid #eee", borderRadius: 10, padding: "0.6rem 0.9rem" }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" as const, marginBottom: 4 }}>თანხა (ლარი)</div>
          <input type="number" value={amount} min={1} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", fontSize: 20, fontWeight: 500, border: "none", outline: "none", background: "transparent" }} placeholder="10000" />
        </div>
        <div style={{ background: "#fff", border: "0.5px solid #eee", borderRadius: 10, padding: "0.6rem 0.9rem" }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" as const, marginBottom: 4 }}>ვადა (თვე)</div>
          <input type="number" value={term} min={1} onChange={(e) => setTerm(e.target.value)} style={{ width: "100%", fontSize: 20, fontWeight: 500, border: "none", outline: "none", background: "transparent" }} placeholder="24" />
        </div>
      </div>

      {best && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, padding: "0.7rem 1rem", borderBottom: "0.5px solid #eee" }}>
          {[
            { l: "საუკეთ. განაკვ.", v: best.rate.toFixed(1) + "%", c: "#10b981" },
            { l: "მინ. თვიური", v: (best.isD ? "+" : "") + Math.round(best.monthly).toLocaleString() + " ₾", c: "#111" },
            { l: "დაზოგვა", v: "+" + Math.round(Math.abs(saving)).toLocaleString() + " ₾", c: "#10b981" }
          ].map((s) => (
            <div key={s.l} style={{ background: "#fafafa", border: "0.5px solid #eee", borderRadius: 8, padding: "0.5rem 0.7rem" }}>
              <div style={{ fontSize: 9, color: "#888", marginBottom: 2 }}>{s.l}</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "0.5rem" }}>
        {rows.map((r, i) => (
          <div key={i} style={{ border: "0.5px solid #eee", borderLeft: i === 0 && !r.unavailable ? "3px solid #10b981" : "0.5px solid #eee", borderRadius: 10, marginBottom: 8, overflow: "hidden", background: r.unavailable ? "#fafafa" : i === 0 ? "rgba(16,185,129,.03)" : "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0.85rem", borderBottom: "0.5px solid #f0f0f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 7, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600, color: r.color, border: "0.5px solid #eee", flexShrink: 0, opacity: r.unavailable ? 0.4 : 1 }}>{r.short}</div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13, color: r.unavailable ? "#aaa" : "#111" }}>{r.bank}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{r.product}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ fontSize: 19, fontWeight: 600, color: r.unavailable ? "#ccc" : r.rate < 18 ? "#10b981" : r.rate < 24 ? "#f59e0b" : "#ef4444" }}>{r.rate.toFixed(1)}%</div>
                <div style={{ fontSize: 9, color: "#aaa" }}>წლ. განაკვეთი</div>
              </div>
            </div>

            {r.unavailable ? (
              <div style={{ padding: "0.5rem 0.85rem", fontSize: 12, color: "#ef4444", background: "#fef2f2" }}>&#10060; ეს ბანკი ვერ გთავაზობს: {r.unavailable}</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ padding: "0.5rem 0.85rem", borderRight: "0.5px solid #f0f0f0" }}>
                  <div style={{ fontSize: 9, color: "#888", marginBottom: 2 }}>თვიური გადასახდელი</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{(r.isD ? "+" : "") + Math.round(r.monthly).toLocaleString()} ₾</div>
                </div>
                <div style={{ padding: "0.5rem 0.85rem" }}>
                  <div style={{ fontSize: 9, color: "#888", marginBottom: 2 }}>სულ გადახდა</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{r.isC ? "—" : Math.round(r.total).toLocaleString() + " ₾"}</div>
                </div>
              </div>
            )}

            {!r.unavailable && (
              <div style={{ display: "flex", gap: 6, padding: "0.5rem 0.85rem", borderTop: "0.5px solid #f0f0f0" }}>
                <button onClick={() => setModal(r)} style={{ flex: 1, padding: "7px", borderRadius: 7, border: "0.5px solid #ddd", background: "transparent", fontSize: 11, cursor: "pointer", color: "#333" }}>დეტალები</button>
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "7px", borderRadius: 7, background: "#0f1923", color: "#fff", textAlign: "center" as const, textDecoration: "none", fontSize: 11 }}>კალკულატორი &#8599;</a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "1rem", borderTop: "0.5px solid #eee", background: "#fafafa", fontSize: 10, color: "#999", lineHeight: 1.6 }}>
        <strong style={{ color: "#666" }}>BankiGe &middot; {new Date().getFullYear()}</strong><br />
        &#9888; {DISCLAIMER[lang]}
      </div>

      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "16px 16px 0 0", width: "100%", maxWidth: 500, maxHeight: "85vh", overflow: "auto" }}>
            <div style={{ background: "#0f1923", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: "16px 16px 0 0" }}>
              <div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 500 }}>{modal.bank}</div>
                <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>{modal.product}</div>
              </div>
              <button onClick={() => setModal(null)} style={{ width: 30, height: 30, borderRadius: "50%", border: "0.5px solid rgba(255,255,255,.2)", background: "transparent", color: "#fff", fontSize: 18, cursor: "pointer" }}>&#215;</button>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" }}>
                {[
                  { l: "წლ. განაკვეთი", v: modal.rate.toFixed(1) + "%", c: "#10b981" },
                  { l: "თვიური", v: (modal.isD ? "+" : "") + Math.round(modal.monthly).toLocaleString() + " ₾", c: "#111" },
                  { l: "სულ გადახდა", v: modal.isC ? "—" : Math.round(modal.total).toLocaleString() + " ₾", c: "#111" },
                  { l: "გადაჭარბება", v: (modal.isC || modal.isD) ? "—" : Math.round(modal.total - amt).toLocaleString() + " ₾", c: "#f59e0b" },
                ].map((s) => (
                  <div key={s.l} style={{ background: "#f9f9f9", borderRadius: 8, padding: "0.65rem" }}>
                    <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase" as const, marginBottom: 3 }}>{s.l}</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "0.9rem" }}>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" as const, marginBottom: 6 }}>პირობები</div>
                {modal.conds.map((c, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#555", padding: "5px 0", borderBottom: "0.5px solid #f0f0f0", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />{c}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase" as const, marginBottom: 6 }}>საჭირო დოკუმენტები</div>
                {modal.docs.map((d, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#555", padding: "5px 0", borderBottom: "0.5px solid #f0f0f0", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, display: "inline-block" }} />{d}
                  </div>
                ))}
              </div>
              <a href={modal.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.8rem", borderRadius: 10, background: "#0f1923", color: "#fff", textAlign: "center" as const, textDecoration: "none", fontSize: 13 }}>
                ბანკის კალკულატორი &#8599;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
