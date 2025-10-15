class ie {
  #e;
  constructor(i) {
    this.#e = i;
  }
  encode(i) {
    const b = new TextEncoder().encode(this.#e);
    return i == "\0" ? b : (this.#e = b, this);
  }
  octal(i) {
    const b = Number.prototype.toString.call(this.#e, 8);
    return i == "\0" ? b : (this.#e = b, this);
  }
  pad(i, b) {
    const h = String.prototype.padStart.call(this.#e, i - 1, "0") + "\0";
    return b == "\0" ? h : (this.#e = h, this);
  }
}
function H(y) {
  return new ie(y);
}
function re(y) {
  return y && y.__esModule && Object.prototype.hasOwnProperty.call(y, "default") ? y.default : y;
}
var z, I;
function ne() {
  if (I) return z;
  I = 1;
  const y = (i) => i.call.bind(i);
  return z = {
    FunctionPrototypeBind: y(Function.prototype.bind),
    StringPrototypeCharCodeAt: y(String.prototype.charCodeAt),
    StringPrototypeIndexOf: y(String.prototype.indexOf),
    StringPrototypeLastIndexOf: y(String.prototype.lastIndexOf),
    StringPrototypeReplace: y(String.prototype.replace),
    StringPrototypeSlice: y(String.prototype.slice),
    StringPrototypeToLowerCase: y(String.prototype.toLowerCase)
  }, z;
}
var j, F;
function se() {
  if (F) return j;
  F = 1;
  const y = /\b(?:Windows|Win64|Win32)\b/i, i = {};
  return j = { process: {
    get platform() {
      if (typeof process == "object") {
        const h = process?.platform;
        if (typeof h == "string")
          return h;
      }
      if (typeof navigator < "u") {
        const h = navigator?.userAgent;
        if (typeof h == "string" && y.test(h))
          return "win32";
      }
      return "linux";
    },
    get env() {
      if (typeof process == "object") {
        const h = process?.env;
        if (typeof h == "object" && h !== null)
          return h;
      }
      return i;
    },
    cwd() {
      return typeof process == "object" && typeof process?.cwd == "function" ? process.cwd() : this.platform === "win32" ? "C:\\" : "/";
    }
  } }, j;
}
var D, M;
function le() {
  return M || (M = 1, D = {
    CHAR_UPPERCASE_A: 65,
    CHAR_LOWERCASE_A: 97,
    CHAR_UPPERCASE_Z: 90,
    CHAR_LOWERCASE_Z: 122,
    CHAR_DOT: 46,
    CHAR_FORWARD_SLASH: 47,
    CHAR_BACKWARD_SLASH: 92,
    CHAR_COLON: 58,
    CHAR_QUESTION_MARK: 63
  }), D;
}
var W, B;
function oe() {
  return B || (B = 1, W = {
    validateString: (b, h) => {
      if (typeof b != "string")
        throw new TypeError(`Expected a string for ${h}`);
    },
    validateObject: (b, h) => {
      if (typeof b != "object" || b === null)
        throw new TypeError(`Expected an object for ${h}`);
    }
  }), W;
}
var U, K;
function fe() {
  if (K) return U;
  K = 1;
  const {
    FunctionPrototypeBind: y,
    StringPrototypeCharCodeAt: i,
    StringPrototypeIndexOf: b,
    StringPrototypeLastIndexOf: h,
    StringPrototypeReplace: $,
    StringPrototypeSlice: d,
    StringPrototypeToLowerCase: _
  } = ne(), {
    process: E
  } = se(), {
    CHAR_UPPERCASE_A: Q,
    CHAR_LOWERCASE_A: V,
    CHAR_UPPERCASE_Z: G,
    CHAR_LOWERCASE_Z: J,
    CHAR_DOT: P,
    CHAR_FORWARD_SLASH: w,
    CHAR_BACKWARD_SLASH: v,
    CHAR_COLON: p,
    CHAR_QUESTION_MARK: X
  } = le(), {
    validateObject: Y,
    validateString: S
  } = oe(), N = E.platform === "win32";
  function g(e) {
    return e === w || e === v;
  }
  function x(e) {
    return e === w;
  }
  function k(e) {
    return e >= Q && e <= G || e >= V && e <= J;
  }
  function O(e, t, n, o) {
    let l = "", s = 0, f = -1, r = 0, c = 0;
    for (let u = 0; u <= e.length; ++u) {
      if (u < e.length)
        c = String.prototype.charCodeAt.call(e, u);
      else {
        if (o(c))
          break;
        c = w;
      }
      if (o(c)) {
        if (!(f === u - 1 || r === 1)) if (r === 2) {
          if (l.length < 2 || s !== 2 || i(l, l.length - 1) !== P || i(l, l.length - 2) !== P) {
            if (l.length > 2) {
              const A = h(l, n);
              A === -1 ? (l = "", s = 0) : (l = d(l, 0, A), s = l.length - 1 - h(l, n)), f = u, r = 0;
              continue;
            } else if (l.length !== 0) {
              l = "", s = 0, f = u, r = 0;
              continue;
            }
          }
          t && (l += l.length > 0 ? `${n}..` : "..", s = 2);
        } else
          l.length > 0 ? l += `${n}${d(e, f + 1, u)}` : l = d(e, f + 1, u), s = u - f - 1;
        f = u, r = 0;
      } else c === P && r !== -1 ? ++r : r = -1;
    }
    return l;
  }
  function ee(e) {
    return e ? `${e[0] === "." ? "" : "."}${e}` : "";
  }
  function T(e, t) {
    Y(t, "pathObject");
    const n = t.dir || t.root, o = t.base || `${t.name || ""}${ee(t.ext)}`;
    return n ? n === t.root ? `${n}${o}` : `${n}${e}${o}` : o;
  }
  const C = {
    /**
     * path.resolve([from ...], to)
     * @param {...string} args
     * @returns {string}
     */
    resolve(...e) {
      let t = "", n = "", o = !1;
      for (let l = e.length - 1; l >= -1; l--) {
        let s;
        if (l >= 0) {
          if (s = e[l], S(s, `paths[${l}]`), s.length === 0)
            continue;
        } else t.length === 0 ? s = E.cwd() : (s = E.env[`=${t}`] || E.cwd(), (s === void 0 || _(d(s, 0, 2)) !== _(t) && i(s, 2) === v) && (s = `${t}\\`));
        const f = s.length;
        let r = 0, c = "", u = !1;
        const A = i(s, 0);
        if (f === 1)
          g(A) && (r = 1, u = !0);
        else if (g(A))
          if (u = !0, g(i(s, 1))) {
            let a = 2, m = a;
            for (; a < f && !g(i(s, a)); )
              a++;
            if (a < f && a !== m) {
              const L = d(s, m, a);
              for (m = a; a < f && g(i(s, a)); )
                a++;
              if (a < f && a !== m) {
                for (m = a; a < f && !g(i(s, a)); )
                  a++;
                (a === f || a !== m) && (c = `\\\\${L}\\${d(s, m, a)}`, r = a);
              }
            }
          } else
            r = 1;
        else k(A) && i(s, 1) === p && (c = d(s, 0, 2), r = 2, f > 2 && g(i(s, 2)) && (u = !0, r = 3));
        if (c.length > 0)
          if (t.length > 0) {
            if (_(c) !== _(t))
              continue;
          } else
            t = c;
        if (o) {
          if (t.length > 0)
            break;
        } else if (n = `${d(s, r)}\\${n}`, o = u, u && t.length > 0)
          break;
      }
      return n = O(
        n,
        !o,
        "\\",
        g
      ), o ? `${t}\\${n}` : `${t}${n}` || ".";
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    normalize(e) {
      S(e, "path");
      const t = e.length;
      if (t === 0)
        return ".";
      let n = 0, o, l = !1;
      const s = i(e, 0);
      if (t === 1)
        return x(s) ? "\\" : e;
      if (g(s))
        if (l = !0, g(i(e, 1))) {
          let r = 2, c = r;
          for (; r < t && !g(i(e, r)); )
            r++;
          if (r < t && r !== c) {
            const u = d(e, c, r);
            for (c = r; r < t && g(i(e, r)); )
              r++;
            if (r < t && r !== c) {
              for (c = r; r < t && !g(i(e, r)); )
                r++;
              if (r === t)
                return `\\\\${u}\\${d(e, c)}\\`;
              r !== c && (o = `\\\\${u}\\${d(e, c, r)}`, n = r);
            }
          }
        } else
          n = 1;
      else k(s) && i(e, 1) === p && (o = d(e, 0, 2), n = 2, t > 2 && g(i(e, 2)) && (l = !0, n = 3));
      let f = n < t ? O(
        d(e, n),
        !l,
        "\\",
        g
      ) : "";
      return f.length === 0 && !l && (f = "."), f.length > 0 && g(i(e, t - 1)) && (f += "\\"), o === void 0 ? l ? `\\${f}` : f : l ? `${o}\\${f}` : `${o}${f}`;
    },
    /**
     * @param {string} path
     * @returns {boolean}
     */
    isAbsolute(e) {
      S(e, "path");
      const t = e.length;
      if (t === 0)
        return !1;
      const n = i(e, 0);
      return g(n) || // Possible device root
      t > 2 && k(n) && i(e, 1) === p && g(i(e, 2));
    },
    /**
     * @param {...string} args
     * @returns {string}
     */
    join(...e) {
      if (e.length === 0)
        return ".";
      let t, n;
      for (let s = 0; s < e.length; ++s) {
        const f = e[s];
        S(f, "path"), f.length > 0 && (t === void 0 ? t = n = f : t += `\\${f}`);
      }
      if (t === void 0)
        return ".";
      let o = !0, l = 0;
      if (g(i(n, 0))) {
        ++l;
        const s = n.length;
        s > 1 && g(i(n, 1)) && (++l, s > 2 && (g(i(n, 2)) ? ++l : o = !1));
      }
      if (o) {
        for (; l < t.length && g(i(t, l)); )
          l++;
        l >= 2 && (t = `\\${d(t, l)}`);
      }
      return C.normalize(t);
    },
    /**
     * It will solve the relative path from `from` to `to`, for instance
     * from = 'C:\\orandea\\test\\aaa'
     * to = 'C:\\orandea\\impl\\bbb'
     * The output of the function should be: '..\\..\\impl\\bbb'
     * @param {string} from
     * @param {string} to
     * @returns {string}
     */
    relative(e, t) {
      if (S(e, "from"), S(t, "to"), e === t)
        return "";
      const n = C.resolve(e), o = C.resolve(t);
      if (n === o || (e = _(n), t = _(o), e === t))
        return "";
      let l = 0;
      for (; l < e.length && i(e, l) === v; )
        l++;
      let s = e.length;
      for (; s - 1 > l && i(e, s - 1) === v; )
        s--;
      const f = s - l;
      let r = 0;
      for (; r < t.length && i(t, r) === v; )
        r++;
      let c = t.length;
      for (; c - 1 > r && i(t, c - 1) === v; )
        c--;
      const u = c - r, A = f < u ? f : u;
      let a = -1, m = 0;
      for (; m < A; m++) {
        const q = i(e, l + m);
        if (q !== i(t, r + m))
          break;
        q === v && (a = m);
      }
      if (m !== A) {
        if (a === -1)
          return o;
      } else {
        if (u > A) {
          if (i(t, r + m) === v)
            return d(o, r + m + 1);
          if (m === 2)
            return d(o, r + m);
        }
        f > A && (i(e, l + m) === v ? a = m : m === 2 && (a = 3)), a === -1 && (a = 0);
      }
      let L = "";
      for (m = l + a + 1; m <= s; ++m)
        (m === s || i(e, m) === v) && (L += L.length === 0 ? ".." : "\\..");
      return r += a, L.length > 0 ? `${L}${d(o, r, c)}` : (i(o, r) === v && ++r, d(o, r, c));
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    toNamespacedPath(e) {
      if (typeof e != "string" || e.length === 0)
        return e;
      const t = C.resolve(e);
      if (t.length <= 2)
        return e;
      if (i(t, 0) === v) {
        if (i(t, 1) === v) {
          const n = i(t, 2);
          if (n !== X && n !== P)
            return `\\\\?\\UNC\\${d(t, 2)}`;
        }
      } else if (k(i(t, 0)) && i(t, 1) === p && i(t, 2) === v)
        return `\\\\?\\${t}`;
      return e;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    dirname(e) {
      S(e, "path");
      const t = e.length;
      if (t === 0)
        return ".";
      let n = -1, o = 0;
      const l = i(e, 0);
      if (t === 1)
        return g(l) ? e : ".";
      if (g(l)) {
        if (n = o = 1, g(i(e, 1))) {
          let r = 2, c = r;
          for (; r < t && !g(i(e, r)); )
            r++;
          if (r < t && r !== c) {
            for (c = r; r < t && g(i(e, r)); )
              r++;
            if (r < t && r !== c) {
              for (c = r; r < t && !g(i(e, r)); )
                r++;
              if (r === t)
                return e;
              r !== c && (n = o = r + 1);
            }
          }
        }
      } else k(l) && i(e, 1) === p && (n = t > 2 && g(i(e, 2)) ? 3 : 2, o = n);
      let s = -1, f = !0;
      for (let r = t - 1; r >= o; --r)
        if (g(i(e, r))) {
          if (!f) {
            s = r;
            break;
          }
        } else
          f = !1;
      if (s === -1) {
        if (n === -1)
          return ".";
        s = n;
      }
      return d(e, 0, s);
    },
    /**
     * @param {string} path
     * @param {string} [suffix]
     * @returns {string}
     */
    basename(e, t) {
      t !== void 0 && S(t, "ext"), S(e, "path");
      let n = 0, o = -1, l = !0;
      if (e.length >= 2 && k(i(e, 0)) && i(e, 1) === p && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
        if (t === e)
          return "";
        let s = t.length - 1, f = -1;
        for (let r = e.length - 1; r >= n; --r) {
          const c = i(e, r);
          if (g(c)) {
            if (!l) {
              n = r + 1;
              break;
            }
          } else
            f === -1 && (l = !1, f = r + 1), s >= 0 && (c === i(t, s) ? --s === -1 && (o = r) : (s = -1, o = f));
        }
        return n === o ? o = f : o === -1 && (o = e.length), d(e, n, o);
      }
      for (let s = e.length - 1; s >= n; --s)
        if (g(i(e, s))) {
          if (!l) {
            n = s + 1;
            break;
          }
        } else o === -1 && (l = !1, o = s + 1);
      return o === -1 ? "" : d(e, n, o);
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    extname(e) {
      S(e, "path");
      let t = 0, n = -1, o = 0, l = -1, s = !0, f = 0;
      e.length >= 2 && i(e, 1) === p && k(i(e, 0)) && (t = o = 2);
      for (let r = e.length - 1; r >= t; --r) {
        const c = i(e, r);
        if (g(c)) {
          if (!s) {
            o = r + 1;
            break;
          }
          continue;
        }
        l === -1 && (s = !1, l = r + 1), c === P ? n === -1 ? n = r : f !== 1 && (f = 1) : n !== -1 && (f = -1);
      }
      return n === -1 || l === -1 || // We saw a non-dot character immediately before the dot
      f === 0 || // The (right-most) trimmed path component is exactly '..'
      f === 1 && n === l - 1 && n === o + 1 ? "" : d(e, n, l);
    },
    format: y(T, null, "\\"),
    /**
     * @param {string} path
     * @returns {{
     *  dir: string;
     *  root: string;
     *  base: string;
     *  name: string;
     *  ext: string;
     *  }}
     */
    parse(e) {
      S(e, "path");
      const t = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0)
        return t;
      const n = e.length;
      let o = 0, l = i(e, 0);
      if (n === 1)
        return g(l) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
      if (g(l)) {
        if (o = 1, g(i(e, 1))) {
          let a = 2, m = a;
          for (; a < n && !g(i(e, a)); )
            a++;
          if (a < n && a !== m) {
            for (m = a; a < n && g(i(e, a)); )
              a++;
            if (a < n && a !== m) {
              for (m = a; a < n && !g(i(e, a)); )
                a++;
              a === n ? o = a : a !== m && (o = a + 1);
            }
          }
        }
      } else if (k(l) && i(e, 1) === p) {
        if (n <= 2)
          return t.root = t.dir = e, t;
        if (o = 2, g(i(e, 2))) {
          if (n === 3)
            return t.root = t.dir = e, t;
          o = 3;
        }
      }
      o > 0 && (t.root = d(e, 0, o));
      let s = -1, f = o, r = -1, c = !0, u = e.length - 1, A = 0;
      for (; u >= o; --u) {
        if (l = i(e, u), g(l)) {
          if (!c) {
            f = u + 1;
            break;
          }
          continue;
        }
        r === -1 && (c = !1, r = u + 1), l === P ? s === -1 ? s = u : A !== 1 && (A = 1) : s !== -1 && (A = -1);
      }
      return r !== -1 && (s === -1 || // We saw a non-dot character immediately before the dot
      A === 0 || // The (right-most) trimmed path component is exactly '..'
      A === 1 && s === r - 1 && s === f + 1 ? t.base = t.name = d(e, f, r) : (t.name = d(e, f, s), t.base = d(e, f, r), t.ext = d(e, s, r))), f > 0 && f !== o ? t.dir = d(e, 0, f - 1) : t.dir = t.root, t;
    },
    sep: "\\",
    delimiter: ";",
    win32: null,
    posix: null
  }, te = (() => {
    if (N) {
      const e = /\\/g;
      return () => {
        const t = $(E.cwd(), e, "/");
        return d(t, b(t, "/"));
      };
    }
    return () => E.cwd();
  })(), R = {
    /**
     * path.resolve([from ...], to)
     * @param {...string} args
     * @returns {string}
     */
    resolve(...e) {
      let t = "", n = !1;
      for (let o = e.length - 1; o >= -1 && !n; o--) {
        const l = o >= 0 ? e[o] : te();
        S(l, `paths[${o}]`), l.length !== 0 && (t = `${l}/${t}`, n = i(l, 0) === w);
      }
      return t = O(
        t,
        !n,
        "/",
        x
      ), n ? `/${t}` : t.length > 0 ? t : ".";
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    normalize(e) {
      if (S(e, "path"), e.length === 0)
        return ".";
      const t = i(e, 0) === w, n = i(e, e.length - 1) === w;
      return e = O(e, !t, "/", x), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
    },
    /**
     * @param {string} path
     * @returns {boolean}
     */
    isAbsolute(e) {
      return S(e, "path"), e.length > 0 && i(e, 0) === w;
    },
    /**
     * @param {...string} args
     * @returns {string}
     */
    join(...e) {
      if (e.length === 0)
        return ".";
      let t;
      for (let n = 0; n < e.length; ++n) {
        const o = e[n];
        S(o, "path"), o.length > 0 && (t === void 0 ? t = o : t += `/${o}`);
      }
      return t === void 0 ? "." : R.normalize(t);
    },
    /**
     * @param {string} from
     * @param {string} to
     * @returns {string}
     */
    relative(e, t) {
      if (S(e, "from"), S(t, "to"), e === t || (e = R.resolve(e), t = R.resolve(t), e === t))
        return "";
      const n = 1, o = e.length, l = o - n, s = 1, f = t.length - s, r = l < f ? l : f;
      let c = -1, u = 0;
      for (; u < r; u++) {
        const a = i(e, n + u);
        if (a !== i(t, s + u))
          break;
        a === w && (c = u);
      }
      if (u === r)
        if (f > r) {
          if (i(t, s + u) === w)
            return d(t, s + u + 1);
          if (u === 0)
            return d(t, s + u);
        } else l > r && (i(e, n + u) === w ? c = u : u === 0 && (c = 0));
      let A = "";
      for (u = n + c + 1; u <= o; ++u)
        (u === o || i(e, u) === w) && (A += A.length === 0 ? ".." : "/..");
      return `${A}${d(t, s + c)}`;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    toNamespacedPath(e) {
      return e;
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    dirname(e) {
      if (S(e, "path"), e.length === 0)
        return ".";
      const t = i(e, 0) === w;
      let n = -1, o = !0;
      for (let l = e.length - 1; l >= 1; --l)
        if (i(e, l) === w) {
          if (!o) {
            n = l;
            break;
          }
        } else
          o = !1;
      return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : d(e, 0, n);
    },
    /**
     * @param {string} path
     * @param {string} [suffix]
     * @returns {string}
     */
    basename(e, t) {
      t !== void 0 && S(t, "ext"), S(e, "path");
      let n = 0, o = -1, l = !0;
      if (t !== void 0 && t.length > 0 && t.length <= e.length) {
        if (t === e)
          return "";
        let s = t.length - 1, f = -1;
        for (let r = e.length - 1; r >= 0; --r) {
          const c = i(e, r);
          if (c === w) {
            if (!l) {
              n = r + 1;
              break;
            }
          } else
            f === -1 && (l = !1, f = r + 1), s >= 0 && (c === i(t, s) ? --s === -1 && (o = r) : (s = -1, o = f));
        }
        return n === o ? o = f : o === -1 && (o = e.length), d(e, n, o);
      }
      for (let s = e.length - 1; s >= 0; --s)
        if (i(e, s) === w) {
          if (!l) {
            n = s + 1;
            break;
          }
        } else o === -1 && (l = !1, o = s + 1);
      return o === -1 ? "" : d(e, n, o);
    },
    /**
     * @param {string} path
     * @returns {string}
     */
    extname(e) {
      S(e, "path");
      let t = -1, n = 0, o = -1, l = !0, s = 0;
      for (let f = e.length - 1; f >= 0; --f) {
        const r = i(e, f);
        if (r === w) {
          if (!l) {
            n = f + 1;
            break;
          }
          continue;
        }
        o === -1 && (l = !1, o = f + 1), r === P ? t === -1 ? t = f : s !== 1 && (s = 1) : t !== -1 && (s = -1);
      }
      return t === -1 || o === -1 || // We saw a non-dot character immediately before the dot
      s === 0 || // The (right-most) trimmed path component is exactly '..'
      s === 1 && t === o - 1 && t === n + 1 ? "" : d(e, t, o);
    },
    format: y(T, null, "/"),
    /**
     * @param {string} path
     * @returns {{
     *   dir: string;
     *   root: string;
     *   base: string;
     *   name: string;
     *   ext: string;
     *   }}
     */
    parse(e) {
      S(e, "path");
      const t = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0)
        return t;
      const n = i(e, 0) === w;
      let o;
      n ? (t.root = "/", o = 1) : o = 0;
      let l = -1, s = 0, f = -1, r = !0, c = e.length - 1, u = 0;
      for (; c >= o; --c) {
        const A = i(e, c);
        if (A === w) {
          if (!r) {
            s = c + 1;
            break;
          }
          continue;
        }
        f === -1 && (r = !1, f = c + 1), A === P ? l === -1 ? l = c : u !== 1 && (u = 1) : l !== -1 && (u = -1);
      }
      if (f !== -1) {
        const A = s === 0 && n ? 1 : s;
        l === -1 || // We saw a non-dot character immediately before the dot
        u === 0 || // The (right-most) trimmed path component is exactly '..'
        u === 1 && l === f - 1 && l === s + 1 ? t.base = t.name = d(e, A, f) : (t.name = d(e, A, l), t.base = d(e, A, f), t.ext = d(e, l, f));
      }
      return s > 0 ? t.dir = d(e, 0, s - 1) : n && (t.dir = "/"), t;
    },
    sep: "/",
    delimiter: ":",
    win32: null,
    posix: null
  };
  return R.win32 = C.win32 = C, R.posix = C.posix = R, C._makeLong = C.toNamespacedPath, R._makeLong = R.toNamespacedPath, U = N ? C : R, U;
}
var ce = fe();
const ue = /* @__PURE__ */ re(ce);
class ae {
  buffer;
  positions;
  name;
  data;
  type;
  mode;
  uid;
  gid;
  size;
  mtime;
  typeflag;
  linkname;
  magic;
  version;
  uname;
  gname;
  devmajor;
  devminor;
  prefix;
  padding;
  checksum;
  constructor(i) {
    this.buffer = new Uint8Array(512), this.positions = {
      name: { startsAt: 0, bytes: 100 },
      mode: { startsAt: 100, bytes: 8 },
      uid: { startsAt: 108, bytes: 8 },
      gid: { startsAt: 116, bytes: 8 },
      size: { startsAt: 124, bytes: 12 },
      mtime: { startsAt: 136, bytes: 12 },
      checksum: { startsAt: 148, bytes: 8 },
      typeflag: { startsAt: 156, bytes: 1 },
      linkname: { startsAt: 157, bytes: 100 },
      magic: { startsAt: 257, bytes: 6 },
      version: { startsAt: 263, bytes: 2 },
      uname: { startsAt: 265, bytes: 32 },
      gname: { startsAt: 297, bytes: 2 },
      devmajor: { startsAt: 329, bytes: 8 },
      devminor: { startsAt: 337, bytes: 8 },
      prefix: { startsAt: 345, bytes: 155 },
      padding: { startsAt: 500, bytes: 12 }
    }, !i?.name && this.#i(
      "Can't process, plesae provide the header name"
    );
    const { base: b, dir: h } = ue.parse(i.name);
    this.name = b, this.type = i.type ||= i.name.endsWith("/") ? "directory" : "file", this.mode = i.mode ||= this.type == "directory" ? 493 : 420, this.uid = i.uid ||= 0, this.gid = i.gid ||= 0, this.mtime = i.mtime ||= Math.floor(Date.now() / 1e3), this.typeflag = this.type === "directory" ? "5" : "0", this.linkname = i.linkname ||= "", this.magic = i.magic ||= "ustar", this.version = i.version ||= "00", this.uname = i.uname ||= "", this.gname = i.gname ||= "", this.devmajor = i.devmajor ||= 0, this.devminor = i.devminor ||= 0, this.prefix = h || "", this.padding = i.padding ||= "", this.checksum = 0, this.type === "directory" ? (this.data = new Uint8Array(0), this.size = 0) : (this.data = i.data instanceof Uint8Array ? i.data : typeof i.data == "string" ? H(i.data).encode("\0") : H("").encode("\0"), this.size = this.data.byteLength > 0 ? this.data.byteLength : typeof i.size == "number" ? i.size : 0, this.data.byteLength > 0 && typeof i.size == "number" && console.warn(
      "header size gets calculated automatically when data is present"
    )), this.#e("name", "string"), this.#e("mode", "numric"), this.#e("uid", "numric"), this.#e("gid", "numric"), this.#e("size", "numric"), this.#e("mtime", "numric"), this.#e("typeflag", "string"), this.buffer[this.positions.typeflag.startsAt] = H(this.typeflag).encode("\0")[0], this.#e("linkname", "string"), this.#e("magic", "string"), this.#e("version", "string"), this.#e("uname", "string"), this.#e("gname", "string"), this.#e("devmajor", "numric"), this.#e("devminor", "numric"), this.#e("prefix", "string"), this.#e("padding", "string");
    const $ = H(" ").encode("\0")[0];
    for (let d = 0; d < this.buffer.length; d++)
      d >= this.positions.checksum.startsAt && d < this.positions.checksum.startsAt + this.positions.checksum.bytes ? this.checksum += $ : this.checksum += this.buffer[d];
    return this.#e("checksum", "numric"), this;
  }
  #e(i, b) {
    const h = this.positions[i];
    switch (b) {
      case "string": {
        this.#t(
          H(this[i]).encode("\0"),
          h.bytes,
          h.startsAt
        );
        break;
      }
      case "numric": {
        this.#t(
          H(this[i]).octal().pad(h.bytes).encode("\0"),
          h.bytes,
          h.startsAt
        );
        break;
      }
      default:
        this.#i(`Unknown field type: ${b}`);
    }
  }
  #t(i, b, h) {
    const $ = Math.min(i.length, b - 1);
    this.buffer.set(i.subarray(0, $), h), $ < i.length && (this.buffer[h + $] = 0);
  }
  #i(i) {
    throw new Error(i);
  }
}
function de(y, i) {
  if (i?.stream || i?.gzip) {
    const b = new ReadableStream({
      async pull(h) {
        for await (const $ of Z(y))
          h.enqueue($);
        h.close();
      }
    });
    return i?.gzip ? b.pipeThrough(new CompressionStream("gzip")) : b;
  }
  return Z(y);
}
async function* Z(y) {
  for (const i of y) {
    yield new ae({
      name: i.webkitRelativePath || i.name,
      mtime: i.lastModified,
      size: i.size
    }).buffer;
    for await (const b of i.stream())
      yield b;
    yield new Uint8Array((512 - i.size % 512) % 512);
  }
  yield new Uint8Array(1024);
}
export {
  de as default
};
