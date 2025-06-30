// import React, { useEffect, useCallback, useState, useRef } from "react";
// import peer from "../service/peer"
// import { useSocket } from "../context/SocketProvider";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { FaFlag } from "react-icons/fa"; 

// const RoomPage = () => {
//   const { roomid } = useParams(); // Get roomid from URL

//   const navigate   = useNavigate();
//   const socket = useSocket();

//   const { state }  = useLocation();           // { peerId, initiator }
//   const [remoteSocketId, setRemoteSocketId] = useState(state?.peerId);
//   const [remoteEmail, setRemoteEmail] = useState(state?.peerEmail);
//   const [remoteName, setRemoteName] = useState(state?.peerName);
//   const [remoteAge, setRemoteAge] = useState(state?.peerAge);
//   const [remoteGender, setRemoteGender] = useState(state?.peerGender);

//   const [initiator]      = useState(state?.initiator);
//   const hasDialledRef    = useRef(false); 
//   const pendingCandidatesRef = useRef([]);   // 🆕 store early ICE
//   const [showReportMsg, setShowReportMsg] = useState(false);


//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();


//   const handleEndCall = () => {
//     socket.emit("call:end", { to: remoteSocketId, roomId: roomid });
//     navigate("/match");                            // back to lobby
//   };


//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//     audio: true,
//     video: true,
//     });
//     setMyStream(stream);

//     const offer = await peer.getOffer(stream);
//     attachTrackListener(); 
//     flushPendingCandidates(); 
//     socket.emit("user:call", { to: remoteSocketId, offer });
//   }, [remoteSocketId, socket]);


//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);

//     /* 1️⃣ open camera */
//       const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//       });
//       setMyStream(stream);

//     /* 2️⃣ create answer (this builds a NEW RTCPeerConnection
//           and calls setRemoteDescription inside) */
//       trackAttachedRef.current = false;   // reset for new peer
//       const ans = await peer.getAnswer(offer, stream);

//     /* 3️⃣ attach listeners AFTER the peer exists */
//       attachTrackListener();

//     /* 4️⃣  ⬅️  build remote stream immediately
//     (track event already happened)             */
//       const remote = new MediaStream();
//       peer.peer.getReceivers().forEach((r) => {
//         if (r.track) remote.addTrack(r.track);
//       });
//       if (remote.getTracks().length) setRemoteStream(remote);

//     /* 5️⃣ flush any queued ICE */
//       flushPendingCandidates();

//     /* 6️⃣ send answer */
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );





//   const handleCallAccepted = useCallback(({ ans }) => {
//    // The caller must set the *remote* description when answer arrives
//     peer.setRemoteDescription(ans);
//     flushPendingCandidates(); 
//     const remote = new MediaStream();
//     peer.peer.getReceivers().forEach((r) => {
//     if (r.track) remote.addTrack(r.track);
//     });
//     if (remote.getTracks().length) setRemoteStream(remote);
//     console.log("Call Accepted!");
//     }, []);

//   // will make sure we don't register the track listener twice
//   const trackAttachedRef = useRef(false);

//   const attachTrackListener = () => {
//     if (trackAttachedRef.current || !peer.peer) return;

//     peer.peer.addEventListener("track", (ev) => {
//       setRemoteStream(ev.streams[0]);
//     });
//     peer.peer.addEventListener("icecandidate", (ev) => {
//     if (ev.candidate) {
//       socket.emit("ice:candidate", {
//         to: remoteSocketId,
//         candidate: ev.candidate,
//       });
//     }
//     });
//     trackAttachedRef.current = true;
//   };
//   const flushPendingCandidates = () => {
//     if (!peer.peer) return;
//       pendingCandidatesRef.current.forEach((c) =>
//       peer.peer.addIceCandidate(new RTCIceCandidate(c))
//     );
//     pendingCandidatesRef.current = [];
//   };


//   useEffect(() => {
//     socket.on("call:ended", () => {
//       alert("Stranger disconnected");
//       navigate("/match");
//     });
//     return () => socket.off("call:ended");
//   }, [socket, navigate]);

