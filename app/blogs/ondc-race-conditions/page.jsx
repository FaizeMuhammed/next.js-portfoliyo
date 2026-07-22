import React from 'react';
import Link from 'next/link';

export default function BlogONDCRaceConditions() {
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
            Fintech Architecture
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">DEC 2024</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">8 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Handling Race Conditions in ONDC Personal Loan Provisioning.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          When you are the sole engineer building a live financial connector on the ONDC
          Beckn Protocol — with less documentation — race conditions are not a
          theoretical problem. They are a production incident waiting to happen.
          Here is exactly how I solved them.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Role', value: 'Sole Engineer — ONDC Connector' },
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
        <Section label="01 / Background">
          <P>
            ONDC — the Open Network for Digital Commerce — is India's government-backed
            open protocol for digital commerce. The Beckn Protocol underneath it defines
            how Buyer Apps (BAPs) and Provider Apps (BPPs) communicate to execute
            transactions — including financial products like personal loans.
          </P>
          <P>
            I joined the fintech company as the sole developer when ONDC had barely
            launched its financial services vertical. There were no tutorials, no SDKs,
            no Stack Overflow answers. Everything had to be reverse-engineered from the
            raw Beckn Protocol specification PDF and live network payload logs.
          </P>
          <P>
            My task: build a complete BAP/BPP connector that could onboard credit
            providers and handle the full personal loan lifecycle — application,
            underwriting, approval, and disbursal — on the ONDC network.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / How ONDC Loan Flow Works">
          <P>
            A personal loan on ONDC flows through a series of state transitions, each
            triggered by a webhook from the Beckn Gateway. The sequence looks roughly like this:
          </P>

          <DarkBlock>
{`Customer applies
     ↓
BAP sends /search → BPP responds /on_search (loan offers)
     ↓
BAP sends /select → BPP responds /on_select (offer confirmation)
     ↓
BAP sends /init → BPP responds /on_init (KYC trigger)
     ↓
BAP sends /confirm → BPP responds /on_confirm (loan sanctioned)
     ↓
Gateway fires /on_update (disbursal status updates)
     ↓
Loan disbursed ✅`}
          </DarkBlock>

          <P>
            Each of these webhook calls arrives at your Node.js server from the ONDC
            Gateway. The problem is that the gateway does not guarantee exactly-once
            delivery. Under load — or during network hiccups — the same webhook fires
            multiple times within milliseconds.
          </P>
        </Section>

        {/* SECTION 3 — THE PROBLEM */}
        <Section label="03 / The Race Condition">
          <P>
            Consider the <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">/on_confirm</code> webhook — the one that tells your BPP
            that the loan has been sanctioned and disbursal should begin.
          </P>
          <P>
            Now imagine two identical <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">/on_confirm</code> payloads arrive at your
            server 40 milliseconds apart. Both carry the same transaction ID,
            same loan amount, same borrower. Your Node.js server receives both,
            spins up two async handlers simultaneously, and both race toward
            your PostgreSQL database to write the disbursal record.
          </P>

          <QuoteBlock>
            What happens next depends entirely on whether you built the right defences.
            Without them — both handlers write successfully. The loan disburses twice.
            The borrower gets double the money. The lender loses it.
          </QuoteBlock>

          <P>
            This is not a hypothetical. During load testing with the ONDC preprod
            environment, I saw the same webhook arrive 3 times in under 100ms.
            In a financial system, this is catastrophic.
          </P>
        </Section>

        {/* SECTION 4 — SOLUTION */}
        <Section label="04 / The Two-Layer Defence">
          <P>
            I solved this with two independent layers of protection. The key insight
            is that no single layer is sufficient — you need defence in depth because
            different failure modes require different solutions.
          </P>

          <SubHeading>Layer 1 — Idempotency at the API Gateway (Redis)</SubHeading>
          <P>
            Every incoming webhook payload is hashed into a unique idempotency key
            using the transaction ID, the Beckn action type, and a hash of the
            payload body. Before the handler runs any business logic, it checks
            Redis for this key.
          </P>

          <DarkBlock>
{`// Middleware — runs before any handler
const idempotencyCheck = async (req, res, next) => {
  const key = generateIdempotencyKey(
    req.body.context.transaction_id,
    req.body.context.action,
    req.body
  )

  const exists = await redis.get(key)

  if (exists) {
    // Already processed — return cached response
    return res.json(JSON.parse(exists))
  }

  // Not seen before — process and cache result
  req.idempotencyKey = key
  next()
}

const generateIdempotencyKey = (txnId, action, body) => {
  const hash = crypto
    .createHash('sha256')
    .update(\`\${txnId}:\${action}:\${JSON.stringify(body)}\`)
    .digest('hex')
  return \`ondc:idem:\${hash}\`
}`}
          </DarkBlock>

          <P>
            When the duplicate arrives 40ms after the first, Redis already has
            the idempotency key. The middleware returns the cached successful
            response in under 1ms — without touching PostgreSQL, without running
            business logic, without any side effects. From the gateway's perspective,
            both webhooks succeeded. Only one actually processed.
          </P>
          <P>
            The Redis key has a TTL of 24 hours — long enough to catch any delayed
            retries, short enough that the key store doesn't grow indefinitely.
          </P>

          <SubHeading>Layer 2 — Database Row Locks (PostgreSQL)</SubHeading>
          <P>
            Redis is fast but it is not a transaction system. Under extreme load,
            two handlers could theoretically both pass the Redis check before
            either has written the key. This is the TOCTOU problem — Time Of Check,
            Time Of Use.
          </P>
          <P>
            For any operation that mutates financial state — writing a disbursal,
            updating a loan status, recording a transaction — I wrap the entire
            operation in a PostgreSQL transaction with a row-level lock.
          </P>

          <DarkBlock>
{`const processDisbursal = async (txnId, amount, borrowerId) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Lock the loan record — second thread will block here
    const { rows } = await client.query(
      'SELECT * FROM loans WHERE transaction_id = $1 FOR UPDATE',
      [txnId]
    )

    const loan = rows[0]

    // Check current state — idempotent guard at DB level
    if (loan.status === 'disbursed') {
      await client.query('ROLLBACK')
      return { already_processed: true }
    }

    // Safe to disburse — no other thread can touch this row
    await client.query(
      'UPDATE loans SET status = $1, disbursed_at = NOW() WHERE id = $2',
      ['disbursed', loan.id]
    )

    await client.query(
      'INSERT INTO transactions (loan_id, amount, type) VALUES ($1, $2, $3)',
      [loan.id, amount, 'disbursal']
    )

    await client.query('COMMIT')
    return { success: true }

  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}`}
          </DarkBlock>

          <P>
            The <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">SELECT ... FOR UPDATE</code> acquires a row-level lock.
            If a second thread reaches this line while the first still holds
            the lock, it blocks — it cannot read the row, cannot write to it,
            cannot proceed. When the first thread commits and releases the lock,
            the second thread reads the now-updated status (<code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">disbursed</code>)
            and exits cleanly without writing a duplicate record.
          </P>
          <P>
            Even if Redis completely failed, this layer would catch the duplicate.
            Even if both threads passed Redis, this layer would catch the duplicate.
            Two independent mechanisms, both protecting the same critical section.
          </P>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / Why Both Layers Are Necessary">
          <P>
            A natural question: if PostgreSQL row locks are so reliable, why bother
            with Redis at all?
          </P>
          <P>
            Because database locks are expensive under load. Every <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">SELECT ... FOR UPDATE</code>
            holds a connection from the pool. If 50 duplicate webhooks arrive simultaneously,
            49 of them block on the database lock — holding 49 connections, adding latency,
            degrading throughput for every other query running simultaneously.
          </P>
          <P>
            Redis eliminates 99% of duplicates before they reach the database —
            in under 1ms, with no connection pool pressure. PostgreSQL handles
            the remaining 1% edge case where Redis was somehow bypassed.
            Both layers together give you speed and correctness.
          </P>

          <DarkBlock>
{`Duplicate webhook arrives
        ↓
Redis check (< 1ms)
        ↓
[Seen before?] ──YES──→ Return cached response. Done.
        ↓ NO
Business logic runs
        ↓
PostgreSQL transaction + FOR UPDATE lock
        ↓
[Status = disbursed?] ──YES──→ Rollback. Done.
        ↓ NO
Write disbursal. Commit. Cache in Redis.`}
          </DarkBlock>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / What Building on ONDC Taught Me">
          <P>
            ONDC's financial services vertical had almost no developer documentation
            when I built this. The Beckn Protocol spec is dense and abstract.
            Real payload structures only became clear by intercepting live traffic
            from the preprod gateway and logging everything.
          </P>
          <P>
            Three things I learned that apply beyond ONDC:
          </P>

          <NumberedList items={[
            {
              title: 'Read the protocol spec, not the tutorial',
              body: 'Tutorials are interpretations that can be wrong or outdated. The raw protocol specification is the ground truth. It is harder to read but it never lies.'
            },
            {
              title: 'Design for failure at every network boundary',
              body: 'Any external system — gateway, payment provider, RTA — can and will send you the same event multiple times. Idempotency is not optional in financial systems. It is the default.'
            },
            {
              title: 'Two independent defences beat one perfect defence',
              body: 'Redis could fail. PostgreSQL locks can be misconfigured. A single layer of protection has a single point of failure. Two layers, each solving the same problem differently, give you real safety.'
            }
          ]} />
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / Current Status">
          <P>
            The personal loan connector is live on the ONDC network.
            Purchase Finance and Working Capital connectors are built on
            the same idempotency infrastructure and going live next.
          </P>
          <P>
            The same two-layer pattern — Redis idempotency key + PostgreSQL row lock —
            is now the standard for every state-mutating operation across the entire
            fintech platform. What started as a solution to one race condition became
            the architectural pattern for the whole system.
          </P>
        </Section>

        {/* BOTTOM NAV */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← All Articles
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Article</p>
            <Link href="/blogs/rta-fastapi-pipelines" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              RTA Mailback Pipeline →
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