const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

// Component handlers and timers are simulated. No browser or Google code is run.
const root = path.resolve(__dirname, "..");
const href = "https://wa.me/966558811538?text=PRIVATE_MESSAGE";
const jsx = (type, props) => ({ type, props: props || {} });
const clean = (value) => JSON.parse(JSON.stringify(value));
function nodes(node) {
  if (Array.isArray(node)) return node.flatMap(nodes);
  if (!node || typeof node !== "object") return [];
  return [node, ...nodes(node.props?.children)];
}

function harness(options = {}) {
  const events = [];
  const opens = [];
  const navigations = [];
  const gtagCalls = [];
  const timers = new Map();
  const state = options.state || [];
  let cursor = 0;
  let now = 0;
  let nextTimer = 1;
  let closedCount = 0;
  const location = { pathname: options.pathname ?? "/countries", search: "?name=PRIVATE_NAME", hash: "#PRIVATE_HASH" };
  Object.defineProperty(location, "href", { set: (url) => navigations.push({ target: "current", url, time: now }) });
  const popup = { closed: false, opener: "parent", location: {}, close() { closedCount++; } };
  Object.defineProperty(popup.location, "href", { set(url) {
    if (options.navigationThrows) throw Error("mock navigation blocked");
    navigations.push({ target: "popup", url, time: now });
  } });
  if (options.openerThrows) Object.defineProperty(popup, "opener", { set() { throw Error("mock opener blocked"); } });
  const window = {
    location,
    open(...args) { opens.push({ args, time: now }); if (options.openThrows) throw Error("mock popup blocked"); return options.popupBlocked ? null : popup; },
    setTimeout(fn, ms) { const id = nextTimer++; timers.set(id, { fn, due: now + ms }); return id; },
    clearTimeout(id) { timers.delete(id); },
    gtag(...args) { gtagCalls.push(args); throw Error("Unexpected direct conversion"); },
    addEventListener() { throw Error("Unexpected tracking listener"); }
  };
  const layer = options.layer || events;
  layer.push = function (event) {
    if (options.pushThrows) throw Error("mock push failure");
    Array.prototype.push.call(this, event);
    if (this !== events) events.push(event);
    if (options.synchronousCallback) event.eventCallback?.();
    return this.length;
  };
  if (!options.noLayer) window.dataLayer = layer;
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const exports = {};
    cache.set(file, exports);
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const code = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX
    } }).outputText;
    vm.runInNewContext(code, {
      exports, window: options.server ? undefined : window,
      require(specifier) {
        if (specifier === "react/jsx-runtime") return { jsx, jsxs: jsx, Fragment: "Fragment" };
        if (specifier === "react") return { useState(initial) {
          const index = cursor++;
          if (!(index in state)) state[index] = initial;
          return [state[index], (value) => { state[index] = typeof value === "function" ? value(state[index]) : value; }];
        }, useEffect() {} };
        const modules = {
          "@/lib/whatsapp": "lib/whatsapp.ts", "@/lib/data": "lib/data.ts",
          "@/components/WhatsAppLink": "components/WhatsAppLink.tsx",
          "@/components/CountryApplyLink": "components/CountryApplyLink.tsx",
          "@/components/Sections": "components/Sections.tsx"
        };
        if (modules[specifier]) return load(modules[specifier]);
        if (specifier === "next/link") return { default: "NextLink" };
        return new Proxy({}, { get: (_, name) => name === "__esModule" ? true : String(name) });
      }
    }, { filename: file });
    return exports;
  }
  function render(component, props) { cursor = 0; return component(props); }
  function anchor(element) { while (typeof element.type === "function") element = render(element.type, element.props); return element; }
  function click(element, target = "text") {
    const event = { target: { nodeName: target }, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
    anchor(element).props.onClick(event);
    return event;
  }
  function tick(ms) {
    const end = now + ms;
    for (;;) {
      const next = [...timers].filter(([, timer]) => timer.due <= end).sort((a, b) => a[1].due - b[1].due)[0];
      if (!next) break;
      now = next[1].due;
      timers.delete(next[0]);
      next[1].fn();
    }
    now = end;
  }
  const tracked = (url = href) => load("lib/whatsapp.ts").openCountriesApplyWhatsApp(url);
  const plain = (url = href) => load("lib/whatsapp.ts").openWhatsApp(url);
  return { window, events, opens, navigations, gtagCalls, timers, popup, load, render, anchor, click, tick, tracked, plain, get closedCount() { return closedCount; } };
}

