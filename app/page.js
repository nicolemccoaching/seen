"use client";
import { useState, useEffect, useRef } from "react";

const WELCOME_MESSAGE = `Before we begin, I want you to know something.

Most tools ask you to optimize. To track. To fix.

This isn't that.

SEEN is a space to look honestly at yourself — where you came from, what you learned, what you've been carrying, and how all of it shows up in the life you're living right now.

There are no right answers here. The most honest answer is always the right one.

Write like no one is reading. Because right now, no one is — except you.

When you're ready, tell me this: Who raised you? Not their resume — their presence. What were they like to actually be around?`;

export default function SEEN() {
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState("screening");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Something interrupted us. Take a breath and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (screen === "screening") return (
    <div style={{ minHeight:"100vh", background:"#0d0d0d", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .s-container { max-width:580px; width:100%; }
        .s-eyebrow { font-family:'Jost',sans-serif; font-size:10px; font-weight:400; color:#8a7968; letter-spacing:0.3em; text-transform:uppercase; margin-bottom:32px; animation:fadeUp 1s ease forwards; opacity:0; }
        .s-heading { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:300; color:#e8dcc8; line-height:1.4; margin-bottom:24px; animation:fadeUp 1s ease 0.2s forwards; opacity:0; }
        .s-body { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; color:#a89880; line-height:1.9; margin-bottom:32px; animation:fadeUp 1s ease 0.4s forwards; opacity:0; }
        .s-checks { margin-bottom:40px; animation:fadeUp 1s ease 0.6s forwards; opacity:0; }
        .s-check { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; color:#c4b49a; line-height:1.8; padding:12px 0; border-bottom:1px solid #1e1a16; display:flex; gap:12px; align-items:flex-start; }
        .s-check-dash { color:#8a7968; flex-shrink:0; margin-top:2px; }
        .s-note { font-family:'Cormorant Garamond',serif; font-size:16px; font-weight:300; font-style:italic; color:#8a7968; line-height:1.7; margin-bottom:40px; animation:fadeUp 1s ease 0.8s forwards; opacity:0; }
        .s-buttons { display:flex; flex-direction:column; gap:12px; animation:fadeUp 1s ease 1s forwards; opacity:0; }
        .s-btn-primary { font-family:'Jost',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.3em; text-transform:uppercase; color:#0d0d0d; background:#e8dcc8; border:none; padding:18px 32px; cursor:pointer; transition:all 0.3s ease; }
        .s-btn-primary:hover { background:#c4b49a; }
        .s-btn-secondary { font-family:'Jost',sans-serif; font-size:11px; font-weight:300; letter-spacing:0.2em; text-transform:uppercase; color:#6b5f52; background:transparent; border:1px solid #2e2820; padding:16px 32px; cursor:pointer; transition:all 0.3s ease; text-decoration:none; display:block; text-align:center; }
        .s-btn-secondary:hover { color:#a89880; border-color:#6b5f52; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div className="s-container">
        <div className="s-eyebrow">Before you begin</div>
        <div className="s-heading">An honest note.</div>
        <p className="s-body">SEEN will ask you to look honestly at your past — the relationships that shaped you, the patterns you developed to survive them, and how they show up in your life today. Some of what surfaces may be uncomfortable. That's not a flaw in the process. It's the process working.</p>
        <p className="s-body" style={{marginTop:'-16px'}}>This tool works best when you have some support around you. Ask yourself honestly:</p>
        <div className="s-checks">
          <div className="s-check"><span className="s-check-dash">—</span><span>Am I in a relatively stable place right now, even if things are hard?</span></div>
          <div className="s-check"><span className="s-check-dash">—</span><span>Do I have at least one person — a therapist, a trusted friend, someone — I can talk to if something comes up?</span></div>
          <div className="s-check"><span className="s-check-dash">—</span><span>Am I approaching this from curiosity about myself, rather than in the middle of a crisis?</span></div>
        </div>
        <p className="s-note">If you answered no to any of these, we'd gently encourage you to do this alongside a therapist rather than alone. Not because something is wrong with you — but because what you might uncover deserves proper support around it.</p>
        <div className="s-buttons">
          <button className="s-btn-primary" onClick={() => setScreen("intro")}>I'm ready — Begin</button>
          <a className="s-btn-secondary" href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer">I'd like to find a therapist first</a>
        </div>
      </div>
    </div>
  );

  if (screen === "intro") return (
    <div style={{ minHeight:"100vh", background:"#0d0d0d", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .wordmark { font-family:'Cormorant Garamond',serif; font-size:72px; font-weight:300; color:#e8dcc8; letter-spacing:0.3em; margin-bottom:8px; animation:fadeUp 1.2s ease forwards; opacity:0; }
        .tagline { font-family:'Jost',sans-serif; font-size:11px; font-weight:300; color:#c4b49a; letter-spacing:0.25em; text-transform:uppercase; margin-bottom:64px; animation:fadeUp 1.2s ease 0.3s forwards; opacity:0; }
        .divider { width:1px; height:48px; background:linear-gradient(to bottom,transparent,#8a7968,transparent); margin:0 auto 48px; animation:fadeUp 1s ease 0.5s forwards; opacity:0; }
        .intro-text { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:300; font-style:italic; color:#c4b49a; line-height:1.8; margin-bottom:16px; animation:fadeUp 1s ease 0.7s forwards; opacity:0; }
        .intro-sub { font-family:'Jost',sans-serif; font-size:13px; font-weight:300; color:#a89880; line-height:1.9; margin-bottom:56px; animation:fadeUp 1s ease 0.9s forwards; opacity:0; }
        .begin-btn { font-family:'Jost',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.3em; text-transform:uppercase; color:#0d0d0d; background:#e8dcc8; border:none; padding:16px 48px; cursor:pointer; transition:all 0.3s ease; animation:fadeUp 1s ease 1.1s forwards; opacity:0; }
        .begin-btn:hover { background:#c4b49a; transform:translateY(-1px); }
        .privacy { font-family:'Jost',sans-serif; font-size:11px; font-weight:300; color:#6b5f52; margin-top:24px; animation:fadeUp 1s ease 1.3s forwards; opacity:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{ maxWidth:"560px", width:"100%", textAlign:"center" }}>
        <div className="wordmark">SEEN</div>
        <div className="tagline">A self-reflection experience for women who lead</div>
        <div className="divider" />
        <p className="intro-text">You've mastered the art of functioning.<br />This is the space to understand why.</p>
        <p className="intro-sub">A guided conversation rooted in psychology and science.<br />No optimization. No tracking. No fixing.<br />Just an honest look at yourself — where you came from,<br />what you learned, and what you've been carrying.</p>
        <button className="begin-btn" onClick={() => setScreen("chat")}>Begin</button>
        <p className="privacy">Your responses are private and never stored.</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#0d0d0d", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .header { padding:24px 32px; border-bottom:1px solid #1e1a16; display:flex; align-items:center; gap:16px; position:sticky; top:0; background:#0d0d0d; z-index:10; }
        .header-wordmark { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300; color:#e8dcc8; letter-spacing:0.25em; }
        .header-div { width:1px; height:20px; background:#2e2820; }
        .header-sub { font-family:'Jost',sans-serif; font-size:10px; font-weight:300; color:#a89880; letter-spacing:0.2em; text-transform:uppercase; }
        .messages { flex:1; overflow-y:auto; padding:48px 24px; max-width:680px; width:100%; margin:0 auto; }
        .msg { margin-bottom:40px; animation:msgFade 0.5s ease forwards; opacity:0; }
        .assistant-msg { font-family:'Cormorant Garamond',serif; font-size:19px; font-weight:400; color:#e8dcc8; line-height:1.85; white-space:pre-wrap; }
        .user-wrap { display:flex; justify-content:flex-end; }
        .user-msg { font-family:'Jost',sans-serif; font-size:14px; font-weight:300; color:#e8dcc8; line-height:1.75; background:#1a1510; border:1px solid #2e2820; padding:16px 20px; max-width:85%; white-space:pre-wrap; }
        .dots { display:flex; gap:6px; align-items:center; padding:8px 0; }
        .dot { width:5px; height:5px; background:#8a7968; border-radius:50%; animation:pulse 1.4s ease infinite; }
        .dot:nth-child(2){animation-delay:0.2s} .dot:nth-child(3){animation-delay:0.4s}
        .input-area { border-top:1px solid #1e1a16; padding:24px; background:#0d0d0d; position:sticky; bottom:0; }
        .input-inner { max-width:680px; margin:0 auto; display:flex; gap:12px; align-items:flex-end; }
        .input-field { flex:1; background:#111009; border:1px solid #2e2820; color:#e8dcc8; font-family:'Jost',sans-serif; font-size:14px; font-weight:300; line-height:1.7; padding:14px 18px; resize:none; min-height:52px; max-height:200px; outline:none; transition:border-color 0.2s ease; overflow-y:auto; }
        .input-field::placeholder { color:#8a7968; }
        .input-field:focus { border-color:#8a7968; }
        .send-btn { background:#e8dcc8; border:none; color:#0d0d0d; font-family:'Jost',sans-serif; font-size:10px; font-weight:500; letter-spacing:0.2em; text-transform:uppercase; padding:14px 20px; cursor:pointer; transition:all 0.2s ease; white-space:nowrap; height:52px; flex-shrink:0; }
        .send-btn:hover:not(:disabled) { background:#c4b49a; }
        .send-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .input-hint { font-family:'Jost',sans-serif; font-size:10px; font-weight:300; color:#3d3528; text-align:center; margin-top:12px; }
        .messages::-webkit-scrollbar { width:4px; }
        .messages::-webkit-scrollbar-thumb { background:#2e2820; border-radius:2px; }
        @keyframes msgFade { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,80%,100%{opacity:0.3;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
      `}</style>

      <div className="header">
        <div className="header-wordmark">SEEN</div>
        <div className="header-div" />
        <div className="header-sub">Your conversation is private</div>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className="msg">
            {msg.role === "assistant"
              ? <div className="assistant-msg">{msg.content}</div>
              : <div className="user-wrap"><div className="user-msg">{msg.content}</div></div>
            }
          </div>
        ))}
        {loading && <div className="msg"><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <div className="input-inner">
          <textarea ref={textareaRef} className="input-field" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Write honestly. Take your time." rows={1} />
          <button className="send-btn" onClick={sendMessage} disabled={!input.trim() || loading}>Send</button>
        </div>
        <div className="input-hint">Press Enter to send · Shift + Enter for new line</div>
      </div>
    </div>
  );
}
