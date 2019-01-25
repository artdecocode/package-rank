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
var m = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : Number.Infinity);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, u = (a) => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:y} = os;
const z = /\s+at.*(?:\(|\s)(.*)\)?/, A = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, E = y();
var F = (a, b = {}) => {
  const {I:c = !1, G:d = ["pirates"]} = b;
  b = d.join("|");
  const e = new RegExp(A.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter((a) => {
    a = a.match(z);
    if (null === a || !a[1]) {
      return !0;
    }
    a = a[1];
    return a.includes(".app/Contents/Resources/electron.asar") || a.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(a);
  }).filter((a) => "" !== a.trim()).map((a) => c ? a.replace(z, (a, b) => a.replace(b, b.replace(E, "~"))) : a).join("\n");
};
function G(a, b, c = !1) {
  return function(d) {
    var e = u(arguments), {stack:f} = Error();
    const h = m(f, 2, !0), k = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${k}`, ...null !== e && a === e || c ? [b] : [h, b]].join("\n");
    e = F(e);
    return Object.assign(f ? d : Error(), {message:k, stack:e});
  };
}
F && F.a && (F = F.default);
function H(a) {
  var {stack:b} = Error();
  const c = u(arguments);
  b = m(b, 2 + (a ? 1 : 0));
  return G(c, b, a);
}
;var I = (a, b) => {
  b.once("error", (b) => {
    a.emit("error", b);
  });
  return b;
};
H && H.a && (H = H.default);
F && F.a && (F = F.default);
var J = class extends g {
  constructor(a) {
    a = void 0 === a ? {} : a;
    var b = Object.assign({}, a);
    void 0 === a.f && H(!0);
    a = (delete b.f, delete b.J, b);
    super(a);
    const {b:c, w:d} = a;
    this.a = [];
    this.o = new Promise((a, b) => {
      this.on("finish", () => {
        let b;
        c ? b = Buffer.concat(this.a) : b = this.a.join("");
        a(b);
        this.a = [];
      });
      this.once("error", (a) => {
        if (-1 != a.stack.indexOf("\n")) {
          const b = F(a.stack);
          a.stack = b;
        }
        b(a);
      });
      d && I(this, d).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get i() {
    return this.o;
  }
}, K = async(a, b) => {
  b = void 0 === b ? {} : b;
  ({i:a} = new J(Object.assign({}, {w:a}, b, {f:H(!0)})));
  return await a;
};
const {createGunzip:L} = zlib;
H && H.a && (H = H.default);
var M = (a, b, c) => {
  c = void 0 === c ? {} : c;
  const {h:d, b:e, f = H(!0)} = c;
  let h, k, l, q, v = 0, w = 0;
  c = (new Promise((c, r) => {
    h = a(b, async(a) => {
      ({headers:k} = a);
      const {statusMessage:b, statusCode:f} = a;
      l = {statusMessage:b, statusCode:f};
      if (d) {
        a.destroy();
      } else {
        var h = "gzip" == a.headers["content-encoding"];
        a.on("data", (a) => v += a.byteLength);
        a = h ? a.pipe(L()) : a;
        q = await K(a, {b:e});
        w = q.length;
      }
      c();
    }).on("error", (a) => {
      a = f(a);
      r(a);
    });
  })).then(() => Object.assign({}, {body:q, headers:k}, l, {u:v, byteLength:w, m:null}));
  return {v:h, i:c};
};
H && H.a && (H = H.default);
var N = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), O = async(a, b, {data:c, h:d, b:e, f = H(!0)}) => {
  const {v:h, i:k} = M(a, b, {h:d, b:e, f});
  h.end(c);
  a = await k;
  if (a.headers["content-type"].startsWith("application/json")) {
    try {
      a.m = JSON.parse(a.body);
    } catch (l) {
      throw f = f(l), f.response = a.body, f;
    }
  }
  return a;
};
const {request:P} = https;
const {request:Q} = http;
const {debuglog:R} = util;
const {parse:aa} = url;
H && H.a && (H = H.default);
const ba = R("aqt");
var U = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:d = "json", headers:e = {"User-Agent":"Mozilla/5.0 (Node.js) aqt/1.1.5"}, g:f = !0, b:h = !1, method:k = "POST", h:l = !1} = b;
  b = H(!0);
  const {hostname:q, protocol:v, port:w, path:x} = aa(a), r = "https:" === v ? P : Q, t = {hostname:q, port:w, path:x, headers:Object.assign({}, e)};
  if (c) {
    var p = d;
    var n = c;
    switch(p) {
      case "json":
        n = JSON.stringify(n);
        p = "application/json";
        break;
      case "form":
        n = N(n), p = "application/x-www-form-urlencoded";
    }
    n = {data:n, contentType:p};
    ({data:p} = n);
    ({contentType:n} = n);
    t.method = k;
    t.headers["Content-Type"] = n;
    t.headers["Content-Length"] = Buffer.byteLength(p);
  }
  f && (t.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:S, headers:T, byteLength:B, statusCode:ca, statusMessage:da, u:C, m:D} = await O(r, t, {data:p, h:l, b:h, f:b});
  ba("%s %s B%s", a, B, `${B != C ? ` (raw ${C} B)` : ""}`);
  return {body:D ? D : S, headers:T, statusCode:ca, statusMessage:da};
};
async function ea(a, b, c) {
  c = void 0 === c ? {} : c;
  b = a.host ? `${a.host}${b}` : b;
  var d = a.headers;
  var e = c;
  c = a.j;
  var f = Object.assign({}, e);
  e = void 0 === e.headers ? {} : e.headers;
  f = (delete f.headers, f);
  d = Object.assign({}, f, {headers:Object.assign({}, d, e, {j:c})});
  b = await U(b, d);
  ({headers:d} = b);
  a.a = fa(a.a, d);
  return b;
}
class ha {
  constructor(a) {
    a = void 0 === a ? {} : a;
    const {host:b, headers:c = {}} = a;
    this.host = b;
    this.headers = c;
    this.a = {};
  }
  async l(a, b) {
    b = void 0 === b ? {} : b;
    ({body:a} = await ea(this, a, b));
    return a;
  }
  get j() {
    return ia(this.a);
  }
}
const ia = (a) => Object.keys(a).reduce((b, c) => [...b, `${c}=${a[c]}`], []).join("; "), fa = (a, b) => {
  b = ja(b);
  const c = Object.assign({}, a, b);
  return Object.keys(c).reduce((a, b) => {
    const d = c[b];
    return d ? Object.assign({}, a, {[b]:d}) : a;
  }, {});
}, ja = (a) => {
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
const ka = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:d, headers:e, method:f, g:h} = b;
  ({body:a} = await U(a, {data:c, type:d, headers:e, method:f, g:h}));
  return a;
}, la = async(a, b) => {
  b = void 0 === b ? {} : b;
  const {data:c, type:d, headers:e, method:f, g:h} = b;
  ({body:a} = await U(a, {data:c, type:d, headers:e, method:f, g:h}));
  return a;
}, ma = async(a, b) => {
  b = Object.assign({}, b, {b:!0});
  ({body:a} = await U(a, b));
  return a;
};
const na = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, oa = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
const V = (a, b, c, d, e) => {
  d = void 0 === d ? !1 : d;
  e = void 0 === e ? !1 : e;
  const f = new RegExp(`^-(${c}|-${b})`);
  b = a.findIndex((a) => f.test(a));
  if (-1 == b) {
    return {argv:a};
  }
  if (d) {
    return {value:!0, argv:[...a.slice(0, b), ...a.slice(b + 1)]};
  }
  d = b + 1;
  c = a[d];
  if (!c || "string" == typeof c && c.startsWith("--")) {
    return {argv:a};
  }
  e && (c = parseInt(c, 10));
  return {value:c, argv:[...a.slice(0, b), ...a.slice(d + 1)]};
}, pa = (a) => {
  const b = [];
  for (let c = 0; c < a.length; c++) {
    const d = a[c];
    if (d.startsWith("-")) {
      break;
    }
    b.push(d);
  }
  return b;
};
var qa = {get C() {
  return U;
}, get default() {
  return ka;
}, get F() {
  return ma;
}, get l() {
  return la;
}, get B() {
  return ha;
}};
const W = function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? process.argv : b;
  [, , ...b] = b;
  const c = pa(b);
  b = b.slice(c.length);
  let d = !c.length;
  return Object.keys(a).reduce((b, f) => {
    var e = Object.assign({}, b);
    b = b.c;
    e = (delete e.c, e);
    if (0 == b.length && d) {
      return Object.assign({}, {c:b}, e);
    }
    const k = a[f];
    let l;
    if ("string" == typeof k) {
      ({value:l, argv:b} = V(b, f, k));
    } else {
      try {
        const {A:a, D:e, H:h, s:x, multiple:r} = k;
        x && r && c.length ? (l = c, d = !0) : x && c.length ? (l = c[0], d = !0) : {value:l, argv:b} = V(b, f, a, e, h);
      } catch (q) {
        return Object.assign({}, {c:b}, e);
      }
    }
    return void 0 === l ? Object.assign({}, {c:b}, e) : Object.assign({}, {c:b}, e, {[f]:l});
  }, {c:b});
}({"package":{s:!0}, search:{A:"s"}}), X = W["package"], Y = W.search, Z = async(a, b, c = 0) => {
  var {results:d} = await qa.l(`https://api.npms.io/v2/search?q=${b}&size=250&from=${c}`);
  d = d.map(({"package":a}) => a).findIndex(({name:b}) => b == a);
  if (-1 != d) {
    return c + d;
  }
  c += 250;
  console.log(c);
  return await Z(a, b, c);
};
(async() => {
  try {
    if (!X) {
      throw Error("Specify package name.");
    }
    if (!Y) {
      throw Error("Specify search query.");
    }
    var a = await Z(X, Y);
    console.log("Found: %s", a);
  } catch (c) {
    if (process.env.DEBUG) {
      a = c.stack;
      var b = na.red;
      a = b ? `\x1b[${b}m${a}\x1b[0m` : a;
      console.log(a);
    } else {
      a = c.message, a = (b = oa.red) ? `\x1b[${b}m${a}\x1b[0m` : a, console.log(a);
    }
  }
})();


//# sourceMappingURL=package-rank.js.map