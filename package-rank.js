#!/usr/bin/env node
const https = require('https');
const http = require('http');
const util = require('util');
const url = require('url');
const os = require('os');
const zlib = require('zlib');
const stream = require('stream');
'use strict';
const {Writable:g} = stream;
function m() {
  const {usage:a = {}, description:b, line:c, w:e} = {description:"Shows the package rank in the NPM search using npms.io API.", w:"package-rank documentary -s documentation", line:"package-rank PACKAGE_NAME -s SEACH_QUERY [-vh]", usage:{"--search, -s":"The search query to check.", "--version, -v":"Show the version.", "--help, -h":"Display help."}};
  var d = Object.keys(a);
  const f = Object.values(a), [h] = d.reduce(([b = 0, c = 0], d) => {
    const e = a[d].split("\n").reduce((a, b) => b.length > a ? b.length : a, 0);
    e > c && (c = e);
    d.length > b && (b = d.length);
    return [b, c];
  }, []), k = (a, b) => {
    b = " ".repeat(b - a.length);
    return `${a}${b}`;
  };
  d = d.reduce((a, b, c) => {
    c = f[c].split("\n");
    b = k(b, h);
    const [d, ...e] = c;
    b = `${b}\t${d}`;
    const p = k("", h);
    c = e.map((a) => `${p}\t${a}`);
    return [...a, b, ...c];
  }, []).map((a) => `\t${a}`);
  const l = [b, `  ${c || ""}`].filter((a) => a ? a.trim() : a).join("\n\n");
  d = `${l ? `${l}\n` : ""}
  ${d.join("\n")}
  `;
  return e ? `${d}
  Example:
    ${e}
  ` : d;
}
;const {request:u} = https;
const {request:y} = http;
const {debuglog:z} = util;
var A = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, B = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:F} = os;
const G = /\s+at.*(?:\(|\s)(.*)\)?/, H = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, I = F();
var J = (a, b = {}) => {
  const {J:c = !1, H:e = ["pirates"]} = b;
  b = e.join("|");
  const d = new RegExp(H.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(G);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !d.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => c ? a.replace(G, (a, b) => a.replace(b, b.replace(I, "~"))) : a).join("\n");
};
function K(a, b, c = !1) {
  return function(e) {
    var d = B(arguments), {stack:f} = Error();
    const h = A(f, 2, !0), k = (f = e instanceof Error) ? e.message : e;
    d = [`Error: ${k}`, ...null !== d && a === d || c ? [b] : [h, b]].join("\n");
    d = J(d);
    return Object.assign(f ? e : Error(), {message:k, stack:d});
  };
}
J && J.a && (J = J.default);
function L(a) {
  var {stack:b} = Error();
  const c = B(arguments);
  b = A(b, 2 + (a ? 1 : 0));
  return K(c, b, a);
}
;const {parse:M} = url;
var N = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
L && L.a && (L = L.default);
J && J.a && (J = J.default);
var O = class extends g {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.f && L(!0);
    a = (delete b.f, delete b.K, b);
    super(a);
    const {b:c, C:e} = a;
    this.a = [];
    this.u = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = J(a.stack);
          a.stack = b;
        }
        b(a);
      });
      e && N(this, e).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get i() {
    return this.u;
  }
}, P = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({i:a} = new O(Object.assign({}, {C:a}, b, {f:L(!0)})));
  return await a;
};
const {createGunzip:Q} = zlib;
L && L.a && (L = L.default);
var R = (a, b, c) => {
  c = void 0 === c ? {} : c;
  const {h:e, b:d, f = L(!0)} = c;
  let h, k, l, r, v = 0, w = 0;
  c = (new Promise((c, t) => {
    h = a(b, async(a) => {
      ({headers:k} = a);
      const {statusMessage:b, statusCode:f} = a;
      l = {statusMessage:b, statusCode:f};
      if (e) {
        a.destroy();
      } else {
        var h = "gzip" == a.headers["content-encoding"];
        a.on("data", (a) => v += a.byteLength);
        a = h ? a.pipe(Q()) : a;
        r = await P(a, {b:d});
        w = r.length;
      }
      c();
    }).on("error", (a) => {
      a = f(a);
      t(a);
    });
  })).then(() => Object.assign({}, {body:r, headers:k}, l, {A:v, byteLength:w, s:null}));
  return {B:h, i:c};
};
L && L.a && (L = L.default);
var aa = (a = {}) => Object.keys(a).reduce((b, c) => {
  const e = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(e)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), ba = async(a, b, {data:c, h:e, b:d, f = L(!0)}) => {
  const {B:h, i:k} = R(a, b, {h:e, b:d, f});
  h.end(c);
  a = await k;
  if (a.headers["content-type"].startsWith("application/json")) {
    try {
      a.s = JSON.parse(a.body);
    } catch (l) {
      throw f = f(l), f.response = a.body, f;
    }
  }
  return a;
};
L && L.a && (L = L.default);
const ca = z("aqt");
var S = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:e = "json", headers:d = {"User-Agent":"Mozilla/5.0 (Node.js) aqt/1.1.5"}, g:f = !0, b:h = !1, method:k = "POST", h:l = !1} = b;
  b = L(!0);
  const {hostname:r, protocol:v, port:w, path:x} = M(a), t = "https:" === v ? u : y, p = {hostname:r, port:w, path:x, headers:Object.assign({}, d)};
  if (c) {
    var q = e;
    var n = c;
    switch(q) {
      case "json":
        n = JSON.stringify(n);
        q = "application/json";
        break;
      case "form":
        n = aa(n), q = "application/x-www-form-urlencoded";
    }
    n = {data:n, contentType:q};
    ({data:q} = n);
    ({contentType:n} = n);
    p.method = k;
    p.headers["Content-Type"] = n;
    p.headers["Content-Length"] = Buffer.byteLength(q);
  }
  f && (p.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:X, headers:Y, byteLength:C, statusCode:da, statusMessage:ea, A:D, s:E} = await ba(t, p, {data:q, h:l, b:h, f:b});
  ca("%s %s B%s", a, C, `${C != D ? ` (raw ${D} B)` : ""}`);
  return {body:E ? E : X, headers:Y, statusCode:da, statusMessage:ea};
};
async function fa(a, b, c) {
  c = void 0 === c ? {} : c;
  b = a.host ? `${a.host}${b}` : b;
  var e = a.headers;
  var d = c;
  c = a.l;
  var f = Object.assign({}, d);
  d = void 0 === d.headers ? {} : d.headers;
  f = (delete f.headers, f);
  e = Object.assign({}, f, {headers:Object.assign({}, e, d, {l:c})});
  b = await S(b, e);
  ({headers:e} = b);
  a.a = ha(a.a, e);
  return b;
}
class ia {
  constructor(a) {
    a = void 0 === a ? {} : a;
    const {host:b, headers:c = {}} = a;
    this.host = b;
    this.headers = c;
    this.a = {};
  }
  async o(a, b) {
    b = void 0 === b ? {} : b;
    ({body:a} = await fa(this, a, b));
    return a;
  }
  get l() {
    return ja(this.a);
  }
}
const ja = (a) => Object.keys(a).reduce((b, c) => [...b, `${c}=${a[c]}`], []).join("; "), ha = (a, b) => {
  b = ka(b);
  const c = Object.assign({}, a, b);
  return Object.keys(c).reduce((a, b) => {
    const d = c[b];
    return d ? Object.assign({}, a, {[b]:d}) : a;
  }, {});
}, ka = (a) => {
  ({"set-cookie":a = []} = void 0 === a ? {} : a);
  return a.reduce((a, c) => {
    {
      const a = /^(.+?)=(.*?);/.exec(c);
      if (!a) {
        throw Error(`Could not extract a cookie from ${c}`);
      }
      const [, b, f] = a;
      c = {[b]:f};
    }
    return Object.assign({}, a, c);
  }, {});
};
const la = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:e, headers:d, method:f, g:h} = b;
  ({body:a} = await S(a, {data:c, type:e, headers:d, method:f, g:h}));
  return a;
}, ma = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:e, headers:d, method:f, g:h} = b;
  ({body:a} = await S(a, {data:c, type:e, headers:d, method:f, g:h}));
  return a;
}, na = async(a, b) => {
  b = Object.assign({}, b, {b:!0});
  ({body:a} = await S(a, b));
  return a;
};
const oa = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, pa = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
const T = (a, b, c, e, d) => {
  e = void 0 === e ? !1 : e;
  d = void 0 === d ? !1 : d;
  const f = new RegExp(`^-(${c}|-${b})`);
  b = a.findIndex((a) => f.test(a));
  if (-1 == b) {
    return {argv:a};
  }
  if (e) {
    return {value:!0, argv:[...a.slice(0, b), ...a.slice(b + 1)]};
  }
  e = b + 1;
  c = a[e];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:a};
  }
  d && (c = parseInt(c, 10));
  return {value:c, argv:[...a.slice(0, b), ...a.slice(e + 1)]};
}, qa = (a) => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const e = a[c];
    if (e.startsWith("-")) {
      break;
    }
    b.push(e);
  }
  return b;
};
var ra = {get F() {
  return S;
}, get default() {
  return la;
}, get G() {
  return na;
}, get o() {
  return ma;
}, get D() {
  return ia;
}};
const U = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = qa(b);
  b = b.slice(c.length);
  let e = !c.length;
  return Object.keys(a).reduce((b, f) => {
    var d = Object.assign({}, b);
    b = b.c;
    d = (delete d.c, d);
    if (0 == b.length && e) {
      return Object.assign({}, {c:b}, d);
    }
    const k = a[f];
    let l;
    if ("string" == typeof k) {
      ({value:l, argv:b} = T(b, f, k));
    } else {
      try {
        const {j:a, m:d, I:h, v:x, multiple:t} = k;
        x && t && c.length ? (l = c, e = !0) : x && c.length ? (l = c[0], e = !0) : {value:l, argv:b} = T(b, f, a, d, h);
      } catch (r) {
        return Object.assign({}, {c:b}, d);
      }
    }
    return void 0 === l ? Object.assign({}, {c:b}, d) : Object.assign({}, {c:b}, d, {[f]:l});
  }, {c:b});
}({"package":{v:!0}, search:{j:"s"}, version:{j:"v", m:!0}, help:{j:"h", m:!0}}), V = U["package"], W = U.search, sa = U.version;
U.help ? (console.log(m()), process.exit()) : sa && (console.log("0.0.0"), process.exit());
const Z = async(a, b, c = 0) => {
  var {results:e} = await ra.o(`https://api.npms.io/v2/search?q=${b}&size=250&from=${c}`);
  e = e.map(({"package":a}) => a).findIndex(({name:b}) => b == a);
  if (-1 != e) {
    return c + e;
  }
  c += 250;
  console.log(c);
  return await Z(a, b, c);
};
(async() => {
  try {
    if (!V) {
      throw Error("Specify package name.");
    }
    if (!W) {
      throw Error("Specify search query.");
    }
    var a = await Z(V, W);
    console.log("Found: %s", a);
  } catch (c) {
    if (process.env.DEBUG) {
      a = c.stack;
      var b = oa.red;
      a = b ? `\x1b[${b}m${a}\x1b[0m` : a;
      console.log(a);
    } else {
      a = c.message, a = (b = pa.red) ? `\x1b[${b}m${a}\x1b[0m` : a, console.log(a);
    }
  }
})();


//# sourceMappingURL=package-rank.js.map