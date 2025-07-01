import React from "react";
import {
  FiVideo,
  FiMessageCircle,
  FiUploadCloud,
  FiMic,
  FiShield,
  FiGlobe,
  FiUserCheck,
  FiSmartphone,
  FiUsers,
  FiLock,
  FiFeather,
  FiCpu,
  FiEye,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const primaryFeatures = [
  {
    icon: FiVideo,
    title: "Video Chat with Interests",
    desc: "Enjoy high-quality, low-latency video conversations with people who share your hobbies and passions.",
  },
  {
    icon: FiMessageCircle,
    title: "Real-time Text Chat",
    desc: "Send messages alongside video – with instant delivery, emoji support, and smart reply threading.",
  },
  {
    icon: FiUploadCloud,
    title: "Lightweight File Sharing",
    desc: "Quickly share memes, screenshots, or sketches during conversations (up to 300 KB).",
  },
  {
    icon: FiMic,
    title: "Speech-to-Text",
    desc: "Our hands-free mode lets you speak naturally while your words are transcribed into the chat box in real-time.",
  },
  {
    icon: FiShield,
    title: "AI-Powered Abuse Detection",
    desc: "All messages are automatically screened by our on-device Xenova AI to ensure a respectful, safe environment.",
  },
];

const extendedFeatures = [
  {
    icon: FiGlobe,
    title: "Global Access",
    desc: "Connect instantly with users from different countries, creating diverse conversations and friendships.",
  },
  {
    icon: FiUserCheck,
    title: "Interest-Based Matching",
    desc: "Get paired with users who genuinely share your selected interests – no random match frustrations.",
  },
  {
    icon: FiSmartphone,
    title: "Fully Mobile Responsive",
    desc: "Our app adapts perfectly to phones, tablets, and desktops for a seamless user experience across devices.",
  },
  {
    icon: FiUsers,
    title: "No Registration Required",
    desc: "Just click and connect – we respect your time and privacy, so there’s no need to sign up.",
  },
  {
    icon: FiFeather,
    title: "Clean & Modern UI",
    desc: "Designed with Tailwind CSS, FaceMeet has a sleek, distraction-free UI for both light and dark environments.",
  },
];

const privacySecurity = [
  {
    icon: FiLock,
    title: "Privacy First",
    desc: "We do not store chat histories, video calls, or personal information. Your interactions are private and secure.",
  },
  {
    icon: FiShield,
    title: "Real-time Moderation",
    desc: "Flag abusive behavior and get immediate action. We believe in community-led, AI-enhanced moderation.",
  },
  {
    icon: FiCpu,
    title: "Client-side AI Moderation",
    desc: "Toxic content is detected directly on your device. No message data leaves your browser during analysis.",
  },
];

const techAndAccessibility = [
  {
    icon: FiEye,
    title: "Accessibility for All",
    desc: "Designed to be usable for everyone, including users with disabilities – with keyboard navigation and clear contrast.",
  },
  {
    icon: FiCheckCircle,
    title: "Built with Modern Stack",
    desc: "React, Tailwind CSS, Flask/Node.js, and Hugging Face AI models power FaceMeet’s fast and scalable performance.",
  },
  {
    icon: FiClock,
    title: "99.9% Uptime Guarantee",
    desc: "Hosted on reliable infrastructure like Vercel and Render, ensuring FaceMeet is always available when you need it.",
  },
];

function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000] to-[#0B1120] text-gray-100 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-5xl font-extrabold text-cyan-400 mb-10 drop-shadow">Why FaceMeet?</h1>
        <p className="text-center text-lg text-gray-300 mb-16 max-w-3xl mx-auto">
          FaceMeet is more than just a chat app – it’s a movement toward safer, smarter, and more meaningful digital conversations.
          Built with user-first design and powered by AI, FaceMeet brings people together with trust, security, and fun.
        </p>

        {/* Primary Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">Core Chat Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primaryFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#1f2937]/90 p-6 rounded-xl border border-gray-700 shadow hover:shadow-lg">
                <Icon className="text-cyan-400 mb-4 h-8 w-8" />
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Extended UX Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">User Experience & Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {extendedFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#141b29] p-5 rounded-xl border border-gray-700 shadow hover:shadow-md">
                <Icon className="text-fuchsia-400 mb-3 h-7 w-7" />
                <h4 className="text-lg text-white font-semibold mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-red-400 mb-6 text-center">Privacy & Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privacySecurity.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#111827] p-6 rounded-xl border border-gray-700 shadow hover:shadow-md">
                <Icon className="text-rose-400 mb-3 h-7 w-7" />
                <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology & Performance */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Technology & Reliability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techAndAccessibility.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#1f2937] p-6 rounded-xl border border-gray-700 shadow hover:shadow-md">
                <Icon className="text-amber-400 mb-3 h-7 w-7" />
                <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Whether you're making new friends or just exploring, FaceMeet offers the perfect platform to chat, share, and connect.
          </p>
          <a
            href="/"
            className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-10 py-3 text-lg font-bold text-white shadow-md transition hover:scale-105"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default Features;
