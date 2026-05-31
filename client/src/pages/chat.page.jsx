import { Send } from "lucide-react";

export default function ChatPage() {
  const messages = [
    {
      role: "assistant",
      content:
        "Welcome back Himanshu. Your birth chart is ready. What would you like guidance on today?",
    },
    {
      role: "user",
      content: "What does my chart say about my career?",
    },
    {
      role: "assistant",
      content:
        "Your chart suggests a strong inclination toward communication, leadership, and problem-solving. You may thrive in roles that combine analytical thinking with creativity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex flex-col">
      {/* Header */}
      <header className="border-b border-stone-200 bg-[#F8F4EE]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Aradhana
            </p>

            <h1 className="font-heading text-2xl text-stone-900">
              Astrology <span className="text-orange-500">Companion</span>
            </h1>
          </div>

          <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center">
            A
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="text-center mb-10">
            <span className="text-sm text-stone-500">
              Today • 31 May 2026
            </span>
          </div>

          <div className="space-y-8">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-3xl px-6 py-5 ${
                    msg.role === "user"
                      ? "bg-stone-900 text-white"
                      : "bg-white border border-stone-200 text-stone-800"
                  }`}
                >
                  <p className="leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Input */}
      <div className="border-t border-stone-200 bg-[#F8F4EE]">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="bg-white border border-stone-200 rounded-full flex items-center px-5 h-14">
            <input
              type="text"
              placeholder="Ask about your chart, relationships..."
              className="flex-1 bg-transparent outline-none text-stone-800"
            />

            <button className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:scale-105 transition">
              <Send size={18} />
            </button>
          </div>

          <p className="text-center text-xs text-stone-500 mt-3">
            Astrology is for guidance and reflection, not medical,
            legal, or financial certainty.
          </p>
        </div>
      </div>
    </div>
  );
}