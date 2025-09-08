import React, { useMemo, useRef, useState, useEffect } from "react";

// Carter's Flamehouse — Public Website
// One-file React app with TailwindCSS. Mobile-first, black & gold theme.
// Sections: Home, About, Menu, Gallery, Reservations, Contact. Includes a basic reservation form.

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reservations", label: "Reservations" },
  { id: "contact", label: "Contact" }
];

const menuData = {
  bread: [
    { name: "Smoked Honey Cornbread Skillet", desc: "Cast iron, whipped maple–chili butter." }
  ],
  starters: [
    { name: "Charred Bone Marrow & Herb Toast" },
    { name: "Flame-Seared Wagyu Bites" },
    { name: "Smoked Lobster Mac Mini" },
    { name: "Grilled Oysters Rockefeller" },
    { name: "Fire-Roasted Stuffed Peppers" },
    { name: "BBQ Duck Sliders" },
    { name: "House Charcuterie Board" },
    { name: "Bourbon-Braised Short Rib Crostini" },
    { name: "Flamehouse Shrimp Cocktail" },
    { name: "Smoked Deviled Eggs Trio" },
    { name: "BBQ Chicken Flatbread" },
    { name: "Grilled Street Corn Dip" }
  ],
  mains: [
    { name: "The Carter Tomahawk (40oz Wagyu)", desc: "Bone marrow butter, tableside carve." },
    { name: "BBQ Lobster Surf & Turf" },
    { name: "Fire-Kissed Ribeye" },
    { name: "Charcoal-Smoked Porterhouse" },
    { name: "Firehouse Mixed Grill Platter" },
    { name: "12-Hour Smoked Brisket" },
    { name: "Maple-Glazed Smoked Pork Belly" },
    { name: "Cherrywood-Smoked Lamb Chops" },
    { name: "Mesquite-Smoked Prime Rib" },
    { name: "Cedar Plank Salmon" },
    { name: "Fire-Grilled Swordfish" },
    { name: "Charred King Prawns" },
    { name: "Wood-Fired Duck Breast" },
    { name: "BBQ Cauliflower Steak (V)" },
    { name: "Spicy Jalapeño–Maple Glazed Chicken" }
  ],
  sides: [
    { name: "Truffle-Smoked Mac & Cheese" },
    { name: "Charred Brussels with Maple–Bacon Glaze" },
    { name: "Garlic–Parmesan Flame Fries" },
    { name: "Smoked Sweet Potato Purée" },
    { name: "Cast Iron Mushrooms with Herb Butter" },
    { name: "Flamehouse Coleslaw" },
    { name: "Grilled Corn Ribs with Chipotle Mayo" },
    { name: "Bourbon Baked Beans with Burnt Ends" },
    { name: "Grilled Asparagus with Smoked Hollandaise" },
    { name: "Twice-Baked Potato Skillet" },
    { name: "Charred Broccolini with Chili Oil" },
    { name: "Smoked Gouda Grits" },
    { name: "Firehouse Pickle Jar" }
  ],
  desserts: [
    { name: "Campfire Bourbon Bread Pudding" },
    { name: "Grilled Pineapple Rum Cake" },
    { name: "Tableside S’mores for Two" },
    { name: "Flamehouse Molten Lava Cake" },
    { name: "Maple–Pecan Cheesecake" },
    { name: "Smoked Honey Panna Cotta" },
    { name: "Caramelized Banana Foster" },
    { name: "Grilled Peach & Mascarpone Tart" }
  ],
  drinks: [
    { name: "The Ember Old Fashioned" },
    { name: "Carter’s Smoked Manhattan" },
    { name: "The Charred Lemon Drop" },
    { name: "Flamehouse Sangria" },
    { name: "The Smoldering Paloma" },
    { name: "Midnight Ember Espresso Martini" },
    { name: "Flamehouse Sunset (Mocktail)" },
    { name: "Charcoal Lemonade (Mocktail)" },
    { name: "Whiskeys: Pappy Van Winkle • Blanton’s Gold • Woodford Reserve Double Oaked" }
  ]
};

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(id)),
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function Nav() {
  const active = useScrollSpy(sections.map((s) => s.id));
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/50 border-b border-yellow-500/40">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-yellow-400 font-semibold tracking-wider">Carter’s Flamehouse</div>
        <div className="hidden md:flex gap-4">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`px-3 py-1 rounded-full text-sm transition ${active===s.id?"bg-yellow-400 text-black":"text-yellow-400 hover:bg-yellow-400/20"}`}>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-24 md:pt-28 bg-[radial-gradient(circle_at_20%_20%,#1f1f1f,transparent_60%),radial-gradient(circle_at_80%_0,#2a1d00,transparent_40%),#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif text-yellow-400">Where Fire Meets Fine Dining</h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl">An upscale BBQ steakhouse pairing smokehouse soul with gold‑standard hospitality.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="px-5 py-3 rounded-2xl bg-yellow-400 text-black font-semibold shadow hover:shadow-lg transition">View Menu</a>
            <a href="#reservations" className="px-5 py-3 rounded-2xl border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 transition">Reserve a Table</a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-yellow-500/30">
          {/* Placeholder fire/BBQ image */}
          <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl md:text-4xl text-yellow-400 font-serif">About Us</h2>
          <p className="text-gray-300">Carter’s Flamehouse blends the craft of slow smoke with the elegance of fine dining. Our chefs honor classic techniques—offset smokers, hardwoods, cast‑iron sears—while elevating plates with seasonal produce and premium cuts.</p>
          <p className="text-gray-300">Expect wagyu, lobster, and tomahawks; craft cocktails kissed with smoke; and service that feels like a special occasion every night.</p>
          <ul className="list-disc pl-5 text-gray-300">
            <li>Premium meats & sustainable sourcing</li>
            <li>In‑house sauces, rubs, breads</li>
            <li>Whiskey & cocktail program</li>
          </ul>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl ring-1 ring-yellow-500/20">
          <div className="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}

function MenuSection({ title, items }) {
  return (
    <div>
      <h3 className="text-2xl font-serif text-yellow-400 mb-3">{title}</h3>
      <ul className="grid sm:grid-cols-2 gap-4">
        {items.map((it, idx) => (
          <li key={idx} className="p-4 rounded-2xl bg-neutral-900/60 ring-1 ring-yellow-500/10">
            <div className="font-semibold">{it.name}</div>
            {it.desc && <div className="text-sm text-gray-400 mt-1">{it.desc}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Menu() {
  return (
    <section id="menu" className="py-16 md:py-20 bg-gradient-to-b from-black to-neutral-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-3xl md:text-4xl text-yellow-400 font-serif">Menu</h2>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
              onClick={() => window.print()}
            >
              Print Menu
            </button>
            <a
              href="#menu"
              className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold"
              title="Use this anchor as your QR link once deployed (e.g., https://flamehousebbq.com/#menu)"
            >
              Get QR Link
            </a>
          </div>
        </div>
        <div className="mt-10 grid gap-10">
          <MenuSection title="Signature Bread" items={menuData.bread} />
          <MenuSection title="Starters" items={menuData.starters} />
          <MenuSection title="Mains" items={menuData.mains} />
          <MenuSection title="Sides" items={menuData.sides} />
          <MenuSection title="Desserts" items={menuData.desserts} />
          <MenuSection title="Drinks" items={menuData.drinks} />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1514511547117-f9c8a1200965?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604908177131-71f8b25d4d3b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612872087720-bb876e2a4c84?q=80&w=1600&auto=format&fit=crop",
  ];
  return (
    <section id="gallery" className="py-16 md:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-yellow-400 font-serif mb-8">Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden ring-1 ring-yellow-500/10">
              <img src={src} alt="Flamehouse dish" className="w-full h-40 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reservations() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", party: 2, notes: "" });
  const [submitted, setSubmitted] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    // For now, store locally. Swap with OpenTable/Resy or email service later.
    const data = JSON.parse(localStorage.getItem("flamehouse_reservations") || "[]");
    data.push({ ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("flamehouse_reservations", JSON.stringify(data));
    setSubmitted(true);
  }
  return (
    <section id="reservations" className="py-16 md:py-20 bg-neutral-950">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-yellow-400 font-serif mb-6">Reservations</h2>
        {!submitted ? (
          <form onSubmit={onSubmit} className="grid gap-4 bg-neutral-900/60 p-6 rounded-3xl ring-1 ring-yellow-500/10">
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Full name" className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
              <input type="email" required placeholder="Email" className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <input type="date" required className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} />
              <input type="time" required className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})} />
              <input type="number" min={1} max={20} required placeholder="Party size" className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" value={form.party} onChange={(e)=>setForm({...form,party:e.target.value})} />
            </div>
            <textarea placeholder="Notes or special requests" className="px-4 py-3 rounded-xl bg-black/60 ring-1 ring-yellow-600/20 text-gray-100" rows={4} value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
            <div className="flex items-center gap-3">
              <button className="px-5 py-3 rounded-2xl bg-yellow-400 text-black font-semibold">Request Reservation</button>
              <span className="text-sm text-gray-400">We’ll confirm by email within 24 hours.</span>
            </div>
          </form>
        ) : (
          <div className="p-6 rounded-3xl bg-green-900/20 ring-1 ring-green-500/30">
            <div className="text-green-400 font-semibold">Reservation request received!</div>
            <div className="text-gray-300 mt-2">We’ve saved your request. A manager will follow up shortly via email.</div>
            <button className="mt-4 px-4 py-2 rounded-xl border border-yellow-400 text-yellow-400" onClick={()=>setSubmitted(false)}>Make another request</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl text-yellow-400 font-serif">Contact</h2>
          <div className="mt-4 text-gray-300 space-y-2">
            <p><span className="text-yellow-400">Phone:</span> (555) 123‑FLAME</p>
            <p><span className="text-yellow-400">Email:</span> hello@flamehousebbq.com</p>
            <p><span className="text-yellow-400">Address:</span> 123 Ember Lane, Your City, ST</p>
            <p><span className="text-yellow-400">Hours:</span> Mon–Thu 5–10 • Fri–Sat 5–11 • Sun 4–9</p>
          </div>
          <div className="mt-6">
            <iframe
              title="Map"
              className="w-full h-64 rounded-2xl ring-1 ring-yellow-500/10"
              loading="lazy"
              src="https://www.google.com/maps?q=New%20York&output=embed"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl text-yellow-400 font-serif">Write to Us</h3>
          <form className="mt-4 grid gap-3">
            <input placeholder="Your name" className="px-4 py-3 rounded-xl bg-neutral-900 ring-1 ring-yellow-600/20 text-gray-100" />
            <input type="email" placeholder="Your email" className="px-4 py-3 rounded-xl bg-neutral-900 ring-1 ring-yellow-600/20 text-gray-100" />
            <textarea placeholder="Message" rows={5} className="px-4 py-3 rounded-xl bg-neutral-900 ring-1 ring-yellow-600/20 text-gray-100" />
            <button type="button" onClick={()=>alert('Thanks! We will get back to you soon.')} className="px-5 py-3 rounded-2xl bg-yellow-400 text-black font-semibold">Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/30">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
        <div>© {new Date().getFullYear()} Carter’s Flamehouse. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <a href="#menu" className="text-yellow-400 hover:underline">Menu</a>
          <a href="#reservations" className="text-yellow-400 hover:underline">Reserve</a>
          <a href="#contact" className="text-yellow-400 hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(()=>{
    // smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  },[]);
  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservations />
      <Contact />
      <Footer />
    </div>
  );
}
