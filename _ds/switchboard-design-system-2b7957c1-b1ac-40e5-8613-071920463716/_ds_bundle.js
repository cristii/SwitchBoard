/* @ds-bundle: {"format":3,"namespace":"SwitchboardDesignSystem_2b7957","components":[{"name":"ChatBubble","sourcePath":"components/chat/ChatBubble.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"HandUnderline","sourcePath":"components/core/HandUnderline.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"StickyNote","sourcePath":"components/surfaces/StickyNote.jsx"}],"sourceHashes":{"components/chat/ChatBubble.jsx":"d3182db551d0","components/core/Badge.jsx":"f53c78cbfc25","components/core/Button.jsx":"bd527e39dcc9","components/core/Eyebrow.jsx":"cddef9e0f8d5","components/core/HandUnderline.jsx":"7aad9514d834","components/core/Pill.jsx":"52fbf9ded76c","components/data/Stat.jsx":"eec5c4c67998","components/surfaces/Card.jsx":"35c8aca8fdca","components/surfaces/StickyNote.jsx":"dfd579cea61f","ui_kits/website/About.jsx":"3448e74b340b","ui_kits/website/ChatWidget.jsx":"ec5b6e3236bc","ui_kits/website/FAQ.jsx":"405cb5e6c23e","ui_kits/website/FooterCTA.jsx":"e762c568eb28","ui_kits/website/Header.jsx":"d99f395be1ac","ui_kits/website/Hero.jsx":"0f5e8364e41a","ui_kits/website/Pricing.jsx":"ba8e5558437f","ui_kits/website/Process.jsx":"db8199848b7a","ui_kits/website/Proof.jsx":"78c644b83360","ui_kits/website/SampleBuilds.jsx":"548a237c3671","ui_kits/website/Services.jsx":"2db59106bcec"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SwitchboardDesignSystem_2b7957 = window.SwitchboardDesignSystem_2b7957 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/chat/ChatBubble.jsx
try { (() => {
/**
 * ChatBubble — a single message in the assistant widget.
 *  - bot: white bubble, ink hairline, square bottom-left corner, "Assistant" label.
 *  - user: orange fill, white text, square bottom-right corner.
 */
