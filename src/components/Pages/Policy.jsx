/* src/pages/Policy.jsx */
import React from "react";
import { Link } from "react-router-dom";

const sections = [
  "Introduction",
  "Information We Collect",
  "How We Use Your Information",
  "Cookies & Local Storage",
  "Video / Audio Data",
  "Children’s Privacy (13+)",
  "User Responsibilities",
  "Prohibited Conduct",
  "Account Suspension",
  "Intellectual Property",
  "Disclaimer of Warranties",
  "Limitation of Liability",
  "Changes to This Policy",
  "Contact Us",
];

const Policy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-10 text-gray-300">
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-[#1f2937]/80 p-8 shadow-2xl backdrop-blur-md">
        {/* ── Title ───────────────────────────────────────── */}
        <h1 className="mb-8 text-center text-3xl font-extrabold text-teal-400">
          FaceMeet – Privacy&nbsp;Policy &amp; Terms&nbsp;of&nbsp;Service
        </h1>

        {/* ── Table of contents ───────────────────────────── */}
        <div className="mb-10 space-y-1 rounded-lg bg-black/30 p-4 text-sm">
          <p className="mb-2 font-semibold text-white">Quick&nbsp;Navigation</p>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
            {sections.map((s) => (
              <li key={s}>
                <a href={`#${s.replaceAll(" ", "-")}`} className="text-teal-300 hover:underline">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sections ───────────────────────────────────── */}
        <div className="space-y-12">
          {/* 1 – Introduction */}
          <section id="Introduction">
            <h2 className="mb-4 text-2xl font-bold text-white">1. Introduction</h2>
            <p className="leading-relaxed">
              FaceMeet (“<strong>we</strong>”, “<strong>our</strong>”, “<strong>us</strong>”) provides
              a real-time video chat service that connects users at random.
              This document explains how we collect, use, and protect your
              data, as well as the rules that govern your use of the platform.
              By accessing FaceMeet you agree to every provision below.
            </p>
          </section>

          {/* 2 – Information We Collect */}
          <section id="Information-We-Collect">
            <h2 className="mb-4 text-2xl font-bold text-white">2. Information&nbsp;We&nbsp;Collect</h2>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                <strong>Google account details</strong> – name, e-mail, profile
                picture (OAuth scopes: <code>profile</code>, <code>email</code>)
              </li>
              <li>
                <strong>Match preferences</strong> – age bracket, gender
              </li>
              <li>
                <strong>Session metadata</strong> – IP address (obfuscated),
                device type, connection timestamps, room IDs
              </li>
              <li>
                <strong>Diagnostic logs</strong> – client-side error reports to
                improve stability (opt-in)
              </li>
            </ul>
          </section>

          {/* 3 – How We Use Your Information */}
          <section id="How-We-Use-Your-Information">
            <h2 className="mb-4 text-2xl font-bold text-white">3. How&nbsp;We&nbsp;Use&nbsp;Your&nbsp;Information</h2>
            <p className="mb-4 leading-relaxed">
              We process personal data strictly for the purposes below and for
              no other reason:
            </p>
            <ol className="list-decimal space-y-2 pl-6 leading-relaxed">
              <li>Authenticating you via Google Sign-In</li>
              <li>Matching you with compatible strangers</li>
              <li>Moderating abuse and enforcing community guidelines</li>
              <li>Monitoring aggregate platform performance</li>
              <li>Complying with legal obligations</li>
            </ol>
          </section>

          {/* 4 – Cookies */}
          <section id="Cookies-&-Local-Storage">
            <h2 className="mb-4 text-2xl font-bold text-white">4. Cookies&nbsp;&amp;&nbsp;Local&nbsp;Storage</h2>
            <p className="leading-relaxed">
              We store a short-lived JSON Web Token (JWT) in
              <code>localStorage</code> to keep you logged in. We do&nbsp;<em>not</em>&nbsp;set
              third-party tracking cookies or serve personalised ads.
            </p>
          </section>

          {/* 5 – Video / Audio Data */}
          <section id="Video-/-Audio-Data">
            <h2 className="mb-4 text-2xl font-bold text-white">5. Video&nbsp;/&nbsp;Audio&nbsp;Data</h2>
            <p className="leading-relaxed">
              All streams are peer-to-peer over WebRTC with end-to-end
              encryption. Video and audio are <strong>never</strong> recorded or
              routed through our servers, except transiently for NAT traversal
              (TURN/STUN).
            </p>
          </section>

          {/* 6 – Children’s Privacy */}
          <section id="Children’s-Privacy-(13+)">
            <h2 className="mb-4 text-2xl font-bold text-white">6. Children’s Privacy&nbsp;(13+)</h2>
            <p className="leading-relaxed">
              FaceMeet is intended for users aged 13 and above. If you are under 13
              you may not use the service. Parents who believe their child has
              accessed FaceMeet illegally can contact us for immediate account
              removal.
            </p>
          </section>

          {/* 7 – User Responsibilities */}
          <section id="User-Responsibilities">
            <h2 className="mb-4 text-2xl font-bold text-white">7. User&nbsp;Responsibilities</h2>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              <li>Behave respectfully and comply with local laws</li>
              <li>Do not share personal contact details during a match</li>
              <li>No nudity, harassment, hate speech, or illegal content</li>
              <li>Report abuse via the in-call “End &amp; Report” function</li>
            </ul>
          </section>

          {/* 8 – Prohibited Conduct */}
          <section id="Prohibited-Conduct">
            <h2 className="mb-4 text-2xl font-bold text-white">8. Prohibited&nbsp;Conduct</h2>
            <p className="mb-2 leading-relaxed">
              You may <strong>not</strong>:
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              <li>Use bots or scripts to farm matches</li>
              <li>Record calls without explicit consent</li>
              <li>Transmit malware or phishing links</li>
              <li>Reverse-engineer, decompile, or exploit the platform</li>
            </ul>
          </section>

          {/* 9 – Account Suspension */}
          <section id="Account-Suspension">
            <h2 className="mb-4 text-2xl font-bold text-white">9. Account&nbsp;Suspension</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or permanently ban accounts that
              violate these terms. Offences are logged against your Google ID
              and device fingerprint. Severe or repeat breaches result in a
              permanent ban.
            </p>
          </section>

          {/* 10 – Intellectual Property */}
          <section id="Intellectual-Property">
            <h2 className="mb-4 text-2xl font-bold text-white">10. Intellectual&nbsp;Property</h2>
            <p className="leading-relaxed">
              All FaceMeet trademarks, logos, code, and designs are the property
              of FaceMeet Inc.&nbsp;You may not copy or redistribute any part of
              the service without prior written consent.
            </p>
          </section>

          {/* 11 – Disclaimer */}
          <section id="Disclaimer-of-Warranties">
            <h2 className="mb-4 text-2xl font-bold text-white">11. Disclaimer&nbsp;of&nbsp;Warranties</h2>
            <p className="leading-relaxed">
              FaceMeet is provided “<em>as is</em>” without warranty of any kind.
              We do not guarantee uninterrupted availability or error-free
              operation.
            </p>
          </section>

          {/* 12 – Liability */}
          <section id="Limitation-of-Liability">
            <h2 className="mb-4 text-2xl font-bold text-white">12. Limitation&nbsp;of&nbsp;Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, FaceMeet shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of the platform.
            </p>
          </section>

          {/* 13 – Changes */}
          <section id="Changes-to-This-Policy">
            <h2 className="mb-4 text-2xl font-bold text-white">13. Changes&nbsp;to&nbsp;This&nbsp;Policy</h2>
            <p className="leading-relaxed">
              We may revise this document at any time. Material updates will be
              announced via the FaceMeet homepage with at least 7 days’ notice.
            </p>
          </section>

          {/* 14 – Contact */}
          <section id="Contact-Us">
            <h2 className="mb-4 text-2xl font-bold text-white">14. Contact&nbsp;Us</h2>
            <p className="leading-relaxed">
              Questions or requests? Email us at&nbsp;
              <a href="mailto:support@facemeet.app" className="text-teal-300 hover:underline">
                kumarsarangipritam@gmail.com
              </a>
              &nbsp;or open a ticket in our&nbsp;
              <Link to="/community" className="text-teal-300 hover:underline">
                community forum
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policy;
