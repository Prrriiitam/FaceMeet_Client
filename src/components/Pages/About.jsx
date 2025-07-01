import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLaptopCode,
  FaProjectDiagram,
  FaExternalLinkAlt,
} from "react-icons/fa";

/**
 * Modernised About page – drop‑in replacement.
 * TailwindCSS + Framer Motion + react‑icons.
 * Follows shadcn/ui design language (soft shadows, 2xl corners, generous padding).
 */

const projects = [
  {
    title: "FaceMeet – Random Video Chat",
    blurb:
      "Real‑time React + Socket.io platform that pairs strangers for 1‑to‑1 video & text conversations. Features Google OAuth, interest‑based matching, speech to text functionality, small file sharing and AI‑powered toxicity filters.",
    tech: [
      "React",
      "Node.js",
      "Socket.io",
      "WebRTC",
      "Tailwind",
      "HuggingFace",
    ],
    link: "https://facemeetclient.vercel.app/",
  },
  {
    title: "Monkeypox Disease Prediction",
    blurb:
      "CNN ensemble (MobileNetV2 ✕ ResNet50V2) trained on dataset. Flask REST API serves predictions; React dashboard visualises confidence scores and Grad‑CAM heat‑maps for interpretability.",
    tech: ["Python", "Flask", "TensorFlow", "React", "Colab"],
    link: "https://github.com/Prrriiitam/monkeypox-frontend",
  },
  {
    title: "AI‑Powered Loan Approval",
    blurb:
      "Gradient Boosting & SHAP explainability on German Credit dataset. Streamlit UI lets bank officers explore applicant risk with transparent model insights.",
    tech: ["Python", "Streamlit", "XGBoost", "Pandas"],
    link: "https://github.com/Prrriiitam/Loan_Credit_Risk",
  },
  {
    title: "ResumeBuilder",
    blurb:
      "Drag‑and‑drop résumé builder that exports polished PDFs. Offers live preview, customized colors and download feature",
    tech: ["React js", "Tailwind", "React‑PDF"],
    link: "https://github.com/Prrriiitam/ResumeBuilder",
  },
];

const About = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#00040d] to-black px-4 py-14 text-gray-300">
    <div className="mx-auto w-full max-w-6xl space-y-16 rounded-3xl bg-[#0f172a]/80 p-10 shadow-2xl backdrop-blur-md">
      {/* ── Hero ───────────────────────────────── */}
      <section className="flex flex-col items-center gap-10 md:flex-row">
        {/* avatar */}
        <motion.img
          src="/images/pritam.jpg" // replace with actual path
          alt="Pritam Kumar Sarangi"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="h-52 w-52 rounded-full object-cover ring-4 ring-teal-500 shadow-lg"
        />

        {/* intro */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-teal-400 drop-shadow">
            Pritam Kumar Sarangi
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-gray-200">
            Full‑Stack Developer · ML Enthusiast
          </h2>
          <p className="mt-4 leading-relaxed">
            Final‑year <span className="font-medium text-teal-300">B.Tech CSE</span> student passionate about real‑time,
            AI‑powered web applications. Creator of&nbsp;
            <span className="font-medium text-teal-300">FaceMeet</span>, <span className="font-medium text-teal-300">Monkeypox&nbsp;Detection</span>,
            and an <span className="font-medium text-teal-300">AI‑driven Loan Approval</span> system. Constantly exploring the
            intersection of <span className="underline decoration-teal-400/60">machine learning</span> and modern web tech.
          </p>

          {/* social icons */}
          <div className="mt-6 flex justify-center gap-6 md:justify-start">
            <a href="https://github.com/prrriiitam" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub className="h-7 w-7 transition hover:text-teal-400" />
            </a>
            <a href="https://www.linkedin.com/in/pritam-kumar-sarangi-7b952a232/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="h-7 w-7 transition hover:text-teal-400" />
            </a>
            <a href="mailto:kumarsarangipritam@gmail.com" aria-label="Email">
              <FaEnvelope className="h-7 w-7 transition hover:text-teal-400" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────── */}
      <section>
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
          <FaLaptopCode className="text-teal-400" /> Tech Stack
        </h3>
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            "React",
            "Node.js",
            "Express",
            "Socket.io",
            "WebRTC",
            "Python",
            "Flask",
            "TensorFlow / Keras",
            "Pandas",
            "MongoDB",
            "MySQL",
            "Git & GitHub",
            "Tailwind CSS",
          ].map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-teal-500/70 bg-teal-500/10 px-3 py-1 shadow-sm hover:bg-teal-500/20"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Projects ───────────────────────────── */}
      <section>
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
          <FaProjectDiagram className="text-teal-400" /> Highlighted Projects
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(({ title, blurb, tech, link }) => (
            <a
              key={title}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-gray-700 bg-[#090e1a]/80 p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* gradient ring */}
              <span className="absolute -inset-[1px] -z-10 rounded-2xl bg-gradient-to-r from-teal-500/60 via-cyan-500/60 to-indigo-500/60 opacity-0 blur-lg transition group-hover:opacity-40" />

              <h4 className="text-lg font-semibold text-teal-300 drop-shadow flex items-center gap-2">
                {title}
                <FaExternalLinkAlt className="h-3 w-3 opacity-70 group-hover:translate-x-0.5 transition" />
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400 flex-1">
                {blurb}
              </p>

              {/* tech chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-teal-600/20 px-2 py-0.5 text-xs text-teal-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────── */}
      <footer className="pt-8 text-center text-sm text-gray-500">
        Have an exciting idea or just want to chat?&nbsp;
        <a
          href="mailto:kumarsarangipritam@gmail.com"
          className="font-medium text-teal-300 hover:underline"
        >
          Drop me a line
        </a>
        .
      </footer>
    </div>
  </div>
);

export default About;