function ChatBubble({
  children,
  from = "bot",
  showLabel = true,
  style = {}
}) {
  const isBot = from === "bot";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "84%",
      padding: "10px 13px",
      borderRadius: "13px",
      fontSize: ".9rem",
      lineHeight: 1.45,
      alignSelf: isBot ? "flex-start" : "flex-end",
      background: isBot ? "var(--white)" : "var(--orange)",
      color: isBot ? "var(--ink)" : "#fff",
      border: isBot ? "1.5px solid var(--line)" : "none",
      borderBottomLeftRadius: isBot ? "4px" : "13px",
      borderBottomRightRadius: isBot ? "13px" : "4px",
      ...style
    }
  }, isBot && showLabel ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      fontSize: ".7rem",
      color: "var(--ink-soft)",
      marginBottom: "5px",
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: "16px",
      height: "16px",
      borderRadius: "5px",
      background: "var(--orange)",
      display: "inline-block"
    }
  }), "Assistant") : null, children);
}
Object.assign(__ds_scope, { ChatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ChatBubble.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Badge / Tag — small rounded label. Two roles:
 *  - tint tags (level / category): soft colored pill.
 *  - "flag" (solid orange) for callouts like "Most popular".
 */
function Badge({
  children,
  variant = "neutral",
  style = {}
}) {
  const tints = {
    neutral: {
      background: "var(--paper-3)",
      color: "var(--ink)"
    },
    green: {
      background: "var(--tint-green-bg)",
      color: "var(--tint-green-fg)"
    },
    amber: {
      background: "var(--tint-amber-bg)",
      color: "var(--tint-amber-fg)"
    },
    violet: {
      background: "var(--tint-violet-bg)",
      color: "var(--tint-violet-fg)"
    },
    solid: {
      background: "var(--orange)",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
      fontWeight: 700,
      fontSize: ".7rem",
      textTransform: "uppercase",
      letterSpacing: ".05em",
      padding: "3px 10px",
      borderRadius: "var(--r-pill, 20px)",
      lineHeight: 1.5,
      ...tints[variant],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switchboard Button — uppercase Bricolage label with a HARD offset shadow.
 * On hover it lifts (translateY) and the shadow grows. No blur, ever.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconRight,
  arrow = false,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: ".7em 1.1em",
      fontSize: ".78rem"
    },
    md: {
      padding: ".85em 1.3em",
      fontSize: "var(--fs-button, .86rem)"
    },
    lg: {
      padding: "1em 1.6em",
      fontSize: ".95rem"
    }
  };
  const variants = {
    primary: {
      background: "var(--orange)",
      color: "#fff",
      borderColor: "var(--orange-deep)",
      boxShadow: "var(--shadow-btn, 3px 3px 0 var(--ink))"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "var(--ink)",
      boxShadow: "var(--shadow-btn-ghost, 3px 3px 0 rgba(21,33,31,.18))"
    },
    light: {
      background: "var(--paper)",
      color: "var(--ink)",
      borderColor: "var(--ink)",
      boxShadow: "var(--shadow-btn-ghost, 3px 3px 0 rgba(21,33,31,.18))"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5em",
    fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
    fontWeight: 700,
    letterSpacing: "var(--ls-button, .02em)",
    textTransform: "uppercase",
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "var(--bw-strong, 2px)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast,.12s) ease, box-shadow var(--dur-fast,.12s) ease",
    textDecoration: "none",
    lineHeight: 1,
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? "a" : "button";
  const onEnter = e => {
    if (disabled) return;
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = variant === "primary" ? "var(--shadow-btn-hover, 5px 5px 0 var(--ink))" : "5px 5px 0 rgba(21,33,31,.22)";
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = variants[variant].boxShadow;
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    "aria-disabled": disabled || undefined
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, iconRight) : null, arrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 600
    }
  }, "\u2192") : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/**
 * Eyebrow — the small uppercase Bricolage kicker that labels a section.
 * Orange by default; amber on dark surfaces.
 */
function Eyebrow({
  children,
  tone = "orange",
  style = {}
}) {
  const color = tone === "amber" ? "var(--amber)" : tone === "ink" ? "var(--ink)" : "var(--orange)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
      fontWeight: 700,
      letterSpacing: "var(--ls-eyebrow, .14em)",
      textTransform: "uppercase",
      fontSize: "var(--fs-eyebrow, .72rem)",
      color,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/HandUnderline.jsx
try { (() => {
/**
 * Hand-drawn underline — wraps inline text with a wobbly Caveat-spirited
 * stroke beneath it. The brand's signature emphasis device.
 */
function HandUnderline({
  children,
  color = "var(--orange)",
  weight = 7,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      whiteSpace: "nowrap",
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 300 20",
    preserveAspectRatio: "none",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: "-2%",
      bottom: "-0.32em",
      width: "104%",
      height: "0.45em",
      overflow: "visible"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 14 C 60 6, 120 18, 180 9 S 280 6, 296 12",
    fill: "none",
    stroke: color,
    strokeWidth: weight,
    strokeLinecap: "round"
  })));
}
Object.assign(__ds_scope, { HandUnderline });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/HandUnderline.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
/**
 * Pill — outlined capsule used in the conversion "flow" rows
 * (Conversation → Qualified lead → Booked call). Active state turns orange.
 */
function Pill({
  children,
  active = false,
  onDark = false,
  style = {}
}) {
  const border = active ? "var(--orange)" : onDark ? "#54605C" : "var(--line)";
  const color = active ? "var(--orange)" : onDark ? "var(--paper)" : "var(--ink)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      border: `1.5px solid ${border}`,
      borderRadius: "var(--r-pill, 20px)",
      padding: "6px 14px",
      fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
      fontWeight: 600,
      fontSize: ".74rem",
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
/**
 * Stat — a big Bricolage number in orange with a muted label beneath.
 * Used in the dark proof band and the about section.
 */
function Stat({
  value,
  label,
  onDark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display, 'Bricolage Grotesque', sans-serif)",
      fontWeight: 800,
      fontSize: "2.5rem",
      lineHeight: 1,
      color: "var(--orange)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".86rem",
      marginTop: "6px",
      color: onDark ? "#bcc4bd" : "var(--ink-soft)"
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the workhorse surface: white/paper fill, ink outline, hard offset
 * shadow. `featured` swaps the shadow to orange (used for the popular plan).
 * `tone` picks the fill so cards read on either paper background.
 */
function Card({
  children,
  tone = "white",
  featured = false,
  flat = false,
  style = {},
  ...rest
}) {
  const fills = {
    white: "var(--white)",
    paper: "var(--paper)",
    sunken: "var(--paper-2)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: fills[tone] || fills.white,
      border: featured ? "1.5px solid var(--orange)" : "1.5px solid var(--ink)",
      borderRadius: "var(--r, 14px)",
      boxShadow: flat ? "none" : featured ? "var(--shadow-accent, 5px 5px 0 var(--orange))" : "var(--shadow-card, 4px 4px 0 rgba(21,33,31,.1))",
      padding: "22px 24px",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StickyNote.jsx
try { (() => {
/**
 * StickyNote — a slightly rotated, taped paper note set in Caveat.
 * Used for asides like the "Tech stack" list. Playful, hand-made feel.
 */
function StickyNote({
  title,
  children,
  rotate = -1.4,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--paper)",
      border: "1.5px solid var(--ink)",
      borderRadius: "10px",
      padding: "18px 20px",
      transform: `rotate(${rotate}deg)`,
      boxShadow: "var(--shadow-card, 4px 4px 0 rgba(21,33,31,.1))",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      content: '""',
      position: "absolute",
      top: "-9px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "50px",
      height: "16px",
      background: "rgba(180,83,9,.5)",
      border: "1px solid var(--orange-deep)",
      borderRadius: "3px"
    }
  }), title ? /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-hand, 'Caveat', cursive)",
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "8px"
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-hand, 'Caveat', cursive)",
      fontSize: "1.18rem",
      lineHeight: 1.55
    }
  }, children));
}
Object.assign(__ds_scope, { StickyNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StickyNote.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
// About — portrait placeholder + bio, impact stat, "what I bring" list, tech-stack sticky note.
function About() {
  const {
    Eyebrow,
    StickyNote
  } = window.SwitchboardDesignSystem_2b7957;
  const bring = [{
    icon: "chart",
    text: "Clear lead-flow design before any building starts"
  }, {
    icon: "assistant",
    text: "Chatbot setup connected to booking and follow-up"
  }, {
    icon: "refresh",
    text: "Monthly review to improve answers and capture more leads"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      background: "var(--paper-2)",
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "About me"), /*#__PURE__*/React.createElement("div", {
    className: "about-grid",
    style: {
      display: "grid",
      gridTemplateColumns: ".8fr 1.2fr",
      gap: "44px",
      alignItems: "start",
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "2px solid var(--ink)",
      borderRadius: "14px",
      overflow: "hidden",
      aspectRatio: "4/4.4",
      background: "linear-gradient(160deg,#b9c2b6,#7e8c84)",
      boxShadow: "var(--shadow-raised)",
      display: "grid",
      placeItems: "center",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-hand)",
      fontSize: "1.4rem",
      opacity: .85,
      textAlign: "center",
      padding: "20px"
    }
  }, "[ your photo here ]")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
      letterSpacing: "-.02em",
      margin: 0
    }
  }, "I'm Cristi \u0218atcovschi."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: "8px",
      background: "var(--orange)",
      color: "#fff",
      padding: "5px 12px",
      borderRadius: "8px",
      margin: "14px 0",
      fontFamily: "var(--font-display)",
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: "1.3rem"
    }
  }, "40+"), " assistants & automations shipped"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#2c3331",
      marginBottom: "12px",
      maxWidth: "34em",
      lineHeight: 1.55
    }
  }, "I build practical AI systems that help businesses capture more leads and save time \u2014 combining strategy, automation and clean implementation into something that's easy to run and built to scale."), /*#__PURE__*/React.createElement("div", {
    className: "about-cols",
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: "24px",
      marginTop: "22px"
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, bring.map(b => /*#__PURE__*/React.createElement("li", {
    key: b.text,
    style: {
      display: "flex",
      gap: "11px",
      marginBottom: "14px",
      fontSize: ".9rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "22px",
      height: "22px",
      flex: "none",
      marginTop: "2px",
      background: "var(--orange)",
      WebkitMask: `url(../../assets/icons/${b.icon}.svg) center/contain no-repeat`,
      mask: `url(../../assets/icons/${b.icon}.svg) center/contain no-repeat`
    }
  }), b.text))), /*#__PURE__*/React.createElement(StickyNote, {
    title: "Tech stack"
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("li", null, "\u2013 n8n"), /*#__PURE__*/React.createElement("li", null, "\u2013 OpenAI / GPT"), /*#__PURE__*/React.createElement("li", null, "\u2013 Node.js / Nest"), /*#__PURE__*/React.createElement("li", null, "\u2013 React / JS"), /*#__PURE__*/React.createElement("li", null, "\u2013 MongoDB"), /*#__PURE__*/React.createElement("li", null, "\u2013 Shopify"))))))));
}
window.About = About;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ChatWidget.jsx
try { (() => {
// ChatWidget — the interactive hero assistant. Scripted replies so the demo
// always works offline. Composes ChatBubble from the design system.
function ChatWidget() {
  const {
    ChatBubble
  } = window.SwitchboardDesignSystem_2b7957;
  const [msgs, setMsgs] = React.useState([{
    from: "bot",
    text: "Hi — I'm a live demo assistant. I can tell you what Switchboard builds, what it costs, and help you book a call. What would you like to know?"
  }]);
  const [val, setVal] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);
  function reply(q) {
    q = q.toLowerCase();
    if (/price|cost|how much|€|euro|pricing/.test(q)) return "Builds start at €399 for a Website Assistant, €799 for a Booking Assistant, and from €1499 for a full Automation System. There's an optional €99/mo Care plan. Want a free demo to see which fits?";
    if (/demo|try|free|show/.test(q)) return "Happy to! I build a free working demo on your own site before you commit anything. Send your website and I'll show you what your assistant could answer and book.";
    if (/book|call|talk|meeting|appointment/.test(q)) return "Let's set up a free 15-minute call — use the “Book a call” button up top, or send your website and I'll prep a demo first.";
    if (/build|do|make|offer|service|what can/.test(q)) return "I build website assistants that answer questions, qualify leads and book calls — from a simple FAQ bot up to a full CRM + automation system. What does your business do?";
    if (/work|website|install|existing|platform/.test(q)) return "It usually installs with a single script tag, so it works on most existing websites without a rebuild. What platform is your site on?";
    return "Good question! I can tell you what Switchboard builds, what it costs, or set up a free demo on your site. Which would help most?";
  }
  function send(text) {
    text = (text || "").trim();
    if (!text) return;
    setMsgs(m => [...m, {
      from: "user",
      text
    }]);
    setVal("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {
        from: "bot",
        text: reply(text)
      }]);
    }, 750);
  }
  const quick = ["What can you build?", "How much does it cost?", "Get a free demo", "Book a call"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--white)",
      border: "2px solid var(--ink)",
      borderRadius: "18px",
      boxShadow: "var(--shadow-pop)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      maxHeight: "560px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--dark)",
      color: "var(--paper)",
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: "11px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "34px",
      height: "34px",
      borderRadius: "9px",
      background: "var(--orange)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/assistant.svg",
    width: "20",
    style: {
      filter: "brightness(0) invert(1)"
    },
    alt: ""
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: ".95rem",
      lineHeight: 1.1
    }
  }, "Switchboard Assistant"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".72rem",
      color: "#b9c9b6",
      display: "flex",
      alignItems: "center",
      gap: "5px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "#5fcf7a"
    }
  }), " Online"))), /*#__PURE__*/React.createElement("div", {
    ref: bodyRef,
    style: {
      padding: "16px",
      overflowY: "auto",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      background: "var(--paper)",
      minHeight: "230px"
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(ChatBubble, {
    key: i,
    from: m.from,
    showLabel: m.from === "bot" && (i === 0 || msgs[i - 1].from !== "bot")
  }, m.text)), typing ? /*#__PURE__*/React.createElement(ChatBubble, {
    from: "bot",
    showLabel: false
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement(Dot, {
    d: "0s"
  }), /*#__PURE__*/React.createElement(Dot, {
    d: ".15s"
  }), /*#__PURE__*/React.createElement(Dot, {
    d: ".3s"
  }))) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "7px",
      padding: "0 16px 8px",
      background: "var(--paper)"
    }
  }, quick.map(q => /*#__PURE__*/React.createElement("button", {
    key: q,
    onClick: () => send(q),
    style: {
      background: "var(--white)",
      border: "1.5px solid var(--line)",
      borderRadius: "20px",
      padding: "7px 13px",
      fontSize: ".8rem",
      fontFamily: "var(--font-body)",
      cursor: "pointer",
      color: "var(--ink)"
    }
  }, q))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      padding: "12px 14px",
      borderTop: "1.5px solid var(--line)",
      background: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: val,
    onChange: e => setVal(e.target.value),
    onKeyDown: e => e.key === "Enter" && send(val),
    placeholder: "Type your message\u2026",
    "aria-label": "Message the assistant",
    style: {
      flex: 1,
      border: "1.5px solid var(--line)",
      borderRadius: "9px",
      padding: "10px 12px",
      fontFamily: "var(--font-body)",
      fontSize: ".9rem",
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(val),
    "aria-label": "Send",
    style: {
      background: "var(--orange)",
      border: "none",
      borderRadius: "9px",
      width: "42px",
      cursor: "pointer",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/icons/send.svg",
    width: "18",
    style: {
      filter: "brightness(0) invert(1)"
    },
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: ".68rem",
      color: "var(--ink-soft)",
      padding: "7px",
      background: "var(--white)",
      borderTop: "1px solid var(--line-soft)"
    }
  }, "Built by ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Switchboard AI Systems")));
}
function Dot({
  d
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "var(--ink-soft)",
      animation: `blink 1s ${d} infinite`
    }
  });
}
window.ChatWidget = ChatWidget;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ChatWidget.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FAQ.jsx
try { (() => {
// FAQ — interactive two-column accordion. Background paper-2.
function FAQ() {
  const {
    Eyebrow
  } = window.SwitchboardDesignSystem_2b7957;
  const qas = [["Will the chatbot make things up?", "No — it only answers from the knowledge I train it on (your services, FAQs and rules). When it doesn't know something, it says so and hands off to you instead of guessing."], ["Can it book calls?", "Yes. The Booking Assistant and Automation System qualify the visitor and book straight into your calendar, so the calls you get are already warm."], ["Do I need to manage the AI myself?", "Not unless you want to. Everything is set up for you, and the optional Care plan keeps it accurate and improving so you can stay hands-off."], ["Can it work on my existing website?", "Almost always. Installation is usually one script tag, so it works on most platforms without rebuilding anything."], ["Can I review the conversations?", "Yes — you get an owner dashboard showing what visitors asked, which leads were captured, and what got booked."], ["How long does it take to set up?", "A simple assistant can be live within days. A full automation system depends on the integrations, and we'll agree a clear timeline up front."]];
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    style: {
      background: "var(--paper-2)",
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.8rem,3vw,2.4rem)",
      letterSpacing: "-.02em",
      margin: "12px 0 0"
    }
  }, "Questions, answered."), /*#__PURE__*/React.createElement("div", {
    className: "faq-list",
    style: {
      marginTop: "30px",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "0 40px"
    }
  }, qas.map(([q, a], i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: q,
      style: {
        borderBottom: "1.5px solid var(--line)",
        padding: "16px 0"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "14px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1rem",
        color: "var(--ink)"
      }
    }, q, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "1.4rem",
        color: "var(--orange)",
        flex: "none",
        transition: "transform .2s",
        transform: isOpen ? "rotate(45deg)" : "none"
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? "240px" : "0",
        overflow: "hidden",
        transition: "max-height .28s ease",
        color: "var(--ink-soft)",
        fontSize: ".92rem",
        paddingTop: isOpen ? "12px" : "0",
        lineHeight: 1.5
      }
    }, a));
  }))));
}
window.FAQ = FAQ;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FAQ.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FooterCTA.jsx
try { (() => {
// FooterCTA — dark closing band with the conversion flow pills.
function FooterCTA() {
  const {
    Button,
    Pill
  } = window.SwitchboardDesignSystem_2b7957;
  return /*#__PURE__*/React.createElement("section", {
    id: "footcta",
    style: {
      background: "var(--ink)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "40px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "30px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.6rem,3vw,2.3rem)",
      letterSpacing: "-.02em",
      color: "var(--paper)",
      margin: 0
    }
  }, "Don't read another section.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)"
    }
  }, "Try the assistant.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "14px"
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    active: true,
    onDark: true
  }, "Conversation"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement(Pill, {
    onDark: true
  }, "Qualified lead"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)"
    }
  }, "\u2192"), /*#__PURE__*/React.createElement(Pill, {
    onDark: true
  }, "Booked call")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-hand)",
      marginTop: "10px",
      color: "#bcc4bd",
      fontSize: "1.15rem"
    }
  }, "\u21B3 that's the whole system.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".92rem",
      color: "#bcc4bd",
      maxWidth: "18em"
    }
  }, "Send me your website and I'll show you exactly what your chatbot could answer, qualify and book."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#top"
  }, "Try the chatbot \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    href: "#"
  }, "Book a 15-min call \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--dark)",
      borderTop: "1px solid #20302d"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "18px 24px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "10px",
      fontSize: ".78rem",
      color: "#79857d"
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--paper)",
      fontFamily: "var(--font-display)",
      fontWeight: 700
    }
  }, "Switchboard AI Systems")), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: ".06em",
      fontWeight: 500
    }
  }, "AI CHATBOTS \xB7 AUTOMATION \xB7 RESULTS"), /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \u2014 All rights reserved."))));
}
window.FooterCTA = FooterCTA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FooterCTA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
// Header — sticky nav with the wordmark and primary CTA.
function Header() {
  const {
    Button
  } = window.SwitchboardDesignSystem_2b7957;
  const links = ["Services", "Work", "Process", "Pricing", "About", "FAQ"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 60,
      backdropFilter: "blur(6px)",
      background: "rgba(233,232,223,.82)",
      borderBottom: "1.5px solid var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px",
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1,
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "1.42rem",
      letterSpacing: "-.03em"
    }
  }, "Switchboard"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: ".6rem",
      letterSpacing: ".22em",
      color: "var(--ink-soft)",
      marginTop: "3px"
    }
  }, "AI SYSTEMS")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "30px",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: ".85rem"
    },
    className: "navlinks"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase(),
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    arrow: true,
    href: "#footcta"
  }, "Book a call")));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
