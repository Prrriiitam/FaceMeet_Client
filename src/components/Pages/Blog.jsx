import React from "react";
import { FaBolt, FaRocket, FaCalendarAlt, FaTools, FaUsers, FaShieldAlt, FaPaintBrush } from "react-icons/fa";
import { motion } from "framer-motion";

const upcomingPosts = [
  {
    title: "Match History & Reconnect",
    date: "Coming Soon",
    icon: FaCalendarAlt,
    content:
      "Users will be able to view recent chats and reconnect with matched users if both agree — bringing continuity to your best conversations.",
  },
  {
    title: "Group Chat Rooms",
    date: "Planned",
    icon: FaUsers,
    content:
      "Beyond 1-to-1, we’re adding public interest-based group video rooms — like co-working, language exchange, and hobby hangouts!",
  },
  {
    title: "AI Avatar Summaries",
    date: "Q3 2025",
    icon: FaRocket,
    content:
      "Coming soon: AI will auto-summarize your chats and suggest topic starters based on past conversations, making connections even smoother.",
  },
  {
    title: "Dark Mode Toggle & Themes",
    date: "Near Future",
    icon: FaTools,
    content:
      "Let your personality shine with color themes, emoji reactions, and a fully customizable chat experience.",
  },
  {
    title: "Advanced Moderation Tools",
    date: "Q3 2025",
    icon: FaShieldAlt,
    content:
      "Admins will have better tools to report, block, and moderate users in real-time — powered by our AI moderation engine.",
  },
  {
    title: "Custom Avatars & Animations",
    date: "In Design",
    icon: FaPaintBrush,
    content:
      "Users will be able to create custom avatars, animated reactions, and even share AR filters while chatting for a more playful experience.",
  },
  {
    title: "Mobile App (iOS & Android)",
    date: "Q4 2025",
    icon: FaBolt,
    content:
      "A full-featured mobile app is on the way for iOS and Android users — with notifications, better performance, and native support.",
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0B1120] px-4 py-16 text-gray-200">
      <div className="mx-auto w-full max-w-5xl space-y-12">
        <h1 className="text-center text-5xl font-extrabold text-cyan-400 drop-shadow">
          FaceMeet Dev Blog
        </h1>
        <p className="text-center max-w-2xl mx-auto text-lg text-gray-400">
          Stay up to date with new features, upcoming improvements, and exciting announcements for the FaceMeet platform.
        </p>

        {/* Upcoming Features */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-teal-300">🚀 Upcoming Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingPosts.map(({ title, date, content, icon: Icon }) => (
              <motion.div
                key={title}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-gray-700 bg-[#1f2937]/80 p-6 shadow-md transition duration-200 hover:shadow-lg"
              >
                <div className="mb-2 flex items-center gap-2 text-teal-300">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300 mb-4">
            Want to suggest a feature or report a bug?
          </p>
          <a
            href="mailto:kumarsarangipritam@gmail.com"
            className="inline-block rounded-full bg-gradient-to-r from-cyan-500 to-teal-600 px-8 py-3 text-sm font-bold text-white shadow hover:scale-105"
          >
            Contact Developer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;