test("countries CTA queues exactly the dedicated event with no message, PII, query or legacy conversion", () => {
  const h = harness(); h.tracked();
  assert.equal(h.events.length, 1);
  assert.deepEqual(clean(h.events[0]), { event: "countries_apply_click", page_path: "/countries", eventTimeout: 2000 });
  assert.deepEqual(Object.keys(h.events[0]).sort(), ["event", "page_path", "eventCallback", "eventTimeout"].sort());
  assert.equal(typeof h.events[0].eventCallback, "function");
  assert.doesNotMatch(JSON.stringify(h.events[0]), /PRIVATE_|wa\.me|text=|whatsapp_v2|tracking_schema/);
  assert.equal(h.gtagCalls.length, 0);
  assert.equal(h.opens.length, 1);
  assert.equal(h.opens[0].time, 0);
  assert.equal(h.popup.opener, null);
});

for (const pathname of ["/", "/contact", "/request/recruitment", "/countries/", "/countries-extra", "/countries/details", "/en/countries"]) {
  test(`dedicated helper refuses conversion on exact non-target route ${pathname}`, () => {
    const h = harness({ pathname }); h.tracked();
    assert.equal(h.events.length, 0);
    assert.equal(h.timers.size, 0);
    assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 0 }]);
  });
}

test("plain WhatsApp never tracks, even on /countries, and opens immediately", () => {
  const h = harness(); h.plain();
  assert.equal(h.events.length, 0); assert.equal(h.gtagCalls.length, 0); assert.equal(h.timers.size, 0);
  assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 0 }]);
});

test("callback early/repeated/late opens once and cancels fallback", () => {
  const h = harness(); h.tracked(); h.tick(50); h.events[0].eventCallback(); h.events[0].eventCallback(); h.tick(4000); h.events[0].eventCallback();
  assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 50 }]); assert.equal(h.timers.size, 0);
});

test("synchronous GTM callback leaves no extra timer or navigation", () => {
  const h = harness({ synchronousCallback: true }); h.tracked(); h.tick(5000);
  assert.equal(h.navigations.length, 1); assert.equal(h.timers.size, 0);
});

test("GTM absent/blocked or callback missing opens by 2000ms with no fallback conversion", () => {
  const h = harness(); h.tracked(); h.tick(1999); assert.equal(h.navigations.length, 0); h.tick(1); h.events[0].eventCallback();
  assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 2000 }]); assert.equal(h.gtagCalls.length, 0);
});

test("missing dataLayer is initialized and an existing dataLayer is preserved", () => {
  const absent = harness({ noLayer: true }); absent.tracked(); absent.tick(2000);
  assert.equal(absent.window.dataLayer[0].event, "countries_apply_click"); assert.equal(absent.navigations.length, 1);
  const earlier = { keep: true }; const layer = [earlier]; const h = harness({ layer }); h.tracked();
  assert.equal(h.window.dataLayer, layer); assert.equal(layer[0], earlier); assert.equal(layer.length, 2);
});

test("push failure navigates immediately once without another measurement path", () => {
  const h = harness({ pushThrows: true }); h.tracked(); h.tick(5000);
  assert.equal(h.navigations.length, 1); assert.equal(h.navigations[0].time, 0); assert.equal(h.gtagCalls.length, 0);
});

for (const option of ["popupBlocked", "openThrows"]) {
  test(`${option} falls back to the current window for tracked and plain buttons`, () => {
    for (const mode of ["tracked", "plain"]) { const h = harness({ [option]: true }); h[mode](); h.tick(2000); assert.equal(h.navigations.length, 1); assert.equal(h.navigations[0].target, "current"); }
  });
}

