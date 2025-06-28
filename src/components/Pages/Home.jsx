import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth }    from "../../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  return (
     <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0B1120] to-black">
      <div
        className="mx-4 w-full max-w-2xl rounded-xl border border-gray-700 bg-[#1f2937]/80
                   shadow-2xl backdrop-blur-md p-8"
      >
        <h1 className="mb-2 text-center text-4xl font-extrabold text-teal-400">
          FaceMeet
        </h1>
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Meet strangers with your interests!
        </h2>

        <p className="mb-4 text-justify text-gray-200 leading-relaxed">
          FaceMeet is a smart way to meet new people with similar interests.
          Get matched instantly and start a one-on-one video conversation — no
          account needed. Stay safe and anonymous unless you choose otherwise.
        </p>

        <p className="mb-10 text-justify text-gray-300 leading-relaxed">
          Just allow access to your camera and mic, choose your interests, and
          press the button below. It's simple, safe, and fun.
        </p>

        <div className="text-center">
          <button
            className="w-40 rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3
                       font-semibold text-white transition-transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-teal-400"
            onClick={() => navigate(isAuth ? "/match" : "/login")}
          >
            Video Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home