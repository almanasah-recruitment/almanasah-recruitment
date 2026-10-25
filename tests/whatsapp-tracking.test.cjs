const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

// No browser, real Google code, network APIs, or real navigation run in this suite.
const root = path.resolve(__dirname, "..");
const href = "https://wa.me/966558811538?text=PRIVATE_MESSAGE";
const context = { ctaLocation: "header", serviceType: "general" };
const clean = (value) => JSON.parse(JSON.stringify(value));
const jsx = (type, props) => ({ type, props: props || {} });

function descendants(node) {
  if (Array.isArray(node)) return node.flatMap(descendants);
  if (!node || typeof node !== "object") return [];
  return [node, ...descendants(node.props?.children)];
}

function createHarness(options = {}) {
  const messages = [];
  const opens = [];
  const navigations = [];
  const directConversions = [];
  const timers = new Map();
  const state = options.state || [];
  let cursor = 0;
  let now = 0;
  let nextTimer = 1;
  let popupCloseCount = 0;
  const location = { pathname: "/contact", search: "?name=PRIVATE_NAME", hash: "#PRIVATE_HASH" };
  Object.defineProperty(location, "href", {
    set: (url) => navigations.push({ target: "current", url, time: now })
  });
  const popup = { closed: false, opener: "parent", location: {}, close() { popupCloseCount++; } };
  Object.defineProperty(popup.location, "href", {
    set(url) {
      if (options.navigationThrows) throw new Error("mock popup navigation blocked");
      navigations.push({ target: "popup", url, time: now });
    }
  });
  if (options.openerThrows) {
    Object.defineProperty(popup, "opener", { set() { throw new Error("mock opener blocked"); } });
  }
  const window = {
    location,
    open(...args) {
      opens.push({ args, time: now });
      if (options.openThrows) throw new Error("mock popup blocked");
      return options.popupBlocked ? null : popup;
    },
    setTimeout(fn, ms) { const id = nextTimer++; timers.set(id, { fn, due: now + ms }); return id; },
    clearTimeout(id) { timers.delete(id); },
    gtag(...args) { directConversions.push(args); throw new Error("Unexpected direct gtag call"); },
    addEventListener() { throw new Error("Unexpected global listener"); }
  };
  const layer = options.existingLayer || messages;
  layer.push = function (message) {
    if (options.pushThrows) throw new Error("mock dataLayer unavailable");
    Array.prototype.push.call(this, message);
    if (this !== messages) messages.push(message);
    if (options.synchronousCallback) message.eventCallback?.();
    return this.length;
  };
  if (!options.noLayer) window.dataLayer = layer;
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const source = fs.readFileSync(path.join(root, file), "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX }
    }).outputText;
    const exports = {};
    cache.set(file, exports);
    vm.runInNewContext(compiled, {
      exports,
      window: options.server ? undefined : window,
      require(specifier) {
        if (specifier === "react/jsx-runtime") return { jsx, jsxs: jsx, Fragment: "Fragment" };
        if (specifier === "react") return {
          useState(initial) {
            const index = cursor++;
            if (!(index in state)) state[index] = initial;
            return [state[index], (value) => { state[index] = typeof value === "function" ? value(state[index]) : value; }];
          },
          useEffect() {} // No browser effects run; this is a component-handler simulation.
        };
        if (specifier === "@/lib/whatsappConversion") return load("lib/whatsappConversion.ts");
        if (specifier === "@/lib/data") return load("lib/data.ts");
        if (specifier === "@/components/WhatsAppLink") return load("components/WhatsAppLink.tsx");
        if (specifier === "next/link") return { default: "NextLink" };
        return new Proxy({}, { get: (_, name) => name === "__esModule" ? true : String(name) });
      }
    }, { filename: file });
    return exports;
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
  function render(component, props) { cursor = 0; return component(props); }
  return {
    window, messages, opens, navigations, directConversions, timers, popup, load, tick, render,
    get popupCloseCount() { return popupCloseCount; },
    track: (url = href, trackingContext = context) => load("lib/whatsappConversion.ts").openWhatsAppWithTracking(url, trackingContext)
  };
}