test("closed or unnavigable reserved window does not leave navigation stuck", () => {
  const closed = harness(); closed.tracked(); closed.popup.closed = true; closed.events[0].eventCallback(); assert.equal(closed.navigations[0].target, "current");
  const failed = harness({ navigationThrows: true }); failed.tracked(); failed.events[0].eventCallback(); failed.tick(3000);
  assert.equal(failed.navigations.length, 1); assert.equal(failed.navigations[0].target, "current"); assert.equal(failed.closedCount, 1);
});

test("opener failure preserves the reserved window; server use has no effects", () => {
  const h = harness({ openerThrows: true }); h.tracked(); h.tick(2000); assert.equal(h.navigations[0].target, "popup");
  const server = harness({ server: true }); server.plain(); server.tracked(); assert.equal(server.opens.length, 0); assert.equal(server.events.length, 0);
});

for (const target of ["text", "svg", "path"]) {
  test(`dedicated client link ${target} target: shared handler opens/tracks once`, () => {
    const h = harness(); const Link = h.load("components/CountryApplyLink.tsx").default;
    const element = h.render(Link, { href, children: "اطلب الآن", className: "unchanged" });
    const a = h.anchor(element); assert.equal(a.type, "a"); assert.equal(a.props.href, href); assert.equal(a.props.className, "unchanged");
    assert.equal(h.click(element, target).defaultPrevented, true);
    h.tick(2000); assert.equal(h.events.length, 1); assert.equal(h.opens.length, 1); assert.equal(h.navigations.length, 1);
  });
}

test("dedicated page explicitly enables tracked cards; homepage does not", () => {
  const h = harness(); const section = h.load("components/Sections.tsx").CountriesSection;
  const page = h.render(h.load("app/countries/page.tsx").default, {});
  const home = h.render(h.load("app/page.tsx").default, {});
  assert.equal(nodes(page).find(node => node.type === section).props.trackApplyConversion, true);
  assert.equal(nodes(home).find(node => node.type === section).props.trackApplyConversion, undefined);
  assert.equal(h.events.length, 0);
});

test("all dedicated country cards preserve nationality messages, but emit no nationality", () => {
  const h = harness(); const Link = h.load("components/CountryApplyLink.tsx").default;
  const section = h.render(h.load("components/Sections.tsx").CountriesSection, { compact: true, trackApplyConversion: true });
  const cards = nodes(section).filter(node => node.type === Link);
  const countries = h.load("lib/data.ts").countries; assert.equal(cards.length, countries.length);
  for (const [index, card] of cards.entries()) {
    const message = `مرحبًا، أريد طلب استقدام\nالجنسية: ${countries[index].name}`;
    assert.equal(card.props.href, `https://wa.me/966558811538?text=${encodeURIComponent(message)}`);
    h.click(card); h.events.at(-1).eventCallback();
    assert.equal(h.navigations.at(-1).url, card.props.href); assert.doesNotMatch(JSON.stringify(h.events.at(-1)), /الجنسية|wa\.me|text=/);
  }
  assert.equal(h.events.length, countries.length); assert.equal(h.navigations.length, countries.length);
});

test("homepage country cards open normally with zero dedicated or generic conversion events", () => {
  const h = harness({ pathname: "/" }); const Link = h.load("components/WhatsAppLink.tsx").default;
  const section = h.render(h.load("components/Sections.tsx").CountriesSection, {});
  const cards = nodes(section).filter(node => node.type === Link); assert.ok(cards.length > 0);
  for (const card of cards) h.click(card);
  assert.equal(h.events.length, 0); assert.equal(h.gtagCalls.length, 0); assert.equal(h.navigations.length, cards.length);
});

test("navbar/mobile/hero/floating/support/contact are untracked, including on /countries", () => {
  const h = harness({ state: [true, false] }); const Link = h.load("components/WhatsAppLink.tsx").default;
  const section = h.load("components/Sections.tsx");
  const trees = [h.render(h.load("components/Navbar.tsx").default, {}), h.render(h.load("components/Hero.tsx").default, {}),
    h.render(h.load("components/FloatingWhatsApp.tsx").default, {}), h.render(section.ServicesGrid, {}), h.render(section.ContactCTA, {}), h.render(section.ContactBlock, {})];
  assert.equal(h.events.length, 0);
  const all = trees.flatMap(nodes); const links = all.filter(node => node.type === Link); assert.equal(links.length, 7);
  for (const link of links) h.click(link);
  for (const link of all.filter(node => ["NextLink", "PrimaryButton"].includes(node.type))) link.props.onClick?.({});
  assert.equal(h.events.length, 0); assert.equal(h.gtagCalls.length, 0); assert.equal(h.navigations.length, links.length);
});

