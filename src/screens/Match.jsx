import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { FaUserAlt, FaVenusMars, FaSmile, FaSpinner } from "react-icons/fa";

const MatchScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [error, setError] = useState("");


  const socket = useSocket();
  const nav = useNavigate();

  // Ask server to enqueue me
  const handleCallRequest = useCallback(() => {
    if (!age || !gender) {
      setError("Please enter both age and gender.");
      return;
    }
    setError("");
    socket.emit("queue:join", { email, name, age, gender });
    setIsWaiting(true);
    
    
      
  }, [email, name, age, gender, socket]);

  // Server paired me with a stranger
  useEffect(() => {
    socket.on("match:paired", ({ roomId, peerId, peerEmail, peerName, peerAge, peerGender, initiator }) => {
      setIsWaiting(false);
      nav(`/room/${roomId}`, { state: { peerId, initiator, peerEmail, peerName, peerAge, peerGender } })});
    return () => socket.off("match:paired");
  }, [socket, nav]);

  return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0B1120] to-black px-4">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 rounded-xl bg-[#1f2937]/80 p-8 text-white shadow-2xl backdrop-blur-md md:grid-cols-2">
        {/* ========== Left: Form ========== */}
        <div>
          <h1 className="mb-1 text-2xl font-extrabold text-teal-400">
            FaceMeet – Random Chat
          </h1>
          <p className="mb-6 text-sm text-gray-300">
            Tell us a bit about you so we can find the best match.
          </p>
      {!isWaiting && (
      <>
      <label className="mb-2 block text-sm font-medium text-gray-200">
      <FaUserAlt className="mr-1 inline" /> Age
      </label>
      <input 
        min="13"
        max="120"
        type="number"
        value={age}
        onChange={e => setAge(e.target.value)}
        className="mb-4 w-full rounded-md border border-gray-600 bg-gray-900/60
        p-2 text-white placeholder-gray-500 focus:border-teal-500 focus:outline-none"
        placeholder="18"
      />
      <label className="mb-2 block text-sm font-medium text-gray-200">
      <FaVenusMars className="mr-1 inline" /> Gender
      </label>
      <select 
        value={gender}
        onChange={e => setGender(e.target.value)}
        className="mb-6 w-full rounded-md border border-gray-600 bg-gray-900/60
        p-2 text-white focus:border-teal-500 focus:outline-none"
      >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
      </select>
       {error && (
            <p className="mb-4 text-sm text-red-400">
              {error}
            </p>
      )}

      <button className="w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3
      font-semibold text-white transition-transform hover:scale-105
      focus:outline-none focus:ring-4 focus:ring-teal-400"
       onClick={handleCallRequest}>Start Chat</button>
      </>)}
      </div>
      {/* ========== Right: Tips panel (fills space) ========== */}
        <div className="flex flex-col justify-between rounded-lg bg-black/25 p-4 text-sm">
          <div>
            <h2 className="mb-2 text-base font-semibold text-white">
              <FaSmile className="mr-1 inline" /> Tips for a great call
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-gray-400">
              <li>Use headphones for clearer audio.</li>
              <li>Keep the lights on so people can see you.</li>
              <li>Be polite – everyone’s here to have fun!</li>
              <li>You can end the chat any time.</li>
            </ul>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Your age &amp; gender are <span className="text-teal-300">never</span> shown to strangers.
          </p>

      {/* WAITING MESSAGE */}
      {/* {isWaiting && (
        <div style={{ marginTop: "3rem" }}>
          <h2>⏳ Waiting for another user to join…</h2>
          <p>Leave this tab open. We'll connect you as soon as someone arrives!</p>
        </div>
      )} */}

      {isWaiting && (
  <div className="flex flex-col items-center justify-center space-y-4 py-8">
    <FaSpinner className="text-5xl text-teal-400 animate-spin" />

    <p className="text-gray-300 animate-pulse">
      Finding the best match for you…
    </p>

    {/* Optional cancel button */}
    <button
      onClick={() => {
        socket.emit("queue:leave");
        setIsWaiting(false);
      }}
      className="mt-4 rounded-md border border-gray-600 bg-transparent px-4 py-2
                 text-xs text-gray-300 transition-colors hover:border-red-400 hover:text-red-400"
    >
      Cancel
    </button>
  </div>
)}
      
  </div>
  </div>
  </div>
      
    
    
    
    
  );
};

export default MatchScreen;