function click(element, target = "text", alreadyPrevented = false) {
  const event = { target: { nodeName: target }, defaultPrevented: alreadyPrevented,
    preventDefault() { this.defaultPrevented = true; } };
  element.props.onClick(event);
  return event;
}

test("one interaction queues one complete, private GTM event without direct conversion", () => {
  const h = createHarness();
  h.track();
  assert.equal(h.messages.length, 1);
  assert.deepEqual(clean(h.messages[0]), {
    event: "whatsapp_click", tracking_schema: "whatsapp_v2", cta_location: "header",
    service_type: "general", page_path: "/contact", eventTimeout: 2000
  });
  assert.equal(typeof h.messages[0].eventCallback, "function");
  assert.equal(h.directConversions.length, 0);
  assert.equal(h.opens.length, 1);
  assert.equal(h.opens[0].time, 0);
  assert.equal(h.popup.opener, null);
  assert.equal(h.navigations.length, 0);
});

test("callback opens early, cancels fallback and ignores duplicate/late callbacks", () => {
  const h = createHarness();
  h.track();
  h.tick(150);
  h.messages[0].eventCallback();
  h.messages[0].eventCallback();
  h.tick(5000);
  h.messages[0].eventCallback();
  assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 150 }]);
  assert.equal(h.timers.size, 0);
});

test("synchronous GTM callback does not leave a stray fallback timer", () => {
  const h = createHarness({ synchronousCallback: true });
  h.track();
  assert.equal(h.navigations.length, 1);
  assert.equal(h.timers.size, 0);
  h.tick(5000);
  assert.equal(h.navigations.length, 1);
});

test("missing/blocked GTM opens by 2000ms, including a callback after timeout", () => {
  const h = createHarness();
  h.track();
  h.tick(1999);
  assert.equal(h.navigations.length, 0);
  h.tick(1);
  h.messages[0].eventCallback();
  assert.deepEqual(h.navigations, [{ target: "popup", url: href, time: 2000 }]);
  assert.equal(h.directConversions.length, 0);
});

test("absent dataLayer is initialized without requiring gtag", () => {
  const h = createHarness({ noLayer: true });
  delete h.window.gtag;
  h.track();
  assert.equal(h.window.dataLayer[0].event, "whatsapp_click");
  h.tick(2000);
  assert.equal(h.navigations.length, 1);
});

test("existing dataLayer and its earlier entries are preserved", () => {
  const sentinel = { existing: "keep" };
  const layer = [sentinel];
  const h = createHarness({ existingLayer: layer });
  h.track();
  assert.equal(h.window.dataLayer, layer);
  assert.equal(layer[0], sentinel);
  assert.equal(layer.length, 2);
});

test("dataLayer.push failure opens immediately with no alternate conversion", () => {
  const h = createHarness({ pushThrows: true });
  h.track();
  h.tick(5000);
  assert.equal(h.navigations.length, 1);
  assert.equal(h.navigations[0].time, 0);
  assert.equal(h.directConversions.length, 0);
  assert.equal(h.timers.size, 0);
});

for (const option of ["popupBlocked", "openThrows"]) {
  test(`${option}: current-window fallback remains available`, () => {
    const h = createHarness({ [option]: true });
    h.track();
    h.tick(2000);
    assert.deepEqual(h.navigations, [{ target: "current", url: href, time: 2000 }]);
  });
}

test("a popup closed before the callback falls back to the current window", () => {
  const h = createHarness();
  h.track();
  h.popup.closed = true;
  h.messages[0].eventCallback();
  assert.equal(h.navigations[0].target, "current");
  assert.equal(h.navigations.length, 1);
});

test("failed popup navigation closes it and uses the current window once", () => {
  const h = createHarness({ navigationThrows: true });
  h.track();
  h.messages[0].eventCallback();
  h.tick(5000);
  assert.equal(h.navigations[0].target, "current");
  assert.equal(h.navigations.length, 1);
  assert.equal(h.popupCloseCount, 1);
});

test("failure to change opener does not abandon the reserved popup", () => {
  const h = createHarness({ openerThrows: true });
  h.track();
  h.tick(2000);
  assert.equal(h.navigations[0].target, "popup");
});