// Hero — headline + ticks + CTAs on the left, live ChatWidget on the right.
function Hero() {
  const {
    Button,
    Eyebrow,
    HandUnderline
  } = window.SwitchboardDesignSystem_2b7957;
  const ticks = ["Answers instantly", "Qualifies leads", "Books calls"];
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      padding: "54px 0 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid",
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px",
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "48px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "AI chatbots \xB7 automation \xB7 results"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(2.6rem,5.4vw,4.2rem)",
      lineHeight: 1.04,
      letterSpacing: "-.02em",
      margin: "14px 0 0"
    }
  }, "Don't read", /*#__PURE__*/React.createElement("br", null), "about my service.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)"
    }
  }, /*#__PURE__*/React.createElement(HandUnderline, null, "Chat with it."))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "22px 0 18px",
      fontSize: "1.06rem",
      maxWidth: "30em",
      color: "#232b29",
      lineHeight: 1.55
    }
  }, "This is the exact assistant I build for small businesses. Ask it anything \u2014 it answers instantly, works out whether you're a fit, and books a call on the spot. No forms, no waiting."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "18px 26px",
      margin: "18px 0 26px"
    }
  }, ticks.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontWeight: 600,
      fontSize: ".92rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "18px",
      background: "var(--orange)",
      WebkitMask: "url(../../assets/icons/check.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/check.svg) center/contain no-repeat"
    }
  }), t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "18px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#",
    onClick: e => e.preventDefault()
  }, "Try the chatbot \u2192 ask it anything"), /*#__PURE__*/React.createElement("a", {
    href: "#footcta",
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: ".82rem",
      textTransform: "uppercase",
      letterSpacing: ".02em",
      borderBottom: "2px solid var(--orange)",
      paddingBottom: "2px",
      textDecoration: "none",
      color: "inherit"
    }
  }, "Book a 15-min call")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "var(--ink-soft)",
      fontSize: ".9rem",
      marginTop: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-hand)",
      fontSize: "1.2rem",
      color: "var(--ink)"
    }
  }, "\u21B3 it's live \u2014 type a real question"))), /*#__PURE__*/React.createElement(ChatWidget, null)));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
