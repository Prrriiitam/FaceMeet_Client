// // src/pages/Issues.jsx
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { api } from "../utils/api";
// import { FaPlus, FaTimes } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

// const IssueCard = ({ issue, onOpen }) => (
//   <motion.div
//     layout
//     whileHover={{ y: -2 }}
//     className="rounded-xl bg-[#1f2937]/80 border border-gray-700 p-5 cursor-pointer"
//     onClick={() => onOpen(issue._id)}
//   >
//     <div className="flex justify-between">
//       <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
//       <span className="text-sm text-teal-400">{issue.repliesCount} 💬</span>
//     </div>
//     <p className="text-gray-400 text-sm mt-1 line-clamp-2">{issue.body}</p>
//   </motion.div>
// );

// export default function Issues() {
//   const { user, isAuth } = useAuth(); // <--- Get user and isAuth from useAuth
//   const [issues, setIssues] = useState([]);
//   const [openId, setOpenId] = useState(null);
//   const [detail, setDetail] = useState(null);
//   const [showModal, setShowModal] = useState(false);          // 👈 NEW
//   const [form, setForm] = useState({ title: "", body: "" });  // 👈 NEW

//   // fetch list
//   useEffect(() => { api.getIssues().then(setIssues); }, []);

//   // open / collapse
//   const openIssue = async (id) => {
//     if (openId === id) { setOpenId(null); return; }
//     const data = await api.getIssue(id);
//     setDetail(data);
//     setOpenId(id);
//   };

//   // submit new issue
//   const submitIssue = async () => {
//     if (!form.title.trim() || !form.body.trim()) return;
//     console.log("Now will check jwt");
//     const jwt = user?.token; // adjust to your auth store
//     console.log(`jwt is = ${jwt}`);

//     const saved = await api.postIssue(jwt, form);
//     console.log('API response for postIssue:', saved);
//     if (saved && saved.success) { // Assuming 'saved' has a 'success' property
//         console.log('Issue posted successfully!');
//     } else if (saved && saved.error) { // Assuming 'saved' has an 'error' property on failure
//         console.error('Failed to post issue:', saved.error);
//     } else {
//         console.log('Unexpected API response structure:', saved);
//     }
    
//     setIssues([saved, ...issues]);             // optimistic prepend
//     setForm({ title: "", body: "" });
//     setShowModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-[#0B1120] px-4 py-16 text-gray-200">
//       <div className="mx-auto w-full max-w-5xl space-y-10">
//         <h1 className="text-center text-4xl font-extrabold text-cyan-400 drop-shadow">
//           Community Issues & Suggestions
//         </h1>

//         {/* NEW‑ISSUE FAB / BUTTON */}
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-gradient-to-r
//                      from-cyan-500 to-teal-600 px-4 py-2 rounded-full
//                      font-bold hover:scale-105"
//         >
//           <FaPlus /> New Issue
//         </button>

//         {/* ISSUE LIST */}
//         <div className="space-y-4">
//           {issues.map((i) => (
//             <div key={i._id}>
//               <IssueCard issue={i} onOpen={openIssue} />
//               <AnimatePresence>
//                 {openId === i._id && detail && (
//                   <motion.div
//                     layout
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="bg-[#111827] border border-gray-700 rounded-b-xl p-4 space-y-3"
//                   >
//                     <p className="text-gray-300">{detail.issue.body}</p>
//                     <div className="space-y-2">
//                       {detail.replies.map((r) => (
//                         <div key={r._id} className="text-sm bg-[#1f2937] p-3 rounded">
//                           <span className="font-semibold text-teal-400">{r.author.name}</span>{" "}
//                           <span className="text-gray-400">said:</span>
//                           <p>{r.body}</p>
//                         </div>
//                       ))}
//                     </div>
//                     {/* reply form – implement later */}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ───────── MODAL ───────── */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="w-full max-w-md rounded-2xl bg-[#1f2937] p-6 space-y-4"
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-bold text-teal-300">Submit a New Issue</h2>
//                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-400">
//                   <FaTimes />
//                 </button>
//               </div>

//               <input
//                 type="text"
//                 placeholder="Title (max 140 chars)"
//                 maxLength={140}
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className="w-full rounded bg-[#111827] p-3 text-sm focus:outline-none"
//               />

//               <textarea
//                 rows={5}
//                 placeholder="Describe the issue or suggestion…"
//                 value={form.body}
//                 onChange={(e) => setForm({ ...form, body: e.target.value })}
//                 className="w-full rounded bg-[#111827] p-3 text-sm focus:outline-none"
//               />

//               <button
//                 onClick={submitIssue}
//                 className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-600
//                 py-2 font-bold hover:scale-105 disabled:opacity-30"
//                 disabled={!form.title.trim() || !form.body.trim()}
//               >
//                 Submit
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



// src/pages/Issues.jsx
import React, { useEffect, useState, useCallback } from "react"; // Add useCallback
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../utils/api";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Ensure this path is correct

const IssueCard = ({ issue, onOpen }) => (
  <motion.div
    layout
    whileHover={{ y: -2 }}
    className="rounded-xl bg-[#1f2937]/80 border border-gray-700 p-5 cursor-pointer"
    onClick={() => onOpen(issue._id)}
  >
    <div className="flex items-center justify-between">
      <span className="text-md font-medium text-teal-300">
        Author: {issue.author?.name ?? "Anonymous"}
      </span>
      <span className="text-sm text-teal-400">
        {issue.repliesCount} 💬
      </span>
    </div>

    <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{issue.body}</p>
  </motion.div>
);

