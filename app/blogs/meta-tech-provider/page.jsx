import React from 'react';
import Link from 'next/link';

export default function BlogMetaTechProvider() {
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
            SaaS Scaling
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">February 2026</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">10 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Lessons Learned Scaling a Multi-Tenant AI Product as a Meta Tech Provider.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          Building Faigen — a WhatsApp and Instagram AI automation SaaS for Kerala
          businesses — as a solo founder and engineer. What I got wrong about
          multi-tenancy, AI prompt engineering, and cost control. And how I fixed it.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Product', value: 'Faigen AI — faigen.in' },
            { label: 'Stack', value: 'Node.js / Next.js / MongoDB' },
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
        <Section label="01 / What Faigen Is">
          <P>
            Faigen is a multi-tenant SaaS that deploys AI agents on WhatsApp and
            Instagram for small and medium businesses in Kerala. A business signs up,
            configures their AI agent — product catalog, tone, FAQs, language — and
            their customers start getting instant AI replies on WhatsApp within 48 hours.
          </P>
          <P>
            The AI handles order taking, appointment booking, product queries, and
            broadcast campaigns. It speaks Malayalam, Manglish, and English —
            auto-detecting what the customer writes in and replying in the same language.
          </P>
          <P>
            I built the entire thing solo — backend, frontend, admin console,
            WhatsApp webhook infrastructure, AI integration, and the landing page.
            Getting registered as an official Meta Tech Provider was the first major milestone.
            Keeping it running reliably for multiple businesses simultaneously was the hard part.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / Becoming a Meta Tech Provider">
          <P>
            To send messages via the WhatsApp Business Cloud API at scale —
            not just to verified test numbers — you need to be registered as
            a Tech Provider (ISV) on Meta's platform or work through a BSP
            (Business Solution Provider).
          </P>
          <P>
            The Tech Provider route means you build directly on the Cloud API,
            manage your own WABA (WhatsApp Business Account), and are responsible
            for your own compliance. The process involves:
          </P>

          <NumberedList items={[
            {
              title: 'Business verification on Meta Business Manager',
              body: 'Your business entity needs to be verified — business documents, registered address, official email domain. For Faigen, this meant verifying Bancwise Technologies LLP as the entity behind the platform.'
            },
            {
              title: 'App review for the WhatsApp Business API',
              body: 'You submit your app for Meta review, demonstrating a legitimate business use case. The review checks that you are not using the API for spam and that your platform has proper privacy policies and terms.'
            },
            {
              title: 'Display name approval per phone number',
              body: 'Every WhatsApp number you add needs a display name approved by Meta. The name must accurately represent your business. "Faigen" was approved within hours. Generic or misleading names get rejected.'
            },
            {
              title: 'Webhook subscription per WABA',
              body: 'This is the part that caught me. When you add a new WhatsApp number to a different WABA, you need to re-subscribe your webhook to that WABA separately — it does not inherit the subscription from your app. Messages arrive at Meta but never reach your server until you run the subscribed_apps API call.'
            }
          ]} />

          <DarkBlock>
{`# Subscribe your app's webhook to a new WABA
curl -X POST \\
  "https://graph.facebook.com/v18.0/{WABA_ID}/subscribed_apps" \\
  -H "Authorization: Bearer {PERMANENT_TOKEN}"

# Response
{"success": true}

# Verify subscription
curl "https://graph.facebook.com/v18.0/{WABA_ID}/subscribed_apps" \\
  -H "Authorization: Bearer {PERMANENT_TOKEN}"`}
          </DarkBlock>

          <P>
            I learned the WABA webhook subscription lesson the hard way —
            after migrating to a new phone number on a different WABA and
            spending an hour debugging why messages were arriving at Meta
            but producing zero logs on my server.
          </P>
        </Section>

        {/* SECTION 3 */}
        <Section label="03 / The Multi-Tenancy Mistake I Made">
          <P>
            The first version of Faigen had a fundamental multi-tenancy design flaw.
            I stored the AI system prompt and business configuration in environment
            variables and a single config object — assuming I would only ever run
            one AI agent at a time.
          </P>

          <QuoteBlock>
            Single-tenant thinking in a multi-tenant product means the day you add
            your second client, you have to rewrite the most critical part of your system.
          </QuoteBlock>

          <P>
            The correct design — which I moved to before onboarding any clients —
            stores all business configuration per company in MongoDB, scoped by
            a <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">companyId</code> on every document. The webhook handler looks
            up the company from the incoming phone number ID, loads their config,
            and runs their AI agent in isolation from every other company on the platform.
          </P>

          <DarkBlock>
{`// WRONG — single tenant thinking
const systemPrompt = process.env.SYSTEM_PROMPT
const aiModel = process.env.AI_MODEL

// RIGHT — multi-tenant from day one
const processMessage = async (message, value) => {
  const phoneNumberId = value.metadata.phone_number_id

  // Every company has their own config in MongoDB
  const company = await Company.findOne({
    whatsappPhoneNumberId: phoneNumberId,
    active: true
  }).select('+aiApiKey')

  if (!company) {
    console.log('No company for phoneNumberId:', phoneNumberId)
    return
  }

  // Everything scoped to this company
  const systemPrompt = company.systemPrompt
  const aiModel      = company.aiModel
  const aiProvider   = company.aiProvider
  const features     = company.features

  // AI runs with this company's config only
  const response = await getAIResponse(company, conversation.messages, customerMessage)
}`}
          </DarkBlock>

          <P>
            This pattern — company lookup from the incoming phone number ID,
            then everything scoped to that company — is what makes the platform
            genuinely multi-tenant. Adding a new client means creating a new
            Company document in MongoDB. Zero code changes.
          </P>
        </Section>

        {/* SECTION 4 */}
        <Section label="04 / The Message Queue Problem">
          <P>
            WhatsApp sends webhook events asynchronously. If a customer sends
            three messages quickly — "Hi", "I want to order", "2 coir mats" —
            all three webhooks arrive at the server within milliseconds.
          </P>
          <P>
            Without a queue, three concurrent AI requests fire simultaneously.
            The AI sees each message in isolation, without the context of the
            previous message. The third message ("2 coir mats") arrives with
            no context that the customer already said they want to order.
            The AI responds with a greeting — completely wrong.
          </P>
          <P>
            The solution is a per-phone message queue. Messages from the same
            customer are processed sequentially — each one waits for the previous
            to complete before the AI runs.
          </P>

          <DarkBlock>
{`// Per-phone queue — messages process one at a time per customer
class MessageQueue {
  constructor() {
    this.queues = new Map() // phoneNumberId -> queue array
    this.processing = new Map()
  }

  async add(phoneNumberId, handler) {
    if (!this.queues.has(phoneNumberId)) {
      this.queues.set(phoneNumberId, [])
    }

    return new Promise((resolve, reject) => {
      this.queues.get(phoneNumberId).push({ handler, resolve, reject })
      this.process(phoneNumberId)
    })
  }

  async process(phoneNumberId) {
    if (this.processing.get(phoneNumberId)) return
    const queue = this.queues.get(phoneNumberId)
    if (!queue || queue.length === 0) return

    this.processing.set(phoneNumberId, true)

    while (queue.length > 0) {
      const { handler, resolve, reject } = queue.shift()
      try {
        resolve(await handler())
      } catch (err) {
        reject(err)
      }
    }

    this.processing.set(phoneNumberId, false)
  }
}

const messageQueue = new MessageQueue()

// In the webhook handler
await messageQueue.add(phoneNumberId, async () => {
  await processMessage(message, value)
})`}
          </DarkBlock>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / Prompt Engineering is Real Engineering">
          <P>
            The hardest part of building an AI agent that serves real businesses
            is not the infrastructure — it is getting the AI to behave consistently
            across thousands of conversations with customers who write in unpredictable ways.
          </P>

          <SubHeading>The Menu Loop Problem</SubHeading>
          <P>
            Early versions of the system prompt produced a consistent bug: the AI
            would show the main menu (Our Products / Place Order / Contact Us) on
            every single message — even mid-conversation. The customer would ask
            "how much is the coir mat?" and get a menu instead of an answer.
          </P>
          <P>
            The fix was explicit instruction in the system prompt:
          </P>

          <DarkBlock>
{`// BAD — AI shows menu repeatedly
"When customers message, show them the menu options."

// GOOD — explicit single-show rule
"IMPORTANT: Show the main menu buttons ONLY on the very first 
greeting message. After that, continue the conversation naturally. 
Do NOT show the menu again mid-conversation."`}
          </DarkBlock>

          <SubHeading>Getting Malayalam to Work Without a Malayalam Model</SubHeading>
          <P>
            Gemini and Groq do not have dedicated Malayalam language models.
            But they understand Malayalam reasonably well because it appears
            in their training data. The trick is making the language detection
            and response explicit in the prompt rather than hoping the model
            figures it out.
          </P>

          <DarkBlock>
{`LANGUAGE RULES — FOLLOW STRICTLY:
- Detect what language the customer is writing in
- Malayalam script → reply in Malayalam script
- Manglish (Malayalam in English letters) → reply in Manglish  
- English → reply in English
- Never switch languages mid-conversation unless the customer does
- Auto-detect on every message — do not assume from previous messages`}
          </DarkBlock>

          <SubHeading>Keeping the AI On-Topic</SubHeading>
          <P>
            Without explicit restrictions, the AI would answer anything — geography
            questions, recipe requests, general knowledge. For a business AI agent
            this is wrong. The agent should only discuss the business.
          </P>

          <DarkBlock>
{`STRICT RULES:
- ONLY discuss topics related to [company name]'s products and services
- If someone asks something unrelated, say: "I can only help with 
  questions about [company name] 😊"
- Do not provide general knowledge, opinions, or off-topic answers
- Do not pretend to be a general AI assistant`}
          </DarkBlock>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / Cost Control at Scale">
          <P>
            Every AI response costs money. Gemini Flash is cheap — roughly ₹0.02-0.05
            per response — but at scale with multiple businesses and active customers,
            it adds up. More importantly, a single abusive user could generate
            hundreds of messages per day and run up significant costs.
          </P>

          <SubHeading>24-Hour Message Limit</SubHeading>
          <P>
            Every conversation has a maximum number of customer messages per 24-hour
            rolling window. The limit is configurable per company — defaulting to 15
            for the Faigen demo and higher for paid clients.
          </P>
          <P>
            When the limit is hit, instead of going silent (which confuses the customer)
            or throwing an error, the system sends a single warm handoff message with
            contact details — converting the limit hit into a sales touchpoint.
          </P>

          <DarkBlock>
{`const countCustomerMessagesLast24h = (conversation) => {
  const windowStart = Date.now() - 24 * 60 * 60 * 1000
  return conversation.messages.filter(m =>
    m.role === 'user' &&
    new Date(m.timestamp).getTime() >= windowStart
  ).length
}

// In the message handler
const limit = company.aiContext?.maxMessagesPer24h || 40
const msgCount = countCustomerMessagesLast24h(conversation) + 1

if (msgCount > limit) {
  // Send handoff message ONCE every 24 hours — not on every message
  const THROTTLE_MS = 24 * 60 * 60 * 1000
  const notifiedRecently = conversation.lastLimitNoticeAt &&
    (Date.now() - new Date(conversation.lastLimitNoticeAt).getTime() < THROTTLE_MS)

  if (!notifiedRecently) {
    await sendTextMessage(phoneNumberId, customerPhone, company.aiContext.limitReachedMessage)
    conversation.lastLimitNoticeAt = new Date()
  }
  // Save message but skip AI — user already notified
  return
}`}
          </DarkBlock>

          <SubHeading>Broadcast Credit System</SubHeading>
          <P>
            Broadcast campaigns — sending WhatsApp messages to hundreds of customers
            at once — cost real money. Meta charges per message: ₹0.15 for
            Authentication templates, ₹0.88 for Marketing templates.
          </P>
          <P>
            Every company has a <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono">broadcastCredits</code> balance in MongoDB.
            Credits are deducted before sending — if the balance is insufficient
            for the full campaign, the broadcast is rejected with a clear error
            rather than sending partial messages and leaving the company confused.
          </P>

          <DarkBlock>
{`// Check credits before starting broadcast
const totalCost = cleanPhones.length * costPerMsg

if ((company.broadcastCredits || 0) < totalCost) {
  return res.status(400).json({
    success: false,
    error: \`Insufficient credits. Need ₹\${totalCost}, available ₹\${company.broadcastCredits.toFixed(2)}\`
  })
}

// Deduct on success
await Company.findByIdAndUpdate(company._id, {
  $inc: { broadcastCredits: -costPerMsg }
})`}
          </DarkBlock>
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / WhatsApp Template Approval">
          <P>
            Every outbound WhatsApp message that is not a reply within a 24-hour
            customer-initiated window must use a pre-approved message template.
            Templates are categorised by Meta into three types — Authentication,
            Utility, and Marketing — each with different pricing and approval criteria.
          </P>
          <P>
            Authentication templates (for OTPs) are approved fastest — usually
            within minutes. The format is fixed by Meta:
          </P>

          <DarkBlock>
{`{your_code} is your verification code.
For your security, do not share this code.
[Copy Code button]`}
          </DarkBlock>

          <P>
            Marketing templates get the most scrutiny. They cannot contain
            misleading claims, cannot promise guaranteed returns, and must
            clearly identify the business sending them. I have had templates
            rejected for being too generic ("Hello, check out our offers")
            and approved for being specific ("Your Onam offer from [Business]:
            20% off all products this week").
          </P>
          <P>
            The practical lesson: be specific in template content, use the
            business name prominently, and avoid superlatives like "best"
            or "guaranteed." Approval times range from minutes to 24 hours.
          </P>
        </Section>

        {/* SECTION 8 */}
        <Section label="08 / What Solo Founder Engineering Taught Me">
          <NumberedList items={[
            {
              title: 'Multi-tenancy must be the starting architecture, not a refactor',
              body: 'Every model, every query, every API route needs companyId scoping from day one. Adding multi-tenancy after the fact means touching every file in the codebase. I caught this before onboarding clients — barely.'
            },
            {
              title: 'Prompt engineering deserves the same rigour as system design',
              body: 'I spent as much time iterating on the system prompt as I did on the database schema. The AI\'s behaviour in production depends on instruction precision, not just model capability. Vague prompts produce inconsistent behaviour at scale.'
            },
            {
              title: 'Cost control mechanisms are product features',
              body: 'The 24-hour message limit with a warm handoff message is not just a cost-control measure — it is a conversion mechanism. Turning a limit hit into a human touchpoint is product thinking applied to an engineering constraint.'
            },
            {
              title: 'Build the observability before you need it',
              body: 'Every message in and out is logged with company, direction, billing category, and timestamp. When something goes wrong at 2am for a client, the logs tell you exactly what happened. Structured logging is not optional in a production AI system.'
            }
          ]} />
        </Section>

        {/* BOTTOM NAV */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← All Articles
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Article</p>
            <Link href="/blogs/fintech-dark-mode-ui" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              Fintech Dark Mode UI →
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