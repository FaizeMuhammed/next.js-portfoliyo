import React from 'react';
import Link from 'next/link';

export default function BlogHospitalRouting() {
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
            Systems Design
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">August 2025</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">6 min read</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[7vw] font-bold tracking-tighter leading-none mb-12">
          Optimizing Express.js API Routing for a High-Traffic Hospital System.
        </h1>

        <p className="text-xl md:text-3xl text-gray-700 leading-relaxed mb-16 max-w-5xl font-medium">
          When a top specialist opens their calendar, hundreds of patients try to book 
          the same 10 slots simultaneously. Here is how I re-architected a MERN stack 
          Express.js backend to handle massive read/write spikes without crashing.
        </p>

        {/* META ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-b border-gray-300 py-12">
          {[
            { label: 'Author', value: 'Faize Muhammed Basheer' },
            { label: 'Project', value: 'Hospital Management System' },
            { label: 'Stack', value: 'MongoDB / Express / React / Node.js' },
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
        <Section label="01 / The Context">
          <P>
            A hospital appointment system sounds simple on paper: patients view doctors,
            select a time slot, and book it. In reality, it is a highly volatile,
            concurrency-heavy environment.
          </P>
          <P>
            Unlike a standard SaaS app with predictable traffic, hospital systems
            experience aggressive spikes. When a highly sought-after specialist's
            schedule opens for the month, you get hundreds of concurrent requests
            trying to read the same schedule and book the exact same 15-minute slots.
          </P>
          <P>
            The original MVP of this platform was built as a standard monolithic
            Express.js application. Under load testing, it crumbled. Response times
            spiked to 4+ seconds, the event loop blocked, and double-bookings occurred.
            The problem was not Node.js — it was how the API routing and middleware
            were structured.
          </P>
        </Section>

        {/* SECTION 2 */}
        <Section label="02 / The Middleware Bloat Problem">
          <P>
            In many Express.js applications, developers use global middleware
            indiscriminately. The original codebase had something that looked like this
            at the top of the <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">server.js</code> file:
          </P>

          <DarkBlock>
{`// BAD: Global middleware applied to EVERYTHING
app.use(express.json());
app.use(cors());
app.use(authenticateUser); // JWT verification
app.use(fetchUserRoles);   // DB call
app.use('/api', mainRouter);`}
          </DarkBlock>

          <P>
            Because <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">authenticateUser</code> and <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">fetchUserRoles</code> were 
            applied globally, a patient simply trying to view the public list of doctors 
            was triggering a JWT verification and a MongoDB user lookup. 
          </P>
          <P>
            During a traffic spike, these unnecessary database lookups exhausted the 
            MongoDB connection pool, causing the entire API to hang.
          </P>

          <QuoteBlock>
            Middleware is not free. Every function you chain to a route adds latency 
            and consumes event loop cycles. Global database lookups are the silent 
            killer of Express applications.
          </QuoteBlock>
        </Section>

        {/* SECTION 3 */}
        <Section label="03 / Decoupling with Modular Routers">
          <P>
            The first step was tearing down the global middleware and adopting a 
            strictly modular routing architecture. In Express, <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">express.Router()</code> 
            allows you to create isolated mini-applications.
          </P>
          <P>
            I split the API into public routes (read-heavy, heavily cached) and 
            private routes (write-heavy, strictly authenticated).
          </P>

          <DarkBlock>
{`// routes/public/doctors.js
const express = require('express');
const router = express.Router();
// NO auth middleware here
router.get('/', getDoctorsList);
router.get('/:id/slots', getDoctorSlots);

// routes/private/appointments.js
const express = require('express');
const router = express.Router();
// Auth applied ONLY to the routes that need it
router.use(requireAuth); 
router.post('/book', validateBookingPayload, bookAppointment);
router.get('/my-appointments', getUserAppointments);

// server.js
app.use('/api/public/doctors', publicDoctorsRouter);
app.use('/api/private/appointments', privateAppointmentsRouter);`}
          </DarkBlock>

          <P>
            By isolating the routes, public schedule lookups dropped from 250ms to 
            15ms because they no longer hit the users collection in the database.
          </P>
        </Section>

        {/* SECTION 4 */}
        <Section label="04 / The Async Error Wrapper">
          <P>
            One of the biggest issues with Express.js is how it handles asynchronous 
            errors. If a database query fails inside a route and you forget to wrap 
            it in a <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">try/catch</code> block, you get an Unhandled Promise Rejection, 
            which can crash the entire Node.js process.
          </P>
          <P>
            The original codebase was littered with massive try/catch blocks that 
            made the business logic unreadable. I replaced them all with a single 
            Higher-Order Function (HOF) wrapper.
          </P>

          <DarkBlock>
{`// utils/catchAsync.js
// Wraps async controllers and catches errors automatically
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// controllers/appointmentController.js
// Look how clean the controller becomes — no try/catch!
exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { doctorId, slotTime } = req.body;
  
  const slot = await Slot.findOne({ doctorId, time: slotTime });
  if (!slot) return next(new AppError('Slot not found', 404));
  if (slot.isBooked) return next(new AppError('Slot already booked', 400));

  slot.isBooked = true;
  slot.patientId = req.user.id;
  await slot.save();

  res.status(200).json({ status: 'success', data: slot });
});`}
          </DarkBlock>

          <P>
            Any error thrown inside <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">catchAsync</code> is automatically forwarded 
            to the Express global error handling middleware via <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">next()</code>. 
            This eliminated process crashes and reduced controller file size by 30%.
          </P>
        </Section>

        {/* SECTION 5 */}
        <Section label="05 / Route-Level Redis Caching">
          <P>
            When a specialist opens their schedule, 95% of the traffic is read-only — 
            users refreshing the page to see available slots. Hitting MongoDB for 
            every schedule read is a massive waste of resources.
          </P>
          <P>
            I implemented Redis caching specifically as a route-level middleware.
          </P>

          <DarkBlock>
{`// middleware/redisCache.js
const getCachedSlots = catchAsync(async (req, res, next) => {
  const { doctorId, date } = req.query;
  const cacheKey = \`slots:\${doctorId}:\${date}\`;

  const cachedData = await redisClient.get(cacheKey);
  
  if (cachedData) {
    // Cache HIT: Return immediately without hitting MongoDB
    return res.status(200).json(JSON.parse(cachedData));
  }
  
  // Cache MISS: Attach key to request and continue to controller
  req.cacheKey = cacheKey;
  next();
});

// routes.js
router.get('/slots', getCachedSlots, fetchSlotsFromDB);`}
          </DarkBlock>

          <P>
            The critical part is cache invalidation. Whenever an appointment is 
            successfully booked, the booking controller immediately deletes the 
            relevant Redis key (<code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">redisClient.del(req.cacheKey)</code>). 
            This guarantees that patients never see "stale" slots that have already 
            been taken.
          </P>
        </Section>

        {/* SECTION 6 */}
        <Section label="06 / Transaction Safety in Bookings">
          <P>
            The hardest problem was the "double booking" race condition. If two users 
            click "Book" on the 10:00 AM slot at the exact same millisecond, they both 
            read the slot as "available", and both proceed to book it.
          </P>
          <P>
            In MongoDB, I solved this by moving away from separate read/write operations 
            and utilizing MongoDB's atomic <code className="bg-gray-100 border border-gray-300 px-2 py-0.5 text-sm font-mono mx-1">findOneAndUpdate</code> with strict 
            query conditions.
          </P>

          <DarkBlock>
{`// Atomic booking — prevents race conditions
exports.bookAppointment = catchAsync(async (req, res, next) => {
  const { slotId } = req.body;

  // We only update if the slot exists AND is currently NOT booked
  const updatedSlot = await Slot.findOneAndUpdate(
    { _id: slotId, isBooked: false }, 
    { 
      $set: { 
        isBooked: true, 
        patientId: req.user._id,
        bookedAt: new Date()
      } 
    },
    { new: true } // Returns the updated document
  );

  // If updatedSlot is null, it means the slot was either not found, 
  // OR someone else booked it a millisecond before this query ran.
  if (!updatedSlot) {
    return next(new AppError('Sorry, this slot was just taken.', 409));
  }

  // Clear Redis Cache
  await redisClient.del(\`slots:\${updatedSlot.doctorId}:\${updatedSlot.date}\`);

  res.status(200).json({ success: true, appointment: updatedSlot });
});`}
          </DarkBlock>

          <P>
            Because MongoDB executes this single document update atomically, the race 
            condition is completely eliminated at the database level. No complex 
            distributed locks required.
          </P>
        </Section>

        {/* SECTION 7 */}
        <Section label="07 / Results & Takeaways">
          <NumberedList items={[
            {
              title: 'API Response times dropped by 90%',
              body: 'By removing global auth middleware from public routes and implementing Redis, the doctor search and schedule endpoints went from 250ms to ~15ms.'
            },
            {
              title: 'Zero Double-Bookings',
              body: 'Replacing two-step read/write logic with atomic findOneAndUpdate operations mathematically guaranteed that two patients could never secure the same slot.'
            },
            {
              title: 'Process Stability',
              body: 'The catchAsync wrapper eliminated Unhandled Promise Rejections. Errors are now caught, formatted, and returned as clean JSON to the React frontend without ever crashing the Node.js instance.'
            },
            {
              title: 'Controller Clarity',
              body: 'Moving logic out of massive server files into modular routers, and stripping away try/catch boilerplate made the codebase highly maintainable.'
            }
          ]} />
        </Section>

        {/* BOTTOM NAV */}
        <div className="border-t-4 border-black pt-12 mt-32 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <Link href="/blogs" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-3 border border-gray-300 px-8 py-4 hover:border-black">
            ← All Articles
          </Link>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Next Case Study</p>
            <Link href="/ondc" className="text-4xl md:text-5xl font-bold tracking-tighter hover:underline">
              ONDC Infrastructure →
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