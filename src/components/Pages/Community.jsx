import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaQuestionCircle, FaUserFriends } from "react-icons/fa";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black text-white px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-16 rounded-xl bg-[#1f2937]/80 p-8 shadow-xl backdrop-blur-md">

        {/* ── Welcome Section ───────────────────────────── */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-teal-400">Join the FaceMeet Community</h1>
          <p className="mt-4 text-gray-300">
            Connect. Collaborate. Contribute.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="https://discord.com/invite/facemeet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-5 py-2 font-semibold text-white shadow hover:bg-teal-500"
            >
              <FaDiscord /> Join Our Discord
            </a>
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-teal-400 px-5 py-2 font-semibold text-teal-300 hover:bg-teal-900/40"
            >
              <FaGithub /> Contribute on GitHub
            </a>
          </div>
        </section>

        {/* ── FAQ Section ─────────────────────────────── */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white flex items-center gap-2">
            <FaQuestionCircle /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-teal-300">Is FaceMeet free to use?</h3>
              <p className="text-gray-300">Yes! FaceMeet is 100% free for all users.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-300">Do we store chat recordings?</h3>
              <p className="text-gray-300">No. All calls are peer-to-peer and encrypted.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-teal-300">Can I report someone?</h3>
              <p className="text-gray-300">
                Yes. Use the “Report” button during a call to flag abuse or misconduct This will be shortly available.
              </p>
            </div>
          </div>
        </section>

        {/* ── Community Rules ─────────────────────────── */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-white flex items-center gap-2">
            <FaUserFriends /> Community Guidelines
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-300">
            <li>Be respectful. No hate speech or harassment.</li>
            <li>Don’t share your personal contact info in chat.</li>
            <li>No nudity, illegal activity, or explicit content.</li>
            <li>Use headphones and proper lighting for a better experience.</li>
            <li>Contribute positively — in code or conversation!</li>
          </ul>
        </section>

        {/* ── Contact / Footer ────────────────────────── */}
        <footer className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          Built with ❤️ by the FaceMeet Team •{" "}
          <Link to="/policy" className="text-teal-300 hover:underline">
            Privacy Policy
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Community;
