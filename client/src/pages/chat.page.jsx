import { Send } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import api from "../service/api.service";

export default function ChatPage() {
  const userId = localStorage.getItem("astroUserId");
  const [ques, setques] = useState("");
  const [messages, setmessages] = useState([]);
  const [name, setName] = useState(localStorage.getItem("astroUserName"));
  const bottomRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ques.trim() || isLoading) return;

    const userMessage = { role: "user", content: ques };
    setmessages((prev) => [...prev, userMessage]);
    setques("");
    setIsLoading(true);
    setStatusText("Thinking...");

    try {
      const response = await fetch("http://localhost:3000/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: "user", content: userMessage.content }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // incomplete line baad mein aayegi

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const { type, data } = JSON.parse(line.slice(6));

            if (type === "status") {
              setStatusText(data);
            } else if (type === "end") {
              setmessages((prev) => [
                ...prev,
                { role: "assistant", content: data.finalResponse },
              ]);
              setIsLoading(false);
              setStatusText("");
            }
          } catch (err) {
            // skip
          }
        }
      }
    } catch (error) {
      console.log(error);
      setmessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
      setIsLoading(false);
      setStatusText("");
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get(`/chat/${userId}`);
        setmessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, statusText]);

  return (
    <div className="h-screen bg-[#F5F0E8] flex flex-col overflow-hidden">

      {/* subtle grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Header */}
      <header className="shrink-0 border-b border-stone-200/80 bg-[#F5F0E8]/95 backdrop-blur-md z-20">
        <div className="max-w-3xl mx-auto px-8 h-[72px] flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-semibold">
              Aradhana
            </p>
            <h1
              className="text-[22px] text-stone-900 leading-none"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.01em" }}
            >
              Astrology{" "}
              <span className="text-orange-500 italic">Companion</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {isLoading && (
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-medium tracking-wide shadow-sm">
              {name ? name.charAt(0).toUpperCase() : "A"}
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-3xl mx-auto px-8 py-8">

          {/* Date divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-[11px] text-stone-400 tracking-widest uppercase font-medium">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Message list */}
          <div className="flex flex-col gap-5">
            {messages.length !== 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center mr-3 mt-1 shrink-0">
                      <span className="text-[10px]">✦</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] md:max-w-[65%] px-5 py-4 ${msg.role === "user"
                        ? "bg-stone-900 text-stone-100 rounded-[20px] rounded-tr-md shadow-sm"
                        : "bg-white text-stone-700 rounded-[20px] rounded-tl-md border border-stone-100 shadow-sm"
                      }`}
                  >
                    <p
                      className="leading-relaxed text-[14.5px]"
                      style={{ fontFamily: msg.role === "assistant" ? "'Georgia', serif" : "inherit" }}
                    >
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">✦</span>
                </div>
                <p
                  className="text-stone-500 text-[15px] leading-relaxed max-w-xs mx-auto"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Welcome back{name ? `, ${name}` : ""}. Your birth chart is ready.
                  <br />
                  <span className="text-stone-400 text-sm">What would you like guidance on today?</span>
                </p>
              </div>
            )}

            {/* Loading bubble */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <span className="text-[10px]">✦</span>
                </div>
                <div className="bg-white border border-stone-100 rounded-[20px] rounded-tl-md shadow-sm px-5 py-4">
                  {statusText ? (
                    <p
                      className="text-[13.5px] text-stone-400 italic animate-pulse"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {statusText}
                    </p>
                  ) : (
                    <div className="flex gap-1.5 items-center h-4">
                      <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div ref={bottomRef} className="h-2" />
        </div>
      </main>

      {/* Input */}
      <div className="shrink-0 border-t border-stone-200/80 bg-[#F5F0E8]/95 backdrop-blur-md z-20">
        <div className="max-w-3xl mx-auto px-8 py-5">
          <div className="bg-white border border-stone-200 rounded-2xl flex items-center px-4 py-2 shadow-sm gap-2 focus-within:border-stone-400 transition-colors duration-200">
            <input
              type="text"
              placeholder="Ask about your chart, relationships..."
              className="flex-1 bg-transparent outline-none text-stone-800 text-sm py-2 px-2 placeholder:text-stone-400"
              value={ques}
              onChange={(e) => setques(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !ques.trim()}
              className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-center text-[11px] text-stone-400 mt-3 tracking-wide">
            Astrology is for guidance and reflection, not medical, legal, or financial certainty.
          </p>
        </div>
      </div>
    </div>
  );
}