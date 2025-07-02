import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiVideo,
  FiMessageCircle,
  FiUploadCloud,
  FiMic,
  FiShield
} from "react-icons/fi";

const features = [
  {
    icon: FiVideo,
    title: "Video Chat with Interests",
    desc: "Get instantly paired with someone who shares your hobbies and passions – all in a secure 1‑to‑1 video room.",
    grad: "from-teal-500 to-cyan-500",
  },
  {
    icon: FiMessageCircle,
    title: "Real‑time Text Chat",
    desc: "Prefer typing? Send lightning‑fast messages alongside the video stream, complete with rich reply threading.",
    grad: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: FiUploadCloud,
    title: "Lightweight File Sharing",
    desc: "Share images or GIFs up to 300 KB without leaving the call – perfect for memes, screenshots, or sketches.",
    grad: "from-blue-500 to-indigo-500",
  },
  {
    icon: FiMic,
    title: "Speech‑to‑Text",
    desc: "Need hands‑free? Click the mic and we’ll transcribe your speech straight into the chat box.",
    grad: "from-amber-500 to-orange-500",
  },
  {
    icon: FiShield,
    title: "AI‑Powered Abuse Reporting",
    desc: "Report any message – our on‑device Xenova model flags toxicity in real time, keeping conversations respectful.",
    grad: "from-rose-500 to-red-500",
  },
  {
  icon: FiMessageCircle,
  title: "Community Blog & Feedback",
  desc: "Post suggestions, report bugs, and connect with the FaceMeet global community. Your voice shapes the platform.",
  grad: "from-green-500 to-emerald-500",
}

];

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-16 text-gray-100">
      {/* header logo */}
      <h1 className="mb-12 text-center text-5xl font-extrabold tracking-tight text-teal-400 drop-shadow-md">
        FaceMeet
      </h1>

      {/* hero card */}
      <div className="mx-auto max-w-5xl rounded-3xl bg-[#1f2937]/80 p-8 backdrop-blur-md shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-semibold text-white">
          Meet strangers <span className="text-teal-400">who get you</span>
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center leading-relaxed text-gray-300">
          FaceMeet a best video and text chatting app that pairs you with new people that share your interests. No accounts, no hassle – just grant cam & mic access and dive straight into engaging conversations.
        </p>

        {/* feature grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, grad }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-gray-700 bg-[#141b29] p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* colorful blur */}
              <div
                className={`absolute -inset-0.5 -z-10 rounded-xl bg-gradient-to-r ${grad} opacity-20 blur-lg group-hover:opacity-30`}
              />
              <Icon className="mb-4 h-9 w-9 text-teal-300" />
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
            </div>
          ))}
        </div>

        {/* cta */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate(isAuth ? "/match" : "/login")}
            className="inline-block rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-10 py-3 text-lg font-bold text-white shadow-md transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400"
          >
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