test("server invocation has no side effects", () => {
  const h = createHarness({ server: true });
  h.track();
  assert.equal(h.messages.length, 0);
  assert.equal(h.opens.length, 0);
});

test("subsequent legitimate clicks keep current path/context and remain independent", () => {
  const h = createHarness();
  h.track();
  h.messages[0].eventCallback();
  h.window.location.pathname = "/request/rental";
  h.track(href, { ctaLocation: "request_form", serviceType: "rental" });
  h.messages[1].eventCallback();
  assert.equal(h.messages.length, 2);
  assert.equal(h.messages[0].page_path, "/contact");
  assert.equal(h.messages[1].page_path, "/request/rental");
  assert.equal(h.messages[1].cta_location, "request_form");
  assert.equal(h.messages[1].service_type, "rental");
  assert.equal(h.navigations.length, 2);
});

for (const target of ["text", "svg", "path"]) {
  test(`link handler simulation for ${target}: one event, one opening, no leaked DOM tracking props`, () => {
    const h = createHarness();
    const Link = h.load("components/WhatsAppLink.tsx").default;
    const anchor = h.render(Link, { href, ...context, children: "واتساب", className: "unchanged" });
    assert.equal(anchor.type, "a");
    assert.equal(anchor.props.href, href);
    assert.equal(anchor.props.ctaLocation, undefined);
    assert.equal(anchor.props.serviceType, undefined);
    assert.equal(h.messages.length, 0);
    const event = click(anchor, target);
    assert.equal(event.defaultPrevented, true);
    h.tick(2000);
    assert.equal(h.messages.length, 1);
    assert.equal(h.navigations.length, 1);
  });
}

test("a caller that prevents default suppresses the shared handler", () => {
  const h = createHarness();
  const Link = h.load("components/WhatsAppLink.tsx").default;
  click(h.render(Link, { href, ...context, onClick: (event) => event.preventDefault() }));
  assert.equal(h.messages.length, 0);
  assert.equal(h.opens.length, 0);
});

const formCases = {
  recruitment: { title: "مرحبًا، أريد طلب استقدام", labels: ["الجنسية", "ديانة العاملة", "العمر", "الخبرة", "الاسم", "رقم الجوال"] },
  transfer: { title: "مرحبًا، أريد طلب نقل خدمات", labels: ["المهنة", "الجنسية", "مدينة التواجد", "الاسم", "رقم الجوال"] },
  rental: { title: "مرحبًا، أريد طلب تأجير", labels: ["نوع التأجير", "نوع العمالة", "المدينة", "الاسم", "رقم الجوال"] }
};

for (const [type, expected] of Object.entries(formCases)) {
  test(`${type} form: unchanged message, one typed event, field edits emit nothing and contain no PII`, () => {
    const h = createHarness();
    h.window.location.pathname = `/request/${type}`;
    const Form = h.load("components/RequestForm.tsx").default;
    let tree = h.render(Form, { type });
    assert.equal(h.messages.length, 0);
    const labels = descendants(tree).filter((node) => node.type === "label");
    assert.equal(labels.length, expected.labels.length);
    const values = labels.map((label, index) => {
      const field = descendants(label).find((node) => ["input", "select"].includes(node.type));
      const value = field.type === "select"
        ? descendants(field).find((node) => node.type === "option" && node.props.value)?.props.value
        : `PRIVATE_FIELD_${index}`;
      field.props.onChange({ target: { value } });
      return value;
    });
    assert.equal(h.messages.length, 0);
    tree = h.render(Form, { type });
    const button = descendants(tree).find((node) => node.type === "button");
    assert.equal(button.props.type, "button");
    click(button);
    assert.equal(h.messages.length, 1);
    const event = h.messages[0];
    assert.equal(event.cta_location, "request_form");
    assert.equal(event.service_type, type);
    const message = [expected.title, ...expected.labels.map((label, index) => `${label}: ${values[index]}`)].join("\n");
    h.tick(2000);
    assert.equal(h.navigations[0].url, `https://wa.me/966558811538?text=${encodeURIComponent(message)}`);
    assert.equal(h.directConversions.length, 0);
    assert.deepEqual(Object.keys(event).sort(), ["event", "tracking_schema", "cta_location", "service_type", "page_path", "eventCallback", "eventTimeout"].sort());
    assert.doesNotMatch(JSON.stringify(event), /PRIVATE_|wa\.me|text=|الجنسية|ديانة|رقم الجوال/);
  });
}