export default function Issues() {
  const [replyBody, setReplyBody] = useState("");

  const { user, isAuth } = useAuth();
  const [issues, setIssues] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState(null); // New state for errors

  const postReply = async () => {
  if (!replyBody.trim()) return;
  if (!isAuth || !user?.token) {
    alert("You must be logged in to reply.");
    return;
  }

  try {
    const saved = await api.postReply(user.token, detail.issue._id, {
      body: replyBody.trim(),
    });

    // 1️⃣ add to replies list
    setDetail((prev) => ({
      ...prev,
      replies: [...prev.replies, saved],
    }));

    // 2️⃣ bump repliesCount in outer list
    setIssues((prev) =>
      prev.map((iss) =>
        iss._id === detail.issue._id
          ? { ...iss, repliesCount: iss.repliesCount + 1 }
          : iss
      )
    );

    setReplyBody("");           // clear textarea
  } catch (err) {
    console.error("Reply failed:", err);
    alert("Could not post reply");
  }
};


  

  // Define a reusable fetch function for issues
  const fetchIssues = useCallback(async (jwt) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const data = await api.getIssues(jwt, 0, 50);
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues:", err);
      setError("Failed to load issues. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  // Initial fetch on component mount
  useEffect(() => {
    fetchIssues(user?.token);
  }, [fetchIssues, user?.token]); // Dependency array includes fetchIssues so it runs when fetchIssues changes (which it won't due to useCallback)

  // open / collapse
  const openIssue = async (id) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setDetail(null); // Clear previous detail when opening a new one
    try {
      const data = await api.getIssue(id);
      setDetail(data);
      setOpenId(id);
    } catch (err) {
      console.error("Failed to fetch issue details:", err);
      alert(`Failed to load issue details: ${err.message || "Network error"}`);
    }
  };

  // submit new issue
  const submitIssue = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      alert("Title and body cannot be empty.");
      return;
    }

    const jwt = user?.token;
    if (!jwt) {
      console.error("No JWT token found. Please log in.");
      alert("You must be logged in to post an issue.");
      return;
    }

    try {
      const saved = await api.postIssue(jwt, form);
      console.log('API response for postIssue:', saved);

      if (saved && saved._id) {
        console.log('Issue posted successfully!');
        setForm({ title: "", body: "" });
        setShowModal(false);
        // ⭐ IMPORTANT: Re-fetch the issues after a successful post
        await fetchIssues(user?.token); // Fetch the updated list from the database
        setOpenId(saved._id); // Optionally open the newly created issue
      } else if (saved && saved.error) {
        console.error('Failed to post issue (server error):', saved.error);
        alert(`Failed to post issue: ${saved.error}`);
      } else {
        console.log('Unexpected API response structure:', saved);
        alert("An unexpected error occurred while posting the issue.");
      }
    } catch (err) {
      console.error('Error during postIssue API call:', err);
      alert(`Error posting issue: ${err.message || "Network error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0B1120] px-4 py-16 text-gray-200">
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <h1 className="text-center text-4xl font-extrabold text-cyan-400 drop-shadow">
          Community Issues & Suggestions
        </h1>

        {/* NEW‑ISSUE FAB / BUTTON - Only show if authenticated */}
        {isAuth && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r
                       from-cyan-500 to-teal-600 px-4 py-2 rounded-full
                       font-bold hover:scale-105"
          >
            <FaPlus /> New Issue/Suggestion
          </button>
        )}

        {/* ISSUE LIST */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading issues...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : issues.length === 0 ? (
            <p className="text-center text-gray-400">No issues found. Be the first to post!</p>
          ) : (
            issues.map((i) => (
              <div key={i._id}>
                <IssueCard issue={i} onOpen={openIssue} />
                <AnimatePresence>
                  {openId === i._id && detail && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#111827] border border-gray-700 rounded-b-xl p-4 space-y-3"
                    >
                      <p className="text-gray-300">{detail.issue.body}</p>
                      <div className="space-y-2">
                        {detail.replies.length === 0 ? (
                            <p className="text-gray-500 text-sm">No replies yet.</p>
                        ) : (
                            detail.replies.map((r) => (
                                <div key={r._id} className="text-sm bg-[#1f2937] p-3 rounded">
                                  <span className="font-semibold text-teal-400">{r.author.name}</span>{" "}
                                  <span className="text-gray-400">said:</span>
                                  <p>{r.body}</p>
                                </div>
                              ))
                        )}
                      </div>
                      {/* Reply form - conditionally render if authenticated */}
                      {isAuth && (
                        <div className="mt-4">
                          <textarea
                            placeholder="Add a reply..."
                            rows={3}
                            value={replyBody}
                            onChange={(e) => setReplyBody(e.target.value)}
                            className="w-full rounded bg-[#0b1120] p-2 text-sm focus:outline-none text-white"
                            // Implement state for replyBody and onSubmitReply
                          />
                          <button onClick={postReply}
                            className="mt-2 w-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 py-2 font-bold hover:scale-105"
                            disabled={!replyBody.trim()}
                          >
                            Post Reply
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ───────── MODAL ───────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-[#1f2937] p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-teal-300">Submit a New Issue or Suggestion</h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-400">
                  <FaTimes />
                </button>
              </div>

              <input
                type="text"
                placeholder="Title (max 140 chars)"
                maxLength={140}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded bg-[#111827] p-3 text-sm focus:outline-none"
              />

              <textarea
                rows={5}
                placeholder="Describe the issue or suggestion…"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="w-full rounded bg-[#111827] p-3 text-sm focus:outline-none"
              />

              <button
                onClick={submitIssue}
                className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-600
                 py-2 font-bold hover:scale-105 disabled:opacity-30"
                disabled={!form.title.trim() || !form.body.trim()}
              >
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}