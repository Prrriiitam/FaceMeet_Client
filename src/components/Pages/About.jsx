/* src/pages/About.jsx */
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaLaptopCode, FaProjectDiagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-10 text-gray-300">
      {/* outer card */}
      <div className="mx-auto w-full max-w-5xl space-y-12 rounded-xl bg-[#1f2937]/80 p-8 shadow-2xl backdrop-blur-md">

        {/* ── Hero / profile ───────────────────────── */}
        <section className="flex flex-col items-center gap-8 md:flex-row">
          {/* avatar */}
          <img
            src="/images/pritam.jpg"   /* swap with your real photo */
            alt="Pritam Kumar Sarangi"
            className="h-48 w-48 rounded-full object-cover ring-4 ring-teal-500"
          />

          {/* intro */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-teal-400">
              Pritam&nbsp;Kumar&nbsp;Sarangi
            </h1>
            <h2 className="mt-1 text-xl font-semibold text-gray-200">
              Full-Stack&nbsp;Developer&nbsp;• ML&nbsp;Enthusiast
            </h2>
            <p className="mt-4 leading-relaxed">
              Final-year B.Tech CSE student passionate about building
              real-time, AI-powered web apps. Creator of&nbsp;
              <span className="text-teal-300 font-medium">FaceMeet</span>
              &nbsp;and a Monkeypox Disease&nbsp;Prediction platform.
              Loves React, Node, Flask, and all things Machine&nbsp;Learning.
            </p>

            {/* social icons */}
            <div className="mt-4 flex justify-center gap-6 md:justify-start">
              <a href="https://github.com/prrriiitam" target="_blank" rel="noreferrer">
                <FaGithub className="h-6 w-6 hover:text-teal-400" />
              </a>
              <a href="https://www.linkedin.com/in/pritam-kumar-sarangi-7b952a232/" target="_blank" rel="noreferrer">
                <FaLinkedin className="h-6 w-6 hover:text-teal-400" />
              </a>
              <a href="mailto:pritam@example.com">
                <FaEnvelope className="h-6 w-6 hover:text-teal-400" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────── */}
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
            <FaLaptopCode /> Tech&nbsp;Stack
          </h3>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-200">
            {[
              "React",
              "Tailwind CSS",
              "Node.js",
              "Express",
              "Socket.io",
              "Python",
              "Flask",
              "TensorFlow / Keras",
              "Pandas",
              "MongoDB",
              "MySQL",
              "Git & GitHub",
            ].map((s) => (
              <li
                key={s}
                className="rounded-full border border-teal-500 px-3 py-1 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Projects ────────────────────────────── */}
        <section>
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
            <FaProjectDiagram /> Highlighted&nbsp;Projects
          </h3>
          <div className="space-y-6">
            <div className="rounded-lg bg-black/30 p-4 shadow">
              <h4 className="text-lg font-semibold text-teal-300">
                FaceMeet – Random Video Chat
              </h4>
              <p className="mt-1 text-sm leading-relaxed">
                Real-time React + Socket.io web app that pairs strangers,
                featuring Google OAuth, peer-to-peer WebRTC video, interest-based
                matching, and a sleek dark UI.
              </p>
            </div>
            <div className="rounded-lg bg-black/30 p-4 shadow">
              <h4 className="text-lg font-semibold text-teal-300">
                Monkeypox Disease Prediction
              </h4>
              <p className="mt-1 text-sm leading-relaxed">
                MobileNetV2 + ResNet50V2 CNN ensemble trained in Colab; Flask API
                and React dashboard deliver fast, accurate rash classification.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer / CTA ────────────────────────── */}
        <footer className="pt-6 text-center text-sm text-gray-500">
          Want to collaborate or just say hi? Drop me an&nbsp;
          <a 
          href="mailto:kumarsarangipritam@gmail.com" 
          className="text-teal-300 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
         >
         email
          </a> 
          !
        </footer>
      </div>
    </div>
  );
};

export default About;