test("all actual link locations have fixed context; internal/tel/mail/footer elements stay untracked", () => {
  const h = createHarness({ state: [true, false] });
  const WhatsAppLink = h.load("components/WhatsAppLink.tsx").default;
  const sections = h.load("components/Sections.tsx");
  const trees = [
    h.render(h.load("components/Navbar.tsx").default, {}),
    h.render(h.load("components/Hero.tsx").default, {}),
    h.render(h.load("components/FloatingWhatsApp.tsx").default, {}),
    h.render(sections.ServicesGrid, {}), h.render(sections.CountriesSection, {}),
    h.render(sections.ContactCTA, {}), h.render(sections.ContactBlock, {}),
    h.render(h.load("components/Footer.tsx").default, {})
  ];
  assert.equal(h.messages.length, 0, "rendering emits nothing");
  const nodes = trees.flatMap(descendants);
  const links = nodes.filter((node) => node.type === WhatsAppLink);
  assert.deepEqual([...new Set(links.map((node) => node.props.ctaLocation))].sort(),
    ["header", "mobile_menu", "hero", "floating", "support", "country_card", "contact_cta", "contact_page"].sort());
  for (const element of links) {
    click(h.render(WhatsAppLink, element.props), "svg");
    h.messages.at(-1).eventCallback();
    const event = h.messages.at(-1);
    assert.equal(event.service_type, element.props.ctaLocation === "country_card" ? "recruitment" : element.props.ctaLocation === "support" ? "support" : "general");
    assert.doesNotMatch(JSON.stringify(event), /wa\.me|text=|الجنسية/);
  }
  assert.equal(h.messages.length, links.length);
  assert.equal(h.navigations.length, links.length);
  const internalLinks = nodes.filter((node) => ["NextLink", "PrimaryButton"].includes(node.type));
  assert.ok(internalLinks.some((node) => node.props.href === "/request/recruitment"));
  assert.ok(internalLinks.some((node) => node.props.href?.startsWith("tel:")));
  assert.ok(internalLinks.some((node) => node.props.href?.startsWith("mailto:")));
  assert.ok(internalLinks.some((node) => node.props.href === "#"));
  for (const node of internalLinks) node.props.onClick?.({});
  assert.equal(h.messages.length, links.length, "internal links and footer controls emit no WhatsApp event");
});

test("schema is queued before the sole GTM bootstrap and preserves existing dataLayer", () => {
  const layout = fs.readFileSync(path.join(root, "app/layout.tsx"), "utf8");
  const inline = layout.match(/<Script id="google-tag-manager"[^>]*>\s*\{`([\s\S]*?)`\}/)[1];
  const oldEntry = { existing: true };
  const window = { dataLayer: [oldEntry] };
  const original = window.dataLayer;
  let inserted = 0;
  const first = { parentNode: { insertBefore(node) {
    inserted++;
    assert.equal(window.dataLayer[1].tracking_schema, "whatsapp_v2");
    assert.equal(window.dataLayer[2].event, "gtm.js");
    assert.equal(node.src, "https://www.googletagmanager.com/gtm.js?id=GTM-NSR8FVTJ");
    assert.equal(node.async, true);
  } } };
  vm.runInNewContext(inline, { window, document: { getElementsByTagName: () => [first], createElement: () => ({}) }, Date });
  assert.equal(window.dataLayer, original);
  assert.equal(window.dataLayer[0], oldEntry);
  assert.equal(inserted, 1);
  assert.equal(window.dataLayer.filter((entry) => entry.event === "whatsapp_click").length, 0);
  assert.equal((layout.match(/id="google-tag-manager"/g) || []).length, 1);
  assert.match(layout, /gtag\('config', 'AW-979152763'\)/);
  assert.match(layout, /<body>\s*<noscript>/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, "lib/whatsappConversion.ts"), "utf8"), /send_to|jn_ZCNyjmsEcEPve8tID|\.gtag\(/);
});
