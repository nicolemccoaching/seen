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
    <div style={{ minHeight:"100vh", background:"#0d0d0d", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .s-container { max-width:860px; width:100%; }
        .s-topline { display:flex; align-items:baseline; gap:20px; margin-bottom:36px; animation:fadeUp 1s ease forwards; opacity:0; }
        .s-logo { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:300; color:#e8dcc8; letter-spacing:0.25em; }
        .s-eyebrow { font-family:'Jost',sans-serif; font-size:11px; font-weight:400; color:#8a7968; letter-spacing:0.3em; text-transform:uppercase; }
        .s-heading { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:300; color:#e8dcc8; line-height:1.3; margin-bottom:20px; animation:fadeUp 1s ease 0.2s forwards; opacity:0; }
        .s-body { font-family:'Jost',sans-serif; font-size:15px; font-weight:300; color:#a89880; line-height:1.8; margin-bottom:20px; animation:fadeUp 1s ease 0.4s forwards; opacity:0; }
        .s-checks { margin-bottom:24px; animation:fadeUp 1s ease 0.6s forwards; opacity:0; }
        .s-check { font-family:'Jost',sans-serif; font-size:15px; font-weight:300; color:#c4b49a; line-height:1.7; padding:8px 0; border-bottom:1px solid #1e1a16; display:flex; gap:12px; align-items:flex-start; }
        .s-check:first-child { border-top:1px solid #1e1a16; }
        .s-check-dash { color:#8a7968; flex-shrink:0; margin-top:2px; }
        .s-note { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:300; font-style:italic; color:#8a7968; line-height:1.7; margin-bottom:32px; animation:fadeUp 1s ease 0.8s forwards; opacity:0; }
        .s-buttons { display:flex; flex-direction:column; gap:12px; max-width:400px; animation:fadeUp 1s ease 1s forwards; opacity:0; }
        .s-btn-primary { font-family:'Jost',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.3em; text-transform:uppercase; color:#0d0d0d; background:#e8dcc8; border:none; padding:18px 32px; cursor:pointer; transition:all 0.3s ease; }
        .s-btn-primary:hover { background:#c4b49a; }
        .s-btn-secondary { font-family:'Jost',sans-serif; font-size:11px; font-weight:300; letter-spacing:0.2em; text-transform:uppercase; color:#c4b49a; background:transparent; border:1px solid #6b5f52; padding:16px 32px; cursor:pointer; transition:all 0.3s ease; text-decoration:none; display:block; text-align:center; }
        .s-btn-secondary:hover { background:#2e2820; border-color:#a89880; color:#e8dcc8; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div className="s-container">
        <div className="s-topline">
          <span className="s-logo">SEEN</span>
          <span className="s-eyebrow">Before you begin</span>
        </div>
        <div className="s-heading">An honest note.</div>
        <p className="s-body">SEEN will ask you to look honestly at your past — the relationships that shaped you, the patterns you developed to survive them, and how they show up in your life today. Some of what surfaces may be uncomfortable. That's not a flaw in the process. It's the process working.</p>
        <p className="s-body">This tool works best when you have some support around you. Ask yourself honestly:</p>
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
