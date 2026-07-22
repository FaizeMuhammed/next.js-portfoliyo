import React from 'react';
import Link from 'next/link';

export default function BlogNextjsMultiTenancy() {
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
            Backend Engineering
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">November 2025</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">7 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Custom MongoDB Multi-Tenancy in Next.js for B2B Applications.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          Why third-party multi-tenancy libraries were the wrong choice for Faigen,
          and how I built companyId-scoped data isolation from scratch —
          in a way that scales to hundreds of tenants without touching a single
          line of business logic.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Product', value: 'Faigen AI — Multi-tenant SaaS' },
            { label: 'Stack', value: 'Node.js / Next.js / MongoDB / Mongoose' },
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
        <Section label="01 / What Multi-Tenancy Actually Means">
          <P>
            Multi-tenancy means one running instance of your application serves
            multiple customers — tenants — with their data completely isolated
            from each other. Tenant A cannot see Tenant B's data, cannot
            affect Tenant B's performance, and cannot access Tenant B's configuration.
          </P>
          <P>
            For Faigen, tenants are businesses. A restaurant using Faigen and
            a coir mat shop using Faigen are two separate tenants on the same
            Node.js process, the same MongoDB instance, and the same Vercel
            deployment. They share infrastructure but are completely isolated
            at the data layer.
          </P>
          <P>
            There are three common approaches to multi-tenancy at the database layer.
            Understanding the tradeoffs before choosing one saves you from a painful
            migration later.
          </P>

          <DarkBlock>
{`Approach 1 — Separate database per tenant
  ✅ Maximum isolation
  ✅ Easy to offboard a tenant (drop database)
  ❌ Expensive at scale — connection pools multiply
  ❌ Schema migrations run N times (once per tenant)
  ❌ Cross-tenant analytics is painful

Approach 2 — Separate collection per tenant
  ✅ Good isolation
  ❌ MongoDB collection count grows unbounded
  ❌ Indexes must be created per collection
  ❌ No benefit over approach 1 at scale

Approach 3 — Shared collections, companyId field (chosen)
  ✅ Single schema to maintain
  ✅ Single connection pool
  ✅ Scales to hundreds of tenants transparently
  ✅ Cross-tenant analytics trivial (filter by companyId)
  ⚠️ Requires strict discipline — every query must scope to companyId
  ⚠️ Requires indexes on companyId for performance`}
          </DarkBlock>

          <P>
            For Faigen's scale and budget — a bootstrapped product serving
            Kerala SMBs — shared collections with companyId scoping was the
            only sensible choice. Separate databases per tenant would have
            meant paying for 20+ database connections from day one.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / The Schema Design">
          <P>
            Every model that contains tenant-specific data has a required
            <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">companyId</code> field. This is the foreign key that links
            every document to exactly one tenant.
          </P>

          <DarkBlock>
{`// Company model — one document per tenant
const companySchema = new mongoose.Schema({
  name:                    { type: String, required: true },
  ownerPhone:              { type: String, required: true },
  whatsappPhoneNumberId:   { type: String, default: null },
  systemPrompt:            { type: String, default: '...' },
  welcomeMessage:          { type: String, default: '...' },
  aiProvider:              { type: String, enum: ['gemini', 'openai', 'groq'] },
  aiModel:                 { type: String },
  aiApiKey:                { type: String, select: false }, // never returned by default
  features:                { type: featuresSchema },
  aiContext:               { type: aiContextSchema },
  broadcastCredits:        { type: Number, default: 0 },
  active:                  { type: Boolean, default: true },
}, { timestamps: true })

// Conversation model — scoped to company
const conversationSchema = new mongoose.Schema({
  companyId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  customerPhone: { type: String, required: true },
  platform:      { type: String, enum: ['whatsapp', 'instagram'] },
  messages:      [messageSchema],
  isActive:      { type: Boolean, default: true },
  lastMessageAt: { type: Date },
}, { timestamps: true })

// Critical — compound index for tenant-scoped queries
conversationSchema.index({ companyId: 1, customerPhone: 1, platform: 1 })
conversationSchema.index({ companyId: 1, isActive: 1, lastMessageAt: -1 })

// Order model — scoped to company
const orderSchema = new mongoose.Schema({
  companyId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  customerPhone: { type: String, required: true },
  product:       { type: String, required: true },
  quantity:      { type: Number, required: true },
  status:        { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'] },
}, { timestamps: true })

orderSchema.index({ companyId: 1, status: 1, createdAt: -1 })`}
          </DarkBlock>

          <P>
            The compound index on <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">companyId + customerPhone + platform</code>
            means that looking up a conversation for an incoming WhatsApp message
            hits the index directly — no collection scan, regardless of how many
            tenants are on the platform.
          </P>
        </Section>

        {/* SECTION 3 */}
        <Section label="03 / Tenant Resolution at the Webhook Layer">
          <P>
            Every incoming WhatsApp message contains a <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">phone_number_id</code>
            in the webhook metadata. This is the unique identifier for the WhatsApp
            Business number that received the message — and it maps directly to
            one company in our database.
          </P>
          <P>
            Tenant resolution happens at the very top of the message handler —
            before any business logic runs. If no company is found, the message
            is silently dropped. If found, all subsequent code operates within
            that tenant's context.
          </P>

          <DarkBlock>
{`const processMessage = async (message, value) => {
  // Step 1 — resolve tenant from incoming webhook
  const phoneNumberId = value.metadata.phone_number_id

  const company = await Company.findOne({
    whatsappPhoneNumberId: phoneNumberId,
    active: true
  }).select('+aiApiKey') // aiApiKey excluded by default — opt in explicitly

  // Unknown number — not our tenant
  if (!company) {
    console.log('No company for phoneNumberId:', phoneNumberId)
    return
  }

  // Suspended tenant — service unavailable
  if (company.billingStatus === 'suspended') {
    await sendTextMessage(phoneNumberId, message.from,
      'Service temporarily unavailable. Please contact the business directly.')
    return
  }

  // Feature flag check — is WhatsApp enabled for this tenant?
  if (!company.features?.whatsapp) {
    console.log('WhatsApp disabled for:', company.name)
    return
  }

  // From here — all operations scoped to company._id
  const conversation = await Conversation.findOne({
    companyId: company._id,  // always scoped
    customerPhone: message.from,
    platform: 'whatsapp'
  })

  // AI runs with this tenant's config
  const response = await getAIResponse(
    company,           // contains systemPrompt, aiModel, aiApiKey, aiContext
    conversation.messages,
    customerMessage
  )
}`}
          </DarkBlock>
        </Section>

        {/* SECTION 4 */}
        <Section label="04 / Tenant Resolution in Next.js API Routes">
          <P>
            The admin dashboard is a Next.js app. Every API route that serves
            dashboard data must resolve the authenticated user's company and
            scope all queries to that company. No exceptions.
          </P>
          <P>
            I built a reusable middleware function that extracts the company
            from the session JWT and returns it — or throws a 401 if the
            session is invalid.
          </P>

          <DarkBlock>
{`// lib/getAuthCompany.js
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import Company from '@/models/Company'
import dbConnect from './db'

export async function getAuthCompany(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.companyId) {
    return { error: 'Unauthorized', status: 401 }
  }

  await dbConnect()

  const company = await Company.findOne({
    _id: session.user.companyId,
    active: true
  })

  if (!company) {
    return { error: 'Company not found', status: 404 }
  }

  return { company }
}

// pages/api/conversations/index.js
export default async function handler(req, res) {
  const { company, error, status } = await getAuthCompany(req, res)
  if (error) return res.status(status).json({ error })

  // All queries automatically scoped to this tenant
  const conversations = await Conversation.find({
    companyId: company._id,    // scope enforced here
    isActive: true
  })
  .sort({ lastMessageAt: -1 })
  .limit(50)

  res.json({ success: true, data: conversations })
}`}
          </DarkBlock>

          <P>
            The key discipline: <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">companyId: company._id</code> appears on
            every MongoDB query in every API route. If it is ever missing —
            if a developer writes <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">Conversation.find(&#123; isActive: true &#125;)</code>
            without the companyId scope — that query returns conversations from
            all tenants. This is a data leak.
          </P>
          <P>
            To guard against this, I added an ESLint rule that flags any
            Mongoose <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">.find()</code> or <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">.findOne()</code> call
            that does not include <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">companyId</code> in the query object.
            Not perfect — it can be bypassed — but it catches the common case.
          </P>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / Per-Tenant Feature Flags">
          <P>
            Not all tenants have the same features enabled. A free-tier tenant
            might not have broadcast campaigns or Instagram automation.
            A premium tenant might have a higher message limit and custom AI config.
          </P>
          <P>
            Feature flags live on the Company document — a flat object of booleans
            checked at runtime before any feature runs.
          </P>

          <DarkBlock>
{`// Company schema — features sub-document
features: {
  whatsapp:            { type: Boolean, default: true  },
  instagram:           { type: Boolean, default: false },
  orderCollection:     { type: Boolean, default: true  },
  productCatalog:      { type: Boolean, default: true  },
  marketing:           { type: Boolean, default: false },
  otp:                 { type: Boolean, default: false },
  interactiveMessages: { type: Boolean, default: true  },
  analytics:           { type: Boolean, default: true  },
  imageSupport:        { type: Boolean, default: false },
}

// Usage in webhook handler — check before running feature
if (company.features?.interactiveMessages && company.aiContext?.mainMenuButtons?.length > 0) {
  await sendButtonMessage(phoneNumberId, customerPhone,
    welcomeText, company.aiContext.mainMenuButtons)
} else {
  await sendTextMessage(phoneNumberId, customerPhone, welcomeText)
}

// Enabling a feature for a tenant — one DB update
await Company.findByIdAndUpdate(companyId, {
  $set: { 'features.instagram': true }
})`}
          </DarkBlock>

          <P>
            Enabling a new feature for a tenant is a single database update.
            No deployment, no config change, no restart. The next message
            from that tenant's customers picks up the new feature flag automatically.
          </P>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / Per-Tenant AI Configuration">
          <P>
            Each company can have a completely different AI setup —
            different provider (Gemini, OpenAI, Groq), different model,
            different system prompt, different temperature, and their own API key.
          </P>
          <P>
            The <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">getAIResponse</code> function reads the company's config
            and dispatches to the correct provider. Adding a new AI provider
            means adding one case to the dispatcher — zero changes to the
            tenant data model.
          </P>

          <DarkBlock>
{`// services/ai.js
export const getAIResponse = async (company, messages, userMessage) => {
  const provider = company.aiProvider || 'groq'
  const model    = company.aiModel
  const apiKey   = company.aiApiKey // select: false — must be explicitly selected
  const prompt   = buildSystemPrompt(company) // merges systemPrompt + aiContext

  try {
    switch (provider) {
      case 'gemini':
        return await callGemini(model, apiKey, prompt, messages, userMessage)
      case 'openai':
        return await callOpenAI(model, apiKey, prompt, messages, userMessage)
      case 'groq':
      default:
        return await callGroq(model, apiKey, prompt, messages, userMessage)
    }
  } catch (err) {
    console.error('AI error [' + provider + '/' + model + ']:', err.message)
    // Fallback to Groq default if primary provider fails
    if (provider !== 'groq') {
      console.warn('Falling back to Groq default')
      return await callGroq('llama-3.3-70b-versatile', null, prompt, messages, userMessage)
    }
    throw err
  }
}`}
          </DarkBlock>
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / The One Rule That Prevents Data Leaks">
          <P>
            After building this, the single most important rule I can offer for
            anyone building a companyId-scoped multi-tenant system is this:
          </P>

          <QuoteBlock>
            Never write a query without companyId. Not once, not as a quick fix,
            not in a utility function that "only runs in admin context."
            The discipline must be absolute or data isolation is not isolation — it is hope.
          </QuoteBlock>

          <P>
            Every query in the codebase that touches tenant data follows the same pattern:
          </P>

          <DarkBlock>
{`// The pattern — always, everywhere, no exceptions
const data = await Model.find({ companyId: company._id, ...otherFilters })
const item = await Model.findOne({ companyId: company._id, _id: itemId })
await Model.updateOne({ companyId: company._id, _id: itemId }, update)
await Model.deleteOne({ companyId: company._id, _id: itemId })`}
          </DarkBlock>

          <P>
            Even for deleteOne. Even for updateOne. Even when you "know" the
            ID belongs to the right company. The companyId scope is your
            defence against a bug that could expose one tenant's data to another.
            Write it every time.
          </P>
        </Section>

        {/* SECTION 8 */}
        <Section label="08 / What I Would Do Differently">
          <NumberedList items={[
            {
              title: 'Add a Mongoose plugin for automatic companyId injection',
              body: 'Instead of manually adding companyId to every query, a Mongoose plugin can intercept every find/update/delete operation and automatically inject the companyId from a request context. This makes the scoping invisible and impossible to forget — but requires careful setup to not break admin queries that legitimately need cross-tenant access.'
            },
            {
              title: 'Build tenant isolation tests from day one',
              body: 'A test that creates two tenants, writes data for each, and verifies that querying as tenant A never returns tenant B\'s data. This test should run in CI on every push. I built this retrospectively — it should have been the first test written.'
            },
            {
              title: 'Rate limit at the tenant level, not just the IP level',
              body: 'IP rate limiting is not enough for a multi-tenant system. A single tenant can send thousands of messages from different IPs. Per-tenant rate limiting — tracked in Redis by companyId — protects the platform from one tenant degrading performance for all others.'
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
            <Link href="/blogs/mern-hospital-routing" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              Express.js Hospital Routing →
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