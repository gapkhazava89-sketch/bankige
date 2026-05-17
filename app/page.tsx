"use client";
import { useState, useEffect } from "react";

const BANKS = {
  loans: [
    { bank: "TBC ბანკი", short: "TBC", product: "სწრაფი სესხი", rate: 15.9, color: "#00a3e0", bg: "#e6f5fb", maxAmount: 100000, maxTerm: 84, url: "https://www.tbcbank.ge/web/ka/web/guest/consumer-loans", conds: ["მინ. ასაკი 21 წელი", "სამსახური ბოლო 3 თვე", "შემოსავალი 600 ლარი+"], docs: ["პირადობა", "სამსახურის ცნობა", "ამონაწერი 3 თვე"] },
    { bank: "ProCredit", short: "PRO", product: "სტანდარტული სესხი", rate: 16.5, color: "#e30613", bg: "#fce8e8", maxAmount: 50000, maxTerm: 60, url: "https://www.procreditbank.ge/ka/individuals/loans", conds: ["ასაკი 23-65", "მუდმივი შემოსავალი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "BOG", short: "BOG", product: "მომხმარებლის სესხი", rate: 17.5, color: "#e31e24", bg: "#fce8e8", maxAmount: 80000, maxTerm: 72, url: "https://bankofgeorgia.ge/ka/retail/loans/consumer-loan", conds: ["ასაკი 21-70", "დასაქმება 6+ თვე"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Express სესხი", rate: 19.0, color: "#2d2d6b", bg: "#ebebf5", maxAmount: 30000, maxTerm: 48, url: "https://www.basisbank.ge/ka/individuals/loans", conds: ["ასაკი 22-65", "სამსახური ან ბიზნესი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
    { bank: "Liberty Bank", short: "LIB", product: "პირადი სესხი", rate: 20.5, color: "#f37021", bg: "#fef3e8", maxAmount: 40000, maxTerm: 60, url: "https://libertybank.ge/ka/individuals/loans", conds: ["ასაკი 21+", "ნებისმიერი შემოსავალი"], docs: ["პირადობა", "პენსიის/სამსახურის ცნობა"] },
    { bank: "Credo Bank", short: "CRE", product: "მომხმარებლის სესხი", rate: 22.0, color: "#00529b", bg: "#e6eef8", maxAmount: 20000, maxTerm: 36, url: "https://credobank.ge/products/loans", conds: ["ასაკი 20-65", "მინ. შემოსავალი 400 ლარი"], docs: ["პირადობა", "შემოსავლის დამადასტურებელი"] },
  ],
  mortgage: [
    { bank: "TBC ბანკი", short: "TBC", product: "იპოთეკური სესხი", rate: 8.5, color: "#00a3e0", bg: "#e6f5fb", maxAmount: 1000000, maxTerm: 360, url: "https://www.tbcbank.ge/web/ka/web/guest/mortgage", conds: ["ქონების 80%-მდე", "სადაზღვევო სავალდებულო"], docs: ["პირადობა", "ქონების დოკუმენტები"] },
    { bank: "ProCredit", short: "PRO", product: "Green Home", rate: 8.9, color: "#e30613", bg: "#fce8e8", maxAmount: 500000, maxTerm: 240, url: "https://www.procreditbank.ge/ka/individuals/loans/mortgage", conds: ["ენერგოეფექტური ბინები"], docs: ["პირადობა", "ენერგოსერტიფიკატი"] },
    { bank: "BOG", short: "BOG", product: "სახლი", rate: 9.0, color: "#e31e24", bg: "#fce8e8", maxAmount: 800000, maxTerm: 360, url: "https://bankofgeorgia.ge/ka/retail/loans/mortgage", conds: ["პირველი შენატანი 20%"], docs: ["პირადობა", "ქონების ნასყიდობა"] },
    { bank: "Basis Bank", short: "BAS", product: "იპოთეკა", rate: 9.8, color: "#2d2d6b", bg: "#ebebf5", maxAmount: 300000, maxTerm: 300, url: "https://www.basisbank.ge/ka/individuals/loans/mortgage", conds: ["მინ. 25% შენატანი"], docs: ["პირადობა", "ქონების შეფასება"] },
    { bank: "Liberty Bank", short: "LIB", product: "სახლი Plus", rate: 10.2, color: "#f37021", bg: "#fef3e8", maxAmount: 250000, maxTerm: 240, url: "https://libertybank.ge/ka/individuals/loans/mortgage", conds: ["პირველი შენატანი 30%"], docs: ["პირადობა", "ქონების დოკუმენტები"] },
  ],
  deposits: [
    { bank: "Credo Bank", short: "CRE", product: "ვადიანი დეპოზიტი", rate: 12.0, color: "#00529b", bg: "#e6eef8", isD: true, minAmount: 500, maxTerm: 24, url: "https://credobank.ge/products/deposits", conds: ["მინ. 500 ლარი", "ვადამდე გამოტანა - პროცენტის დაკარგვა"], docs: ["პირადობა"] },
    { bank: "TBC ბანკი", short: "TBC", product: "TBC დეპოზიტი", rate: 11.5, color: "#00a3e0", bg: "#e6f5fb", isD: true, minAmount: 100, maxTerm: 36, url: "https://www.tbcbank.ge/web/ka/web/guest/deposits", conds: ["მინ. 100 ლარი", "ონლაინ გახსნა"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "ლარი Plus", rate: 11.0, color: "#f37021", bg: "#fef3e8", isD: true, minAmount: 1000, maxTerm: 24, url: "https://libertybank.ge/ka/individuals/deposits", conds: ["მინ. 1000 ლარი"], docs: ["პირადობა"] },
    { bank: "BOG", short: "BOG", product: "ფიქსირებული", rate: 10.5, color: "#e31e24", bg: "#fce8e8", isD: true, minAmount: 200, maxTerm: 12, url: "https://bankofgeorgia.ge/ka/retail/deposits", conds: ["მინ. 200 ლარი"], docs: ["პირადობა"] },
    { bank: "Basis Bank", short: "BAS", product: "სტანდარტული", rate: 10.0, color: "#2d2d6b", bg: "#ebebf5", isD: true, minAmount: 300, maxTerm: 24, url: "https://www.basisbank.ge/ka/individuals/deposits", conds: ["მინ. 300 ლარი"], docs: ["პირადობა"] },
  ],
  cards: [
    { bank: "BOG", short: "BOG", product: "Visa Platinum", rate: 22.5, color: "#e31e24", bg: "#fce8e8", isC: true, url: "https://bankofgeorgia.ge/ka/retail/cards/credit-cards", conds: ["Cashback 2%", "VIP lounge"], docs: ["პირადობა", "შემოსავალი 1500 ლარი+"] },
    { bank: "TBC ბანკი", short: "TBC", product: "Mastercard Gold", rate: 24.0, color: "#00a3e0", bg: "#e6f5fb", isC: true, url: "https://www.tbcbank.ge/web/ka/web/guest/credit-cards", conds: ["Cashback 1.5%", "Apple/Google Pay"], docs: ["პირადობა", "სამსახურის ცნობა"] },
    { bank: "Basis Bank", short: "BAS", product: "Visa Classic", rate: 26.0, color: "#2d2d6b", bg: "#ebebf5", isC: true, url: "https://www.basisbank.ge/ka/individuals/cards", conds: ["წლიური 10 ლარი"], docs: ["პირადობა"] },
    { bank: "Liberty Bank", short: "LIB", product: "Mastercard Classic", rate: 28.0, color: "#f37021", bg: "#fef3e8", isC: true, url: "https://libertybank.ge/ka/individuals/cards", conds: ["ემისია უფასო"], docs: ["პირადობა"] },
    { bank: "Credo Bank", short: "CRE", product: "Visa Standard", rate: 30.0, color: "#00529b", bg: "#e6eef8", isC: true, url: "https://credobank.ge/products/cards", conds: ["ლიმიტი 1000 ლარი"], docs: ["პირადობა"] },
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
  bank: string; short: string; product: string; rate: number; color: string; bg: string;
  url: string; conds: string[]; docs: string[];
  isD?: boolean; isC?: boolean; minAmount?: number; maxAmount?: number; maxTerm?: number;
  monthly: number; total: number; unavailable: string;
}

type TabKey = keyof typeof BANKS;
type LangKey = keyof typeof DISCLAIMER;

const F = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function Home() {
  const [curTab, setCurTab] = useState<TabKey>("loans");
  const [amount, setAmount] = useState("10000");
  const [term, setTerm] = useState("24");
  const [lang, setLang] = useState<LangKey>("ka");
  const [sortBy, setSortBy] = useState("rate");
  const [filterBank, setFilterBank] = useState("all");
  const [modal, setModal] = useState<BankRow | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      const rr = r as BankRow & { isD?: boolean; isC?: boolean; minAmount?: number; maxAmount?: number; maxTerm?: number };
      let unavailable = "";
      if (!rr.isD && !rr.isC) {
        if (rr.maxAmount && amt > rr.maxAmount) unavailable = "მაქს. " + rr.maxAmount.toLocaleString() + " ₾";
        else if (rr.maxTerm && trm > rr.maxTerm) unavailable = "მაქს. " + rr.maxTerm + " თვე";
      }
      if (rr.isD && rr.minAmount && amt < rr.minAmount) unavailable = "მინ. " + rr.minAmount.toLocaleString() + " ₾";
      if (rr.isD && rr.maxTerm && trm > rr.maxTerm) unavailable = "მაქს. " + rr.maxTerm + " თვე";
      const monthly = rr.isD ? amt * (r.rate / 100 / 12) : rr.isC ? 0 : mp(amt, r.rate, trm);
      const total = rr.isD ? monthly * trm : rr.isC ? 0 : monthly * trm;
      return { ...rr, monthly, total, unavailable };
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

  const rateColor = (rate: number, unavail: string) => {
    if (unavail) return "#ccc";
    return rate < 18 ? "#10b981" : rate < 24 ? "#f59e0b" : "#ef4444";
  };

  return (
    <div style={{ fontFamily: F, background: "#f8f9fa", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: "#0f1923", padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#e94560", borderRadius: 7, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, padding: 6 }}>
            <span style={{ background: "#fff", borderRadius: 2 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.5 }} />
            <span style={{ background: "#fff", borderRadius: 2, opacity: 0.25 }} />
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>BankiGe</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase" as const }}>ბანკების შედარება</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {(["ka", "en", "ru"] as LangKey[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, border: "1px solid", borderColor: lang === l ? "#e94560" : "rgba(255,255,255,.2)", background: lang === l ? "#e94560" : "transparent", color: "#fff", cursor: "pointer", fontFamily: F }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* DISCLAIMER */}
      <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "0.6rem 1.5rem", fontSize: 12, color: "#92400e" }}>
        &#9888; {DISCLAIMER[lang]}
      </div>

      {/* TABS */}
      <div style={{ background: "#1a2535", display: "flex", padding: "0 1rem", overflowX: "auto" as const }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setCurTab(t.key); setFilterBank("all"); }} style={{ padding: "0.75rem 1.1rem", fontSize: 13, color: curTab === t.key ? "#fff" : "rgba(255,255,255,.45)", background: "transparent", border: "none", borderBottom: curTab === t.key ? "2px solid #e94560" : "2px solid transparent", cursor: "pointer", fontFamily: F, whiteSpace: "nowrap" as const, fontWeight: curTab === t.key ? 600 : 400 }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0.75rem" : "1.25rem 1.5rem" }}>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" as const, alignItems: "center", background: "#fff", borderRadius: 10, padding: "0.75rem 1rem", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
          <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>ბანკი:</span>
          {["all", ...banks].map((b) => (
            <button key={b} onClick={() => setFilterBank(b)} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, border: "1px solid", borderColor: filterBank === b ? "#0f1923" : "#e5e7eb", background: filterBank === b ? "#0f1923" : "#fff", color: filterBank === b ? "#fff" : "#555", cursor: "pointer", fontFamily: F, fontWeight: 500 }}>{b === "all" ? "ყველა" : b}</button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#888" }}>სორტი:</span>
            <select onChange={(e) => setSortBy(e.target.value)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e5e7eb", fontFamily: F }}>
              <option value="rate">განაკვეთი</option>
              <option value="monthly">თვიური</option>
              <option value="total">სულ</option>
            </select>
          </div>
        </div>

        {/* CALC + SUMMARY */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: "0.9rem 1.1rem", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.8, marginBottom: 6 }}>თანხა (₾)</div>
            <input type="number" value={amount} min={1} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", fontSize: 24, fontWeight: 600, border: "none", outline: "none", fontFamily: F, background: "transparent", color: "#111" }} placeholder="10000" />
          </div>
          <div style={{ background: "#fff", borderRadius: 10, padding: "0.9rem 1.1rem", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 500, textTransform: "uppercase" as const, letterSpacing: 0.8, marginBottom: 6 }}>ვადა (თვე)</div>
            <input type="number" value={term} min={1} onChange={(e) => setTerm(e.target.value)} style={{ width: "100%", fontSize: 24, fontWeight: 600, border: "none", outline: "none", fontFamily: F, background: "transparent", color: "#111" }} placeholder="24" />
          </div>
          {best && (
            <div style={{ background: "#0f1923", borderRadius: 10, padding: "0.9rem 1.1rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { l: "საუკეთ. განაკვ.", v: best.rate.toFixed(1) + "%", c: "#10b981" },
                { l: "მინ. თვიური", v: (best.isD ? "+" : "") + Math.round(best.monthly).toLocaleString() + "₾", c: "#fff" },
                { l: "დაზოგვა", v: "+" + Math.round(Math.abs(saving)).toLocaleString() + "₾", c: "#10b981" }
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", marginBottom: 3, textTransform: "uppercase" as const }}>{s.l}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TABLE - Desktop */}
        {!isMobile && (
          <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "#0f1923" }}>
                  {["ბანკი", "წლ. განაკვეთი", "თვიური გადასახდელი", "სულ გადახდა", ""].map((h) => (
                    <th key={h} style={{ padding: "0.85rem 1.25rem", textAlign: "left" as const, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.55)", textTransform: "uppercase" as const, letterSpacing: 0.8 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #f3f4f6", background: i === 0 && !r.unavailable ? "rgba(16,185,129,.04)" : "#fff" }}>
                    <td style={{ padding: "1rem 1.25rem", borderLeft: i === 0 && !r.unavailable ? "3px solid #10b981" : "3px solid transparent" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, opacity: r.unavailable ? 0.4 : 1 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 8, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: r.color, border: "1px solid #e5e7eb", flexShrink: 0 }}>{r.short}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.bank}</div>
                          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{r.product}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: rateColor(r.rate, r.unavailable) }}>{r.rate.toFixed(1)}%</span>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      {r.unavailable
                        ? <span style={{ fontSize: 12, color: "#ef4444", background: "#fef2f2", padding: "3px 8px", borderRadius: 6 }}>&#10060; {r.unavailable}</span>
                        : <span style={{ fontSize: 16, fontWeight: 600 }}>{(r.isD ? "+" : "") + Math.round(r.monthly).toLocaleString()} ₾</span>}
                    </td>
                    <td style={{ padding: "1rem 1.25rem", fontSize: 14, color: "#374151" }}>
                      {!r.isC && !r.unavailable ? Math.round(r.total).toLocaleString() + " ₾" : "—"}
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {!r.unavailable && (
                          <button onClick={() => setModal(r)} style={{ fontSize: 12, padding: "7px 14px", borderRadius: 7, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontFamily: F, fontWeight: 500 }}>დეტალები</button>
                        )}
                        <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, padding: "7px 14px", borderRadius: 7, background: "#0f1923", color: "#fff", textDecoration: "none", fontFamily: F, fontWeight: 500, whiteSpace: "nowrap" as const }}>საიტი &#8599;</a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDS - Mobile */}
        {isMobile && (
          <div>
            {rows.map((r, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e5e7eb", borderLeft: i === 0 && !r.unavailable ? "3px solid #10b981" : "1px solid #e5e7eb", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.85rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: r.color, border: "1px solid #e5e7eb", opacity: r.unavailable ? 0.4 : 1 }}>{r.short}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: r.unavailable ? "#9ca3af" : "#111" }}>{r.bank}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>{r.product}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: rateColor(r.rate, r.unavailable) }}>{r.rate.toFixed(1)}%</div>
                    <div style={{ fontSize: 10, color: "#9ca3af" }}>წლ. განაკვეთი</div>
                  </div>
                </div>
                {r.unavailable ? (
                  <div style={{ padding: "0.6rem 1rem", fontSize: 12, color: "#ef4444", background: "#fef2f2" }}>&#10060; ვერ გთავაზობს: {r.unavailable}</div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{ padding: "0.6rem 1rem", borderRight: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>თვიური</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{(r.isD ? "+" : "") + Math.round(r.monthly).toLocaleString()} ₾</div>
                    </div>
                    <div style={{ padding: "0.6rem 1rem" }}>
                      <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>სულ</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{r.isC ? "—" : Math.round(r.total).toLocaleString() + " ₾"}</div>
                    </div>
                  </div>
                )}
                {!r.unavailable && (
                  <div style={{ display: "flex", gap: 8, padding: "0.6rem 1rem", borderTop: "1px solid #f3f4f6" }}>
                    <button onClick={() => setModal(r)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 500 }}>დეტალები</button>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: "8px", borderRadius: 8, background: "#0f1923", color: "#fff", textAlign: "center" as const, textDecoration: "none", fontSize: 12, fontFamily: F, fontWeight: 500 }}>საიტი &#8599;</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: 20, padding: "1rem", background: "#fff", borderRadius: 10, fontSize: 11, color: "#9ca3af", lineHeight: 1.6, boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
          <strong style={{ color: "#6b7280" }}>BankiGe &middot; {new Date().getFullYear()}</strong> &mdash; {DISCLAIMER[lang]}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 100, padding: isMobile ? 0 : "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: isMobile ? "16px 16px 0 0" : 16, width: "100%", maxWidth: 460, maxHeight: "90vh", overflow: "auto" }}>
            <div style={{ background: "#0f1923", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: isMobile ? "16px 16px 0 0" : "16px 16px 0 0" }}>
              <div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{modal.bank}</div>
                <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>{modal.product}</div>
              </div>
              <button onClick={() => setModal(null)} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,.2)", background: "transparent", color: "#fff", fontSize: 18, cursor: "pointer" }}>&#215;</button>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1rem" }}>
                {[
                  { l: "წლ. განაკვეთი", v: modal.rate.toFixed(1) + "%", c: "#10b981" },
                  { l: "თვიური", v: (modal.isD ? "+" : "") + Math.round(modal.monthly).toLocaleString() + " ₾", c: "#111" },
                  { l: "სულ გადახდა", v: modal.isC ? "—" : Math.round(modal.total).toLocaleString() + " ₾", c: "#111" },
                  { l: "გადაჭარბება", v: (modal.isC || modal.isD) ? "—" : Math.round(modal.total - amt).toLocaleString() + " ₾", c: "#f59e0b" },
                ].map((s) => (
                  <div key={s.l} style={{ background: "#f9fafb", borderRadius: 8, padding: "0.75rem" }}>
                    <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 500, textTransform: "uppercase" as const, marginBottom: 4 }}>{s.l}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "0.9rem" }}>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" as const, marginBottom: 8 }}>პირობები</div>
                {modal.conds.map((c, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#374151", padding: "6px 0", borderBottom: "1px solid #f3f4f6", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />{c}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase" as const, marginBottom: 8 }}>საჭირო დოკუმენტები</div>
                {modal.docs.map((d, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#374151", padding: "6px 0", borderBottom: "1px solid #f3f4f6", display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, display: "inline-block" }} />{d}
                  </div>
                ))}
              </div>
              <a href={modal.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "0.85rem", borderRadius: 10, background: "#0f1923", color: "#fff", textAlign: "center" as const, textDecoration: "none", fontSize: 14, fontFamily: F, fontWeight: 600 }}>
                ბანკის საიტი &#8599;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
