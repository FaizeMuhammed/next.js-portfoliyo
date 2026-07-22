import React from 'react';
import Link from 'next/link';

export default function BlogRTAPipeline() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-8 max-w-[1920px] mx-auto">
        <Link href="/blogs" className="text-xl md:text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          ← BLOG
        </Link>
        <a href="/faize-resume.pdf" target="_blank"
          className="bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
          Resume
        </a>
      </nav>

      {/* HERO */}
      <header className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1920px] mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest inline-block">
            Data Engineering
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">April 2026</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">6 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Building a Highly Concurrent RTA Mailback Parsing Pipeline with FastAPI.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          CAMS and Karvy send mutual fund transaction data in emails that are
          inconsistent, poorly structured, and change format without warning.
          Here is how I replaced hours of manual data entry with a fully
          automated FastAPI pipeline that runs in under 5 minutes.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Stack', value: 'FastAPI / Python / PostgreSQL' },
            { label: 'Context', value: 'Live Fintech Production' },
          ].map((item, i) => (
            <div key={i}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{item.label}</p>
              <p className="font-bold text-lg md:text-xl">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* ARTICLE BODY */}
      <article className="px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto">

        {/* SECTION 1 */}
        <Section label="01 / What is an RTA Mailback?">
          <P>
            RTA stands for Registrar and Transfer Agent. In India's mutual fund industry,
            CAMS and Karvy are the two dominant RTAs — they process every SIP transaction,
            redemption, dividend payout, and brokerage calculation across all fund houses.
          </P>
          <P>
            When a transaction completes, the RTA sends a confirmation email to the
            registered MFD — the Mutual Fund Distributor. This email contains the
            transaction details: investor name, folio number, scheme code, amount,
            NAV, units allotted, and brokerage earned. In the industry this is
            called a "mailback."
          </P>
          <P>
            The problem: these emails are the primary data source for portfolio
            reconciliation on our MFD platform. Without parsing them correctly,
            the portfolio values investors see are wrong or stale.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / The Manual Process (Before)">
          <P>
            Before building this pipeline, the process was entirely manual.
            Someone received the RTA email, read the transaction details,
            and entered them into the system by hand.
          </P>
          <P>
            For a single MFD handling a few transactions per day, this works.
            For a platform serving multiple MFDs with hundreds of transactions
            daily — it breaks immediately.
          </P>

          <QuoteBlock>
            Manual entry means delayed portfolio updates, human transcription errors,
            and a process that doesn't scale past 2-3 MFDs without hiring people
            whose entire job is copying emails into a database.
          </QuoteBlock>

          <P>
            The goal was zero human intervention — email arrives, pipeline runs,
            database is updated, investor sees accurate portfolio within 5 minutes.
          </P>
        </Section>

        {/* SECTION 3 */}
        <Section label="03 / Why FastAPI and Not Node.js">
          <P>
            Our primary backend is Node.js. The natural choice would have been
            to build the pipeline there too. I chose Python and FastAPI instead
            — deliberately — for three reasons.
          </P>

          <NumberedList items={[
            {
              title: "Python's text processing ecosystem is superior",
              body: "The email parsing, regex extraction, and tabular data processing libraries in Python — email, re, pandas, BeautifulSoup — are far more mature than their Node.js equivalents. RTA emails contain HTML tables, inline styles, and inconsistent whitespace. Python handles this cleanly."
            },
            {
              title: "FastAPI is genuinely fast for I/O-heavy workloads",
              body: "FastAPI is built on Starlette and uses Python's async/await natively. For a pipeline that reads emails, runs parsing logic, and writes to a database — all I/O operations — it performs extremely well without blocking."
            },
            {
              title: "Isolation is a feature",
              body: "Keeping the parsing pipeline as a separate FastAPI microservice means a bug in the parser never affects the main Node.js API. The two services communicate over HTTP. If parsing fails, the main platform keeps running."
            }
          ]} />
        </Section>

        {/* SECTION 4 */}
        <Section label="04 / The Pipeline Architecture">
          <P>
            The pipeline has four stages: ingestion, detection, parsing, and validation + write.
          </P>

          <DarkBlock>
{`RTA Email (CAMS / Karvy)
         ↓
Email Server → Webhook Trigger → FastAPI /ingest endpoint
         ↓
Stage 1: Email body extraction (HTML + plain text)
         ↓
Stage 2: RTA Detection (CAMS or Karvy?)
         ↓
Stage 3: Format-specific parser runs
         ↓
Stage 4: Schema validation + deduplication check
         ↓
Write to PostgreSQL ledger ✅
         ↓
Flag failed records for manual review ⚠️`}
          </DarkBlock>

          <SubHeading>Stage 1 — Email Body Extraction</SubHeading>
          <P>
            RTA emails arrive in multipart MIME format — both HTML and plain text
            versions of the same content. The HTML version is more structured
            but harder to parse reliably due to inline styles. The plain text
            version is easier to parse but sometimes truncated.
          </P>
          <P>
            The extractor pulls both versions and passes them to the detector.
          </P>

          <DarkBlock>
{`import email
from bs4 import BeautifulSoup

def extract_email_body(raw_email: bytes) -> dict:
    msg = email.message_from_bytes(raw_email)
    html_body = ""
    text_body = ""

    for part in msg.walk():
        content_type = part.get_content_type()
        if content_type == "text/html":
            html_body = part.get_payload(decode=True).decode("utf-8", errors="ignore")
        elif content_type == "text/plain":
            text_body = part.get_payload(decode=True).decode("utf-8", errors="ignore")

    # Clean HTML — strip styles, scripts, preserve table structure
    soup = BeautifulSoup(html_body, "html.parser")
    for tag in soup(["style", "script", "head"]):
        tag.decompose()

    return {
        "html": str(soup),
        "text": text_body,
        "subject": msg.get("Subject", ""),
        "sender": msg.get("From", ""),
    }`}
          </DarkBlock>

          <SubHeading>Stage 2 — RTA Detection</SubHeading>
          <P>
            CAMS and Karvy use different email formats — different sender domains,
            different subject line patterns, different table structures.
            The detector reads the sender address and subject line to decide
            which parser to route the email to.
          </P>

          <DarkBlock>
{`def detect_rta(email_data: dict) -> str:
    sender = email_data["sender"].lower()
    subject = email_data["subject"].lower()

    if "camsonline.com" in sender or "cams" in subject:
        return "CAMS"
    elif "karvy.com" in sender or "kfintech.com" in sender or "karvy" in subject:
        return "KARVY"
    else:
        # Unknown sender — route to manual review queue
        return "UNKNOWN"`}
          </DarkBlock>

          <SubHeading>Stage 3 — Format-Specific Parsers</SubHeading>
          <P>
            Each RTA has its own parser. CAMS sends structured HTML tables
            with relatively consistent column headers. Karvy mixes plain text
            sections with HTML tables and uses different field names for
            the same data.
          </P>

          <DarkBlock>
{`def parse_cams(email_data: dict) -> list[dict]:
    soup = BeautifulSoup(email_data["html"], "html.parser")
    transactions = []

    # CAMS always uses a specific table class
    tables = soup.find_all("table", {"class": lambda c: c and "transaction" in c.lower()})

    for table in tables:
        rows = table.find_all("tr")
        headers = [th.get_text(strip=True).lower() for th in rows[0].find_all(["th", "td"])]

        for row in rows[1:]:
            cells = [td.get_text(strip=True) for td in row.find_all("td")]
            if len(cells) != len(headers):
                continue  # Skip malformed rows

            record = dict(zip(headers, cells))
            transactions.append({
                "folio":       record.get("folio no", "").strip(),
                "scheme_code": record.get("scheme code", "").strip(),
                "amount":      parse_amount(record.get("amount", "0")),
                "units":       parse_float(record.get("units", "0")),
                "nav":         parse_float(record.get("nav", "0")),
                "txn_ref":     record.get("transaction ref", "").strip(),
                "txn_date":    parse_date(record.get("date", "")),
                "rta":         "CAMS",
            })

    return transactions


def parse_amount(raw: str) -> float:
    # Handle formats: "1,23,456.78" "Rs.1234" "INR 1234.56"
    cleaned = re.sub(r"[^\\d.]", "", raw.replace(",", ""))
    try:
        return float(cleaned)
    except ValueError:
        return 0.0`}
          </DarkBlock>

          <SubHeading>Stage 4 — Validation and Deduplication</SubHeading>
          <P>
            Every parsed record goes through schema validation before touching
            the database. Amounts must be positive. Folio numbers must be
            non-empty. Scheme codes must match known codes in our master list.
            Dates must be parseable.
          </P>
          <P>
            Then deduplication — the transaction reference number is checked
            against existing records. RTA emails get forwarded and CC'd;
            the same transaction arriving twice must not be written twice.
          </P>

          <DarkBlock>
{`async def validate_and_write(transactions: list[dict], db: AsyncSession):
    written = 0
    skipped = 0
    flagged = []

    for txn in transactions:
        # Schema validation
        if not txn["folio"] or not txn["scheme_code"]:
            flagged.append({**txn, "reason": "missing_required_fields"})
            continue

        if txn["amount"] <= 0 or txn["amount"] > 10_000_000:
            flagged.append({**txn, "reason": "amount_out_of_range"})
            continue

        # Deduplication — check transaction reference
        existing = await db.execute(
            select(Transaction).where(
                Transaction.txn_ref == txn["txn_ref"],
                Transaction.rta == txn["rta"]
            )
        )
        if existing.scalar_one_or_none():
            skipped += 1
            continue

        # Safe to write
        db.add(Transaction(**txn))
        written += 1

    await db.commit()

    # Route flagged records to manual review — never silently drop
    if flagged:
        await send_to_review_queue(flagged)

    return {"written": written, "skipped": skipped, "flagged": len(flagged)}`}
          </DarkBlock>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / The Hardest Part: Format Changes">
          <P>
            CAMS and Karvy update their email formats without any notification.
            A column gets renamed. A table structure changes. A new section
            appears before the transaction table, shifting all the row indices.
          </P>
          <P>
            The naive approach — hardcoded column indices — breaks silently.
            The parser runs, extracts nothing, writes nothing, and the system
            shows no error. Portfolio data goes stale without anyone knowing.
          </P>
          <P>
            The solution: explicit zero-record detection. If the parser returns
            an empty list from a non-empty email, that is flagged as a
            parsing failure — not treated as "no transactions today."
          </P>

          <DarkBlock>
{`@app.post("/ingest")
async def ingest_email(request: EmailPayload, db: AsyncSession = Depends(get_db)):
    email_data = extract_email_body(request.raw_email)
    rta = detect_rta(email_data)

    if rta == "UNKNOWN":
        await flag_for_review(email_data, reason="unknown_rta")
        return {"status": "flagged", "reason": "unknown_rta"}

    parser = PARSERS[rta]
    transactions = parser(email_data)

    # Critical: empty result from non-empty email = format change
    email_has_content = len(email_data["text"].strip()) > 200
    if len(transactions) == 0 and email_has_content:
        await flag_for_review(email_data, reason="parser_returned_empty")
        return {"status": "flagged", "reason": "possible_format_change"}

    result = await validate_and_write(transactions, db)
    return {"status": "ok", **result}`}
          </DarkBlock>

          <P>
            This means every format change gets caught immediately and routed
            to a review queue — where someone can inspect the email, update
            the parser if needed, and reprocess. No silent data loss.
          </P>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / Results">
          <P>
            After deploying the pipeline:
          </P>

          <NumberedList items={[
            {
              title: 'Manual data entry time: ~0 hours per day',
              body: 'Previously took hours per MFD per day. Now fully automated for all MFDs on the platform simultaneously.'
            },
            {
              title: 'Email to DB time: under 5 minutes',
              body: 'From RTA email arriving to portfolio data updated in the database. Previously same-day or next-day depending on when someone manually processed it.'
            },
            {
              title: 'Zero silent failures',
              body: 'Every parsing anomaly is flagged and routed to review. The pipeline either succeeds loudly or fails loudly — never silently produces wrong data.'
            }
          ]} />
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / What I Would Do Differently">
          <P>
            If I built this again, I would add a format fingerprinting system —
            a hash of the email structure (table count, column count, column names)
            stored alongside each parsed record. When a format change happens,
            the fingerprint mismatch triggers an immediate alert before even
            attempting to parse — rather than detecting the problem
            after an empty parse result.
          </P>
          <P>
            I would also build a format versioning system — CAMS_v1, CAMS_v2 —
            so that when a format changes, the old parser keeps working for
            older emails in the queue while the new parser handles fresh ones.
            Currently a format update requires redeploying the parser.
          </P>
        </Section>

        {/* BOTTOM NAV */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← All Articles
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Article</p>
            <Link href="/blogs/meta-tech-provider" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              Scaling Faigen as Meta Tech Provider →
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}

// ── Reusable Structural Components ───────────────────────────────────────

function Section({ label, children }) {
  return (
    <section className="mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      <div className="lg:col-span-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter border-t-4 border-black pt-6 mb-8 lg:mb-0">
          {label}
        </h2>
      </div>
      <div className="lg:col-span-8 max-w-4xl space-y-8 lg:pt-6">
        {children}
      </div>
    </section>
  );
}

function P({ children }) {
  return <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">{children}</p>;
}

function SubHeading({ children }) {
  return (
    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-16 mb-8 border-b border-gray-200 pb-4 text-black">
      {children}
    </h3>
  );
}

function QuoteBlock({ children }) {
  return (
    <div className="border-l-4 border-black pl-6 lg:pl-10 py-6 my-12 bg-gray-50">
      <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed italic">{children}</p>
    </div>
  );
}

function DarkBlock({ children }) {
  return (
    <div className="bg-[#0a0a0a] text-gray-300 font-mono text-sm md:text-base leading-relaxed p-8 md:p-12 my-12 overflow-x-auto whitespace-pre shadow-xl border border-black">
      {children}
    </div>
  );
}

function NumberedList({ items }) {
  return (
    <div className="space-y-12 pt-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
          <span className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest shrink-0 mt-1">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 className="font-bold text-xl md:text-2xl mb-4 text-black">{item.title}</h4>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">{item.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}