const forms = {
  recruitment: { title: "مرحبًا، أريد طلب استقدام", labels: ["الجنسية", "ديانة العاملة", "العمر", "الخبرة", "الاسم", "رقم الجوال"] },
  transfer: { title: "مرحبًا، أريد طلب نقل خدمات", labels: ["المهنة", "الجنسية", "مدينة التواجد", "الاسم", "رقم الجوال"] },
  rental: { title: "مرحبًا، أريد طلب تأجير", labels: ["نوع التأجير", "نوع العمالة", "المدينة", "الاسم", "رقم الجوال"] }
};
for (const [type, expected] of Object.entries(forms)) {
  test(`${type} form: changing fields and pressing WhatsApp never track; message stays exact`, () => {
    const h = harness({ pathname: `/request/${type}` }); const Form = h.load("components/RequestForm.tsx").default;
    let tree = h.render(Form, { type }); const labels = nodes(tree).filter(node => node.type === "label");
    assert.equal(labels.length, expected.labels.length);
    const values = labels.map((label, index) => {
      const field = nodes(label).find(node => ["input", "select"].includes(node.type));
      const value = field.type === "select" ? nodes(field).find(node => node.type === "option" && node.props.value)?.props.value : `PRIVATE_FIELD_${index}`;
      field.props.onChange({ target: { value } }); return value;
    });
    tree = h.render(Form, { type }); assert.equal(h.events.length, 0);
    const button = nodes(tree).find(node => node.type === "button"); assert.equal(button.props.type, "button"); h.click(button);
    const message = [expected.title, ...expected.labels.map((label, index) => `${label}: ${values[index]}`)].join("\n");
    assert.deepEqual(h.navigations, [{ target: "popup", url: `https://wa.me/966558811538?text=${encodeURIComponent(message)}`, time: 0 }]);
    assert.equal(h.events.length, 0); assert.equal(h.gtagCalls.length, 0); assert.equal(h.timers.size, 0);
  });
}

test("subsequent route changes/clicks use the current exact path and do not globally suppress clicks", () => {
  const h = harness(); h.tracked(); h.events[0].eventCallback(); h.window.location.pathname = "/"; h.tracked();
  h.window.location.pathname = "/countries"; h.tracked(); h.events[1].eventCallback();
  assert.equal(h.events.length, 2); assert.equal(h.navigations.length, 3); assert.equal(h.opens.length, 3);
});

test("page-load bootstrap stays single, has no broad marker/event and keeps base tag pending Preview verification", () => {
  const source = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");
  const inline = source.match(/<Script id="google-tag-manager"[^>]*>\s*\{`([\s\S]*?)`\}/)[1];
  const earlier = { keep: true }; const window = { dataLayer: [earlier] }; let inserted = 0;
  vm.runInNewContext(inline, { window, document: { getElementsByTagName: () => [{ parentNode: { insertBefore() { inserted++; } } }], createElement: () => ({}) }, Date });
  assert.equal(inserted, 1); assert.equal(window.dataLayer[0], earlier);
  assert.equal(window.dataLayer.filter(event => event.event === "countries_apply_click").length, 0);
  assert.equal((source.match(/id="google-tag-manager"/g) || []).length, 1);
  assert.match(source, /gtag\('config', 'AW-979152763'\)/);
  const files = ["lib/whatsapp.ts", "components/WhatsAppLink.tsx", "components/CountryApplyLink.tsx", "components/RequestForm.tsx", "components/Sections.tsx", "app/layout.tsx"];
  for (const file of files) assert.doesNotMatch(fs.readFileSync(path.join(root, file), "utf8"), /whatsapp_click|whatsapp_v2|tracking_schema|jn_ZCNyjmsEcEPve8tID|gtag\(["']event["'],\s*["']conversion/);
  assert.equal(fs.existsSync(path.join(root, "lib/whatsappConversion.ts")), false);
});
