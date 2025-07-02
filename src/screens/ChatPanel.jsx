import React, { useEffect, useState, useRef } from "react";
import { FiSend, FiMic, FiMicOff, FiMoreHorizontal, FiCornerUpLeft, FiFlag } from "react-icons/fi";
import { useSocket } from "../context/SocketProvider";
import { readFileAsDataURL } from "../utils/fileHelpers";
import { makeId } from "../utils/makeId";  
import {AbuseNotification} from "./AbuseNotification";
import { AnimatePresence } from "framer-motion";
const LONG_PRESS_MS = 500;

const ChatPanel = ({ roomId, remoteName }) => {
  const socket = useSocket();
  const fileInputRef = useRef(null);
  const [replying,  setReplying]  = useState(null); 
  const [abuseAlert, setAbuseAlert] = useState(null);

  const [previewSrc, setPreviewSrc] = useState(null);   // ⬅️ big‑image modal
  const [messages, setMessages] = useState([]);        // {text, senderId, senderName, ts}
  const [input, setInput]   = useState("");
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const touchTimer = useRef(null);

  //To report someone
  const [contextMenu, setContextMenu] = useState(null); // {x, y, msg}
  const [reportToast, setReportToast] = useState(null);
  const reportedIds = useRef(new Set());
   const [toastMsg, setToastMsg] = useState(null);

   useEffect(() => {
    const handleAbuseDetected = ({ offenderName, honor }) => {
      setAbuseAlert({
        id: Date.now(),
        offenderName,
        honor: honor,
        detected: true
      });
      
      // Auto-clear after 5 seconds
      setTimeout(() => {
        setAbuseAlert(null);
      }, 5000);
    };
    const handleAbuseCleared = ({ offenderName, honor}) => {
      setAbuseAlert({
        id: Date.now(),
        offenderName,
        honor: honor,
        detected: false
      });
      
      // Auto-clear after 5 seconds
      setTimeout(() => {
        setAbuseAlert(null);
      }, 5000);
    };
    socket.on('abuse:detected', handleAbuseDetected);
    socket.on('abuse:cleared', handleAbuseCleared);
    
    return () => {
      socket.off('abuse:detected', handleAbuseDetected);
      socket.off('abuse:cleared', handleAbuseCleared);
    };
  }, []);

  /* ---------------- Socket listeners ---------------- */

  useEffect(() => {
  const chatHandler = (msg) => {
    // Ignore messages we just sent (they're already in state)
    if (msg.senderId === socket.id) return;
    setMessages((m) => [...m, msg]);
  };
  const fileHandler = (file) => {
    if (file.senderId === socket.id) return;
    setMessages((m) => [...m, { ...file, file: true }]);
  };

  socket.on("chat:message", chatHandler);
  socket.on("file:receive", fileHandler);

  return () => {
    socket.off("chat:message", chatHandler);
    socket.off("file:receive", fileHandler);
  };
}, [socket]);



  /* ---------------- Auto‑scroll ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close context menu on generic click / ESC key
   useEffect(() => {
    const close = () => setContextMenu(null);
    const keyClose = (e) => e.key === "Escape" && setContextMenu(null);

    window.addEventListener("click", close);
    window.addEventListener("keydown", keyClose);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", keyClose);
    };
  }, []);

  /* ---------------- Send helpers ---------------- */
  const send = () => {
    if (!input.trim()) return;
    const newMessage = {
    id: makeId(), // Generate unique ID
    text: input.trim(),
    senderId: socket.id,
    senderName: "You",
    ts: Date.now(),
    replyTo: replying ? {
      id: replying.id,
      textSnippet: replying.file ? "📎 [image]" : replying.text?.slice(0, 50) || "",
      senderName: replying.senderId === socket.id ? "You" : remoteName,
      file: replying.file || false

    } : undefined
  };
    socket.emit("chat:send", { roomId, text: newMessage.text,
      replyTo: newMessage.replyTo
     });

    setMessages([...messages, newMessage]);
    setInput("");
    setReplying(null);
  };

  const handleKey = (e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send());

  /* ---------------- Speech‑to‑text ---------------- */
  const toggleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;                      // onend will flip the flag back
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support the Web Speech API 😕");
      return;
    }

    const recog = new SpeechRecognition();
    recognitionRef.current = recog;
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;

    recog.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setInput((prev) => `${prev}${prev && " "}${transcript}`);
    };
    recog.onerror = () => recog.stop();
    recog.onend = () => setListening(false);

    setListening(true);
    recog.start();
  };
 
  // Reporting Logic

  const handleReport = () => {
    if (!contextMenu) return;
    const { msg } = contextMenu;
     if (reportedIds.current.has(msg.id)) {
      setToastMsg("Message already reported");
      setContextMenu(null);
      setTimeout(() => setToastMsg(null), 4_000);
      return;
    }
    reportedIds.current.add(msg.id);

    socket.emit("message:report", {
      roomId,
      messageId: msg.id,
      text: msg.text,
      senderId: msg.senderId,
    });

    setContextMenu(null);
    // Light toast “Report submitted”
    const id = Date.now();
    setReportToast(id);
    setTimeout(() => setReportToast(null), 4_000);
  };


  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-72 w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-[#121212]/80 shadow-lg">
      <p className="mx-auto mt-1 text-center text-xs italic text-gray-400">
        💡 Desktop: double-click a message to report · Mobile: long-press a message to report
      </p>
      {/* message list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm text-gray-100">
        {messages.map((m) => (
          <div
            key={m.id}
            onDoubleClick={(e) => setContextMenu({ x: e.clientX, y: e.clientY, msg: m })}
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ x: e.clientX, y: e.clientY, msg: m });
            }}
            onTouchStart={(e) => {
              touchTimer.current = setTimeout(() => {
                const touch = e.touches[0];
                setContextMenu({ x: touch.clientX, y: touch.clientY, msg: m });
              }, LONG_PRESS_MS);
            }}
            onTouchEnd={() => clearTimeout(touchTimer.current)}
            onTouchMove={() => clearTimeout(touchTimer.current)}
            className={`group relative max-w-[75%] break-words rounded-lg px-3 py-1.5 ${
              m.senderId === socket.id
                ? "ml-auto bg-teal-600"
                : "mr-auto bg-gray-700"
            }`}
          >
            {/* reply-preview inside bubble */}
            {m.replyTo && (
              <div className="mb-1 rounded border-l-4 border-teal-300 bg-black/20 px-2 py-1 text-xs italic text-gray-200">
                {m.replyTo.file ? "📎 [image]" : `Replying to "${m.replyTo.textSnippet}"`}
              </div>
            )}
            {/* Message content - either text or image */}
            {m.file ? (
            <img 
              src={m.dataURL} 
              alt={m.name} 
              className="max-h-52 rounded-md"
              onClick={() => setPreviewSrc(m.dataURL)}
            />
            ) : (
            m.text
            )}

          <button
          onClick={() => setReplying(m)}
          className={`
          absolute rounded-full p-1 hidden group-hover:block
          ${m.senderId === socket.id 
          ? "-left-6 text-gray-400 hover:bg-gray-600 hover:text-white" 
          : "-right-6 text-teal-400 hover:bg-teal-600 hover:text-white"
          }
  `       }
          style={{
          top: '50%',
          transform: 'translateY(-50%)'
          }}
          title="Reply"
          >
         {m.senderId === socket.id ? (
         // Your message - left side arrow
        <FiCornerUpLeft 
        size={20}
        className="text-gray-400 group-hover:text-white"
        />
        ) : (
       // Remote message - right side arrow
       <FiCornerUpLeft 
       size={20} 
       className="text-teal-400"
      />
      )}
      </button>
      </div>
      ))}
      <div ref={bottomRef} />
      </div>

      {/* input bar */}
        {/* if replying show banner */}
        {replying && (
          <div className="mb-1 flex items-center gap-2 rounded bg-gray-800 px-2 py-1 text-xs text-gray-300">
            <span className="italic">
              Replying to&nbsp;
              {replying.senderId === socket.id ? "yourself" : remoteName || "Stranger"}:
            </span>
            <span className="truncate">
              {replying.file ? "📎 [image]" : replying.text?.slice(0, 30)} 
            </span>
            <button
              onClick={() => setReplying(null)}
              className="ml-auto text-gray-400 hover:text-red-400"
            >
              ×
            </button>
          </div>
        )}

      <div className="flex items-center border-t border-gray-600 p-2">
        <button
          onClick={toggleMic}
          title="Say something - we'll convert it to text"
          className={`mr-2 rounded-full p-2 ${
            listening ? "bg-red-600 text-white hover:bg-red-600" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
        {listening ? (
        <>
        <FiMic className="relative z-10" />
        {/* three pulsating dots behind the mic */}
        <span className="absolute inset-0 flex items-center justify-center gap-0.5">
        {[...Array(3)].map((_,i)=>(
        <FiMoreHorizontal
           key={i}
           className="text-xs opacity-0 animate-pulse"
           style={{ animationDelay: `${i*0.2}s` }}
         />
        ))}
        </span>
        </>
        ) : (
        <FiMicOff />
        )}
        </button>

        <button
        onClick={() => fileInputRef.current?.click()}
        title="Send image (≤300 KB)"
        className="mr-2 rounded-full bg-gray-700 p-3 text-gray-300 hover:bg-gray-600"
        >
       📎
       </button>

<input
  type="file"
  ref={fileInputRef}
  accept="image/png,image/jpeg,image/jpg,image/gif"
  hidden
  onChange={async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 300_000) return alert("File too big (max 300 KB)");
    const dataURL = await readFileAsDataURL(file);
    socket.emit("file:send", {
      roomId,
      name: file.name,
      type: file.type,
      size: file.size,
      dataURL,
    });
    // show instantly for sender
    setMessages((m)=>[...m,{file:true,dataURL,name:file.name,ts:Date.now(),senderId:socket.id}]);
  }}
/>


        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          className="flex-1 resize-none rounded-md bg-[#0d1117] p-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none"
        />

        <button
          onClick={send}
          className="ml-2 rounded-full bg-teal-600 p-2 text-white hover:bg-teal-700 disabled:opacity-40"
          disabled={!input.trim()}
        >
          <FiSend />
        </button>
      </div>

{previewSrc && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    onClick={() => setPreviewSrc(null)}            // click backdrop to close
  >
    <img
      src={previewSrc}
      alt="preview"
      className="max-h-[90vh] max-w-[90vw] object-contain drop-shadow-2xl"
      onClick={(e) => e.stopPropagation()}         // keep click from closing
    />
    <button
      onClick={() => setPreviewSrc(null)}
      className="absolute top-4 right-4 text-4xl text-white hover:text-teal-300"
    >
      &times;
    </button>
  </div>
)}

{/* Context menu */}
      {contextMenu && (
        <div
          className="fixed z-50 rounded-md bg-gray-800 py-1 text-sm text-gray-100 shadow-xl"
          style={{ top: contextMenu.y, left: contextMenu.x, minWidth: "120px" }}
        >
          <button
            onClick={handleReport}
            className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-700"
          >
            <FiFlag /> Report
          </button>
        </div>
      )}

      {/* Toast */}
      {reportToast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-gray-800 px-4 py-2 text-sm text-gray-100 shadow-lg">
          Report submitted
        </div>
      )}
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded bg-gray-800 px-4 py-2 text-sm text-gray-100 shadow-lg">
          {toastMsg}
        </div>
      )}


    <AnimatePresence>
        {abuseAlert && (
          <AbuseNotification
            key={abuseAlert.id}
            offenderName={abuseAlert.offenderName}
            onClose={() => setAbuseAlert(null)}
            detected={abuseAlert.detected}
            honor={abuseAlert.honor}
          />
        )}
    </AnimatePresence>
    </div>
  );
};

export default ChatPanel;