// Pricing — four plans; the Booking Assistant is featured.
function Pricing() {
  const {
    Eyebrow,
    Card,
    Badge
  } = window.SwitchboardDesignSystem_2b7957;
  const plans = [{
    icon: "screen",
    name: "Website Assistant",
    desc: "FAQ answers + basic lead capture.",
    from: "from",
    price: "€399",
    terms: "one-time setup",
    feats: ["FAQ answers", "Lead capture", "Human handoff"],
    best: "Best for getting started"
  }, {
    icon: "calendar",
    name: "Booking Assistant",
    desc: "Qualification + calendar handoff.",
    from: "from",
    price: "€799",
    terms: "one-time setup",
    feats: ["Lead qualification", "Calendar integration", "Booked calls"],
    best: "Best for service businesses",
    featured: true
  }, {
    icon: "link",
    name: "Automation System",
    desc: "Chatbot + CRM + n8n + reports.",
    from: "from",
    price: "€1499+",
    terms: "scales with integrations & workflows",
    feats: ["CRM integration", "n8n workflows", "Reporting & follow-up"],
    best: "Best for growing teams"
  }, {
    icon: "refresh",
    name: "Care & Improvement",
    desc: "Optional. Keeps it accurate and improving.",
    from: "from",
    price: "€99/mo",
    terms: "optional add-on to any build",
    feats: ["Conversation review", "FAQ updates", "Performance reports"],
    best: "Ongoing optimization"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "pricing",
    style: {
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Engagement options"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.8rem,3vw,2.4rem)",
      letterSpacing: "-.02em",
      margin: "12px 0 0"
    }
  }, "Clear pricing. Start small, scale when it works."), /*#__PURE__*/React.createElement("div", {
    className: "price-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "18px",
      marginTop: "36px"
    }
  }, plans.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.name,
    tone: "paper",
    featured: p.featured,
    style: {
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }
  }, p.featured ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "-12px",
      right: "16px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, "Most popular")) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "30px",
      height: "30px",
      marginBottom: "12px",
      background: p.featured ? "var(--orange)" : "var(--ink)",
      WebkitMask: `url(../../assets/icons/${p.icon}.svg) center/contain no-repeat`,
      mask: `url(../../assets/icons/${p.icon}.svg) center/contain no-repeat`
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.08rem",
      margin: 0
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".82rem",
      color: "var(--ink-soft)",
      margin: "5px 0 16px",
      minHeight: "2.5em"
    }
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".72rem",
      color: "var(--ink-soft)",
      fontWeight: 600
    }
  }, p.from), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "2rem",
      lineHeight: 1
    }
  }, p.price), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: ".74rem",
      color: "var(--ink-soft)",
      margin: "4px 0 14px"
    }
  }, p.terms), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      display: "grid",
      gap: "9px",
      flex: 1,
      margin: "0 0 16px",
      padding: 0
    }
  }, p.feats.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: "flex",
      gap: "8px",
      fontSize: ".86rem",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "15px",
      height: "15px",
      marginTop: "3px",
      flex: "none",
      background: "var(--green)",
      WebkitMask: "url(../../assets/icons/check.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/check.svg) center/contain no-repeat"
    }
  }), f))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: ".74rem",
      textTransform: "uppercase",
      letterSpacing: ".03em",
      padding: "9px",
      borderRadius: "8px",
      background: p.featured ? "var(--orange)" : "var(--paper-3)",
      color: p.featured ? "#fff" : "var(--ink)"
    }
  }, p.best)))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: ".92rem",
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Not sure which fits?"), " I'll build you a working demo on your own site \u2014 free \u2014 before you decide anything.")));
}
window.Pricing = Pricing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Process.jsx
try { (() => {
// Process — five numbered steps + a goal banner. Background paper-2.
function Process() {
  const {
    Eyebrow,
    HandUnderline
  } = window.SwitchboardDesignSystem_2b7957;
  const steps = [{
    n: "01",
    icon: "mail",
    title: "You send your website",
    body: "I review your business, services and visitors."
  }, {
    n: "02",
    icon: "search",
    title: "I map the opportunities",
    body: "We define what to answer, qualify and automate."
  }, {
    n: "03",
    icon: "assistant",
    title: "I build & train it",
    body: "Knowledge, flows, rules and integrations."
  }, {
    n: "04",
    icon: "screen",
    title: "I install it on your site",
    body: "One simple script tag. Go live quickly."
  }, {
    n: "05",
    icon: "chart",
    title: "We review & improve",
    body: "I track conversations and make it better."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "process",
    style: {
      background: "var(--paper-2)",
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, /*#__PURE__*/React.createElement(HandUnderline, null, "How the implementation works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: "14px",
      marginTop: "38px",
      alignItems: "start"
    },
    className: "steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "38px",
      height: "38px",
      marginBottom: "12px",
      display: "block",
      background: "var(--ink)",
      WebkitMask: `url(../../assets/icons/${s.icon}.svg) center/contain no-repeat`,
      mask: `url(../../assets/icons/${s.icon}.svg) center/contain no-repeat`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: ".95rem",
      color: "var(--orange)"
    }
  }, s.n), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1rem",
      margin: "4px 0 7px"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".82rem",
      color: "var(--ink-soft)",
      margin: 0,
      lineHeight: 1.45
    }
  }, s.body), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "8px",
      right: "-12px",
      color: "var(--line)",
      fontSize: "1.1rem"
    }
  }, "\u2192") : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "30px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      background: "var(--paper)",
      border: "1.5px solid var(--ink)",
      borderRadius: "14px",
      padding: "20px 24px",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "34px",
      height: "34px",
      flex: "none",
      background: "var(--orange)",
      WebkitMask: "url(../../assets/icons/target.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/target.svg) center/contain no-repeat"
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.1rem"
    }
  }, "All focused on one goal: more qualified leads and booked calls."))));
}
window.Process = Process;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Process.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Proof.jsx
try { (() => {
// Proof — dark band with impact stats and testimonial cards.
function Proof() {
  const {
    Eyebrow,
    Stat
  } = window.SwitchboardDesignSystem_2b7957;
  const stats = [{
    value: "<5s",
    label: "Average time to answer a visitor — day or night"
  }, {
    value: "3×",
    label: "More qualified enquiries vs. a static contact form"
  }, {
    value: "10 min",
    label: "From your site to a working demo you can try"
  }];
  const quotes = ["Visitors used to bounce when no one replied. Now the assistant answers at 11pm and the booked calls are already qualified by the time they reach me.", "Setup was a single script tag. Within a week it was handling the questions my inbox used to drown in, and routing the serious leads to my calendar."];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--dark)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "44px 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "amber"
  }, "Why \"results\" isn't just a word"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.5rem,2.6vw,2.1rem)",
      letterSpacing: "-.02em",
      maxWidth: "14em",
      margin: "12px 0 30px",
      color: "var(--paper)"
    }
  }, "The assistant earns its keep in the first month."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "22px",
      marginBottom: "34px"
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(Stat, {
    key: s.value,
    value: s.value,
    label: s.label,
    onDark: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "18px"
    },
    className: "quotes"
  }, quotes.map((q, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "rgba(241,234,221,.06)",
      border: "1px solid rgba(241,234,221,.16)",
      borderRadius: "12px",
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".96rem",
      lineHeight: 1.5,
      margin: 0
    }
  }, "\"", q, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      fontSize: ".82rem",
      color: "#bcc4bd"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--paper)",
      fontFamily: "var(--font-display)",
      fontWeight: 600
    }
  }, "Sample testimonial"), " \u2014 swap in a real client quote"))))));
}
window.Proof = Proof;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Proof.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SampleBuilds.jsx
try { (() => {
// SampleBuilds ("Work") — highlight video placeholder + three tagged build items.
function SampleBuilds() {
  const {
    Eyebrow,
    Card,
    Badge,
    Button
  } = window.SwitchboardDesignSystem_2b7957;
  const seeing = ["A realistic build brief", "Website + chatbot implementation", "The lead-capture logic", "Calendar handoff", "The owner dashboard"];
  const builds = [{
    tag: "green",
    level: "Beginner",
    title: "Dental Studio — FAQ bot",
    body: "A simple assistant that answers visitor questions and captures contact details."
  }, {
    tag: "amber",
    level: "Intermediate",
    title: "Home Renovations — booking",
    body: "Qualifies the lead, collects project details, and books a call automatically."
  }, {
    tag: "violet",
    level: "Advanced",
    title: "Solar Solutions — automation",
    body: "CRM + n8n system that routes leads, follows up, and reports on results."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "work",
    style: {
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "See it in action"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.8rem,3vw,2.4rem)",
      letterSpacing: "-.02em",
      margin: "14px 0 0",
      maxWidth: "16em"
    }
  }, "Three sample builds. Three levels of complexity."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      marginTop: "14px",
      fontSize: ".96rem",
      maxWidth: "40em",
      lineHeight: 1.55
    }
  }, "These are demo builds I made to show the range \u2014 from a simple FAQ bot to a full automation engine. Each walkthrough is short. Real client work is shared privately on a call."), /*#__PURE__*/React.createElement("div", {
    className: "build-main",
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: "30px",
      alignItems: "start",
      marginTop: "30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      border: "2px solid var(--ink)",
      borderRadius: "14px",
      overflow: "hidden",
      aspectRatio: "16/10",
      background: "linear-gradient(135deg,#1e2a28,#11201e)",
      display: "grid",
      placeItems: "center",
      boxShadow: "var(--shadow-raised)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      padding: "11px 14px",
      color: "var(--paper)",
      fontSize: ".82rem",
      fontWeight: 600,
      background: "linear-gradient(rgba(0,0,0,.55),transparent)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Sample build \xB7 FAQ Chatbot"), /*#__PURE__*/React.createElement("span", null, "2:00 highlight")), /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    "aria-label": "Play highlight",
    style: {
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      background: "rgba(241,234,221,.92)",
      display: "grid",
      placeItems: "center",
      cursor: "pointer",
      border: "2px solid #fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "26px",
      height: "26px",
      marginLeft: "4px",
      background: "var(--ink)",
      WebkitMask: "url(../../assets/icons/play.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/play.svg) center/contain no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "14px",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.3rem",
      display: "block"
    }
  }, "90-second highlight"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: ".84rem",
      color: "#c5cdc4"
    }
  }, "The fastest way to see what an assistant actually does"))), /*#__PURE__*/React.createElement(Card, {
    tone: "sunken",
    flat: true,
    style: {
      border: "1.5px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.05rem",
      margin: "0 0 14px"
    }
  }, "What you'll see"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, seeing.map(s => /*#__PURE__*/React.createElement("li", {
    key: s,
    style: {
      display: "flex",
      gap: "9px",
      alignItems: "flex-start",
      fontSize: ".9rem",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "16px",
      height: "16px",
      flex: "none",
      marginTop: "3px",
      background: "var(--green)",
      WebkitMask: "url(../../assets/icons/check.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/check.svg) center/contain no-repeat"
    }
  }), s))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-hand)",
      fontSize: "1.25rem",
      color: "var(--orange)",
      marginTop: "10px",
      lineHeight: 1.2
    }
  }, "\u21B3 Prefer the long version? Full 10-min builds below."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "16px",
      marginTop: "26px"
    },
    className: "build-list"
  }, builds.map(b => /*#__PURE__*/React.createElement(Card, {
    key: b.title,
    tone: "paper",
    flat: true,
    style: {
      border: "1.5px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: b.tag
  }, b.level), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1rem",
      margin: "10px 0 4px"
    }
  }, b.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".85rem",
      color: "var(--ink-soft)",
      margin: 0,
      lineHeight: 1.5
    }
  }, b.body)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ink)",
      color: "var(--paper)",
      borderRadius: "14px",
      padding: "20px 26px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
      marginTop: "36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "13px",
      fontSize: "1.05rem",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "24px",
      height: "24px",
      flex: "none",
      background: "var(--orange)",
      WebkitMask: "url(../../assets/icons/lightbulb.svg) center/contain no-repeat",
      mask: "url(../../assets/icons/lightbulb.svg) center/contain no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", null, "Want one of these built for ", /*#__PURE__*/React.createElement("b", null, "your"), " website?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    href: "#footcta"
  }, "Start with a free demo \u2192"))));
}
window.SampleBuilds = SampleBuilds;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SampleBuilds.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
// Services — lead column + three numbered service cards.
function Services() {
  const {
    Eyebrow,
    Card
  } = window.SwitchboardDesignSystem_2b7957;
  const svc = [{
    n: "01",
    icon: "assistant",
    title: "AI Chatbot Architecture",
    body: "A website assistant trained on your services, FAQs, offers and rules — ready to answer visitors and guide them to the next step."
  }, {
    n: "02",
    icon: "funnel",
    title: "Omnichannel Funnels",
    body: "Connect website, email, WhatsApp and social into one lead journey — so visitors don't get lost between channels."
  }, {
    n: "03",
    icon: "workflow",
    title: "Custom n8n Workflows",
    body: "Automations that move leads from chat to CRM, email, tasks, calendar and reports — follow-up without the manual copy-paste."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: "var(--paper-2)",
      padding: "62px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-grid",
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 24px",
      display: "grid",
      gridTemplateColumns: ".85fr 1.15fr",
      gap: "48px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "My services"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(1.9rem,3vw,2.5rem)",
      letterSpacing: "-.02em",
      margin: "14px 0 0"
    }
  }, "AI systems that turn conversations into results."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "16px",
      color: "var(--ink-soft)",
      maxWidth: "24em",
      lineHeight: 1.55
    }
  }, "I design and build practical AI and automation that bring more leads, better replies, and cleaner operations \u2014 and that you can actually run without me.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "18px"
    }
  }, svc.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.n,
    tone: "paper",
    style: {
      display: "grid",
      gridTemplateColumns: "auto auto 1fr",
      gap: "20px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "2rem",
      color: "var(--orange)",
      lineHeight: 1
    }
  }, s.n), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "34px",
      height: "34px",
      marginTop: "6px",
      background: "var(--orange)",
      WebkitMask: `url(../../assets/icons/${s.icon}.svg) center/contain no-repeat`,
      mask: `url(../../assets/icons/${s.icon}.svg) center/contain no-repeat`
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.18rem",
      margin: "0 0 7px"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: ".92rem",
      color: "var(--ink-soft)",
      margin: 0,
      lineHeight: 1.5
    }
  }, s.body)))))));
}
window.Services = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ChatBubble = __ds_scope.ChatBubble;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.HandUnderline = __ds_scope.HandUnderline;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.StickyNote = __ds_scope.StickyNote;

})();