//   useEffect(() => {
//    if (
//     initiator &&
//     remoteSocketId &&
//     !hasDialledRef.current          // make sure it runs only once
//    ) {
//      handleCallUser();
//      hasDialledRef.current = true;
//    }
//   }, [initiator, remoteSocketId, handleCallUser]);

//   useEffect(() => {
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("ice:candidate", ({ candidate }) => {
//       if (!candidate) return;

//       if (peer.peer) {
//         peer.peer.addIceCandidate(new RTCIceCandidate(candidate));
//       } else {
//     // Peer not ready yet ― queue it
//         pendingCandidatesRef.current.push(candidate);
//       }
//     });


//     return () => {
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("ice:candidate");
//     };
//   }, [
//     socket,
//     handleIncommingCall,
//     handleCallAccepted,
//   ]);

// return (
//   <>
//       {showReportMsg && (
//   <div className="fixed bottom-40 right-4 z-50 rounded-md bg-black/80 px-4 py-2 text-sm text-white shadow-lg animate-fade-in-out">
//     ✅ User reported. Thank you!
//   </div>
// )}
  
//   <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-6 flex flex-col items-center">
//     {/* ── Status bar ─────────────────────────── */}
//     {remoteSocketId ? (
//       <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#1f2937]/80 px-4 py-2 text-sm text-gray-200 shadow">
//         <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
//         <p>
//           Connected with&nbsp;
//           <span className="font-semibold text-teal-400">{remoteName}</span>
//           {remoteAge && ` · Age ${remoteAge}`}
//           {remoteGender && ` · ${remoteGender}`}
//         </p>
//         <button
//           onClick={handleEndCall}
//           className="ml-auto rounded-md bg-red-600 px-3 py-1 text-xs font-semibold hover:bg-red-700"
//         >
//           End Call
//         </button>
//       </div>
//     ) : (
//       <p className="mb-6 rounded-lg bg-[#1f2937]/80 px-4 py-2 text-sm text-gray-400 shadow">
//         Waiting for someone to join…
//       </p>
//     )}

//     {/* ── Video grid ────────────────────────── */}
//     <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
//       {/* Local video */}
//       {myStream ? (
//         <div className="relative aspect-video overflow-hidden rounded-lg bg-black/30 shadow-lg">
//           <video
//             className="h-full w-full object-cover"
//             playsInline
//             muted
//             autoPlay
//             ref={(v) => v && (v.srcObject = myStream)}
//           />
//           <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-gray-100">
//             You
//           </span>
//         </div>
//       ) : remoteSocketId ? (
//         <button
//           onClick={handleCallUser}
//           className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-teal-500 text-teal-300 transition hover:bg-[#1f2937]/50"
//         >
//           Join video
//         </button>
//       ) : null}

//       {/* Remote video */}
//       {remoteStream ? (
//         <div className="relative aspect-video overflow-hidden rounded-lg bg-black/30 shadow-lg">
//           <video
//             className="h-full w-full object-cover"
//             playsInline
//             autoPlay
//             ref={(v) => v && (v.srcObject = remoteStream)}
//           />
//           <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-gray-100">
//             {remoteName || "Stranger"}
//           </span>
//           {/* ── Report button ────────────────────────── */}
//           {!showReportMsg && <button
//             onClick={() => {setShowReportMsg(true); setTimeout(() => setShowReportMsg(false), 3000);}}
//             className="absolute top-2 right-2 flex items-center gap-1 rounded-full
//                        bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1
//                        text-xs font-semibold text-white shadow-lg
//                        transition-transform hover:scale-105 focus:outline-none
//                        focus:ring-2 focus:ring-red-400"
//           >
//           <FaFlag className="text-sm" />
//             Report
//           </button>}

//         </div>
//       ) : (
//         remoteSocketId && (
//           <div className="flex aspect-video items-center justify-center rounded-lg bg-[#1f2937]/50 text-gray-400">
//             Waiting for remote video…
//           </div>
//         )
//       )}
//     </div>
//   </div>
//   </>
// );

// };

// export default RoomPage;

import React, { useEffect, useCallback, useState, useRef } from "react";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaFlag } from "react-icons/fa";
import ChatPanel from "./ChatPanel";

const RoomPage = () => {
  const { roomid } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { state } = useLocation();

  // User states
  const [remoteSocketId, setRemoteSocketId] = useState(state?.peerId);
  const [remoteEmail, setRemoteEmail] = useState(state?.peerEmail);
  const [remoteName, setRemoteName] = useState(state?.peerName);
  const [remoteAge, setRemoteAge] = useState(state?.peerAge);
  const [remoteGender, setRemoteGender] = useState(state?.peerGender);
  const [initiator] = useState(state?.initiator);

  // Stream states
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  // UI states
  const [showReportMsg, setShowReportMsg] = useState(false);
  const [isLocalVideoExpanded, setIsLocalVideoExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hasDialledRef = useRef(false);
  const pendingCandidatesRef = useRef([]);
  const trackAttachedRef = useRef(false);
  const expandTimeoutRef = useRef(null);

  // Check if mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px is a common breakpoint for mobile
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  const handleEndCall = () => {
    socket.emit("call:end", { to: remoteSocketId, roomId: roomid });
    navigate("/match");
  };

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);

    const offer = await peer.getOffer(stream);
    attachTrackListener();
    flushPendingCandidates();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);

      trackAttachedRef.current = false;
      const ans = await peer.getAnswer(offer, stream);
      attachTrackListener();

      const remote = new MediaStream();
      peer.peer.getReceivers().forEach((r) => {
        if (r.track) remote.addTrack(r.track);
      });
      if (remote.getTracks().length) setRemoteStream(remote);

      flushPendingCandidates();
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const handleCallAccepted = useCallback(({ ans }) => {
    peer.setRemoteDescription(ans);
    flushPendingCandidates();
    const remote = new MediaStream();
    peer.peer.getReceivers().forEach((r) => {
      if (r.track) remote.addTrack(r.track);
    });
    if (remote.getTracks().length) setRemoteStream(remote);
    console.log("Call Accepted!");
  }, []);

  const attachTrackListener = () => {
    if (trackAttachedRef.current || !peer.peer) return;

    peer.peer.addEventListener("track", (ev) => {
      setRemoteStream(ev.streams[0]);
    });
    peer.peer.addEventListener("icecandidate", (ev) => {
      if (ev.candidate) {
        socket.emit("ice:candidate", {
          to: remoteSocketId,
          candidate: ev.candidate,
        });
      }
    });
    trackAttachedRef.current = true;
  };

  const flushPendingCandidates = () => {
    if (!peer.peer) return;
    pendingCandidatesRef.current.forEach((c) =>
      peer.peer.addIceCandidate(new RTCIceCandidate(c))
    );
    pendingCandidatesRef.current = [];
  };

  const toggleLocalVideoSize = () => {
    setIsLocalVideoExpanded(true);
    
    // Clear any existing timeout
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
    }
    
    // Set timeout to shrink back after 5 seconds
    expandTimeoutRef.current = setTimeout(() => {
      setIsLocalVideoExpanded(false);
    }, 5000);
  };

  useEffect(() => {
    socket.on("call:ended", () => {
      alert("Stranger disconnected");
      navigate("/match");
    });
    return () => socket.off("call:ended");
  }, [socket, navigate]);

  useEffect(() => {
    if (initiator && remoteSocketId && !hasDialledRef.current) {
      handleCallUser();
      hasDialledRef.current = true;
    }
  }, [initiator, remoteSocketId, handleCallUser]);

  useEffect(() => {
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("ice:candidate", ({ candidate }) => {
      if (!candidate) return;

      if (peer.peer) {
        peer.peer.addIceCandidate(new RTCIceCandidate(candidate));
      } else {
        pendingCandidatesRef.current.push(candidate);
      }
    });


    return () => {
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("ice:candidate");
    };
  }, [socket, handleIncommingCall, handleCallAccepted]);

  return (
    <>
      {showReportMsg && (
        <div className="fixed bottom-40 right-4 z-50 rounded-md bg-black/80 px-4 py-2 text-sm text-white shadow-lg animate-fade-in-out">
          ✅ User reported. Thank you!
        </div>
      )}
  
      <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-6 flex flex-col items-center">
        {/* Status bar */}
        {remoteSocketId ? (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#1f2937]/80 px-4 py-2 text-sm text-gray-200 shadow">
            <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
            <p>
              Connected with&nbsp;
              <span className="font-semibold text-teal-400">{remoteName}</span>
              {remoteAge && ` · Age ${remoteAge}`}
              {remoteGender && ` · ${remoteGender}`}
            </p>
            <button
              onClick={handleEndCall}
              className="ml-auto rounded-md bg-red-600 px-3 py-1 text-xs font-semibold hover:bg-red-700"
            >
              End Call
            </button>
          </div>
        ) : (
          <p className="mb-6 rounded-lg bg-[#1f2937]/80 px-4 py-2 text-sm text-gray-400 shadow">
            Waiting for someone to join…
          </p>
        )}

        {/* Video grid - Desktop layout */}
        {!isMobile && (
          <>
          <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2">
            {/* Local video */}
            {myStream ? (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black/30 shadow-lg">
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  muted
                  autoPlay
                  ref={(v) => v && (v.srcObject = myStream)}
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-gray-100">
                  You
                </span>
              </div>
            ) : remoteSocketId ? (
              <button
                onClick={handleCallUser}
                className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-teal-500 text-teal-300 transition hover:bg-[#1f2937]/50"
              >
                Join video
              </button>
            ) : null}

            {/* Remote video */}
            {remoteStream ? (
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black/30 shadow-lg">
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  autoPlay
                  ref={(v) => v && (v.srcObject = remoteStream)}
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-gray-100">
                  {remoteName || "Stranger"}
                </span>
                {!showReportMsg && (
                  <button
                    onClick={() => {
                      setShowReportMsg(true);
                      setTimeout(() => setShowReportMsg(false), 3000);
                    }}
                    className="absolute top-2 right-2 flex items-center gap-1 rounded-full
                               bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1
                               text-xs font-semibold text-white shadow-lg
                               transition-transform hover:scale-105 focus:outline-none
                               focus:ring-2 focus:ring-red-400"
                  >
                    <FaFlag className="text-sm" />
                    Report
                  </button>
                )}
              </div>
            ) : (
              remoteSocketId && (
                <div className="flex aspect-video items-center justify-center rounded-lg bg-[#1f2937]/50 text-gray-400">
                  Waiting for remote video…
                </div>
              )
            )}
          </div>
          <ChatPanel
           roomId={roomid} remoteName={remoteName} />
          </>
          

        )}
        

        {/* Mobile layout */}
        {isMobile && (
          <>
          <div className="relative w-full h-full flex-1">
            {/* Remote video (full screen) */}
            {remoteStream ? (
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  autoPlay
                  ref={(v) => v && (v.srcObject = remoteStream)}
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-0.5 text-xs text-gray-100">
                  {remoteName || "Stranger"}
                </span>
                {!showReportMsg && (
                  <button
                    onClick={() => {
                      setShowReportMsg(true);
                      setTimeout(() => setShowReportMsg(false), 3000);
                    }}
                    className="absolute top-2 right-2 flex items-center gap-1 rounded-full
                               bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1
                               text-xs font-semibold text-white shadow-lg
                               transition-transform hover:scale-105 focus:outline-none
                               focus:ring-2 focus:ring-red-400"
                  >
                    <FaFlag className="text-sm" />
                    Report
                  </button>
                )}
              </div>
            ) : (
              remoteSocketId && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#1f2937] text-gray-400">
                  Waiting for remote video…
                </div>
              )
            )}

            {/* Local video (small overlay) */}
            {myStream && (
              <div
                className={`absolute bottom-4 right-4 z-10 overflow-hidden rounded-full border-2 border-white shadow-xl transition-all duration-300 ${
                  isLocalVideoExpanded ? "w-48 h-48" : "w-24 h-24"
                }`}
                onClick={toggleLocalVideoSize}
              >
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  muted
                  autoPlay
                  ref={(v) => v && (v.srcObject = myStream)}
                />
              </div>
            )}

            {/* Join video button if not started */}
            {!myStream && remoteSocketId && (
              <button
                onClick={handleCallUser}
                className="absolute bottom-4 right-4 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg"
              >
                Join
              </button>
            )}
          </div>
          <ChatPanel
           roomId={roomid} remoteName={remoteName} />
          </>
        )}
      </div>
    </>
  );
};

export default RoomPage;