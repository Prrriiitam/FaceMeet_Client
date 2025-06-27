import React, { useEffect, useCallback, useState, useRef } from "react";
import peer from "../service/peer"
import { useSocket } from "../context/SocketProvider";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const { roomid } = useParams(); // Get roomid from URL

  const navigate   = useNavigate();
  const socket = useSocket();

  const { state }  = useLocation();           // { peerId, initiator }
  const [remoteSocketId, setRemoteSocketId] = useState(state?.peerId);
  const [remoteEmail, setRemoteEmail] = useState(state?.peerEmail);
  const [remoteName, setRemoteName] = useState(state?.peerName);
  const [remoteAge, setRemoteAge] = useState(state?.peerAge);
  const [remoteGender, setRemoteGender] = useState(state?.peerGender);

  const [initiator]      = useState(state?.initiator);
  const hasDialledRef    = useRef(false); 
  const pendingCandidatesRef = useRef([]);   // 🆕 store early ICE


  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();


  const handleEndCall = () => {
    socket.emit("call:end", { to: remoteSocketId, roomId: roomid });
    navigate("/");                            // back to lobby
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

    /* 1️⃣ open camera */
      const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      });
      setMyStream(stream);

    /* 2️⃣ create answer (this builds a NEW RTCPeerConnection
          and calls setRemoteDescription inside) */
      trackAttachedRef.current = false;   // reset for new peer
      const ans = await peer.getAnswer(offer, stream);

    /* 3️⃣ attach listeners AFTER the peer exists */
      attachTrackListener();

    /* 4️⃣  ⬅️  build remote stream immediately
    (track event already happened)             */
      const remote = new MediaStream();
      peer.peer.getReceivers().forEach((r) => {
        if (r.track) remote.addTrack(r.track);
      });
      if (remote.getTracks().length) setRemoteStream(remote);

    /* 5️⃣ flush any queued ICE */
      flushPendingCandidates();

    /* 6️⃣ send answer */
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );





  const handleCallAccepted = useCallback(({ ans }) => {
   // The caller must set the *remote* description when answer arrives
    peer.setRemoteDescription(ans);
    flushPendingCandidates(); 
    const remote = new MediaStream();
    peer.peer.getReceivers().forEach((r) => {
    if (r.track) remote.addTrack(r.track);
    });
    if (remote.getTracks().length) setRemoteStream(remote);
    console.log("Call Accepted!");
    }, []);

  // will make sure we don't register the track listener twice
  const trackAttachedRef = useRef(false);

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


  useEffect(() => {
    socket.on("call:ended", () => {
      alert("Stranger disconnected");
      navigate("/");
    });
    return () => socket.off("call:ended");
  }, [socket, navigate]);

  useEffect(() => {
   if (
    initiator &&
    remoteSocketId &&
    !hasDialledRef.current          // make sure it runs only once
   ) {
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
    // Peer not ready yet ― queue it
        pendingCandidatesRef.current.push(candidate);
      }
    });


    return () => {
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("ice:candidate");
    };
  }, [
    socket,
    handleIncommingCall,
    handleCallAccepted,
  ]);

  // return (
  //   <div>
  //     <h1>Room Page</h1>
  //     <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
  //     {remoteSocketId && remoteEmail && remoteName && remoteAge && remoteGender && (
  //       <>
  //         <h4>{remoteName} Has Joined with {remoteEmail} Age {remoteAge} and Gender {remoteGender}</h4>
  //       </>
  //     )}
  //     {/* Show “Join video” only if I haven’t opened camera yet */}
  //     {remoteSocketId && !myStream && (
  //       <button onClick={handleCallUser}>Join video</button>
  //     )}
  //     {/* Show “End Call” only after camera is running */}
  //     {remoteSocketId && myStream && (
  //     <button onClick={handleEndCall}>End Call</button>
  //     )}

  //     {myStream && (
  //     <>
  //     <h1>Your Stream</h1>
  //     <video
  //     style={{ width: 500 }}
  //     playsInline
  //     muted
  //     autoPlay
  //     ref={(v) => v && (v.srcObject = myStream)}
  //     />
  //   </>
  //   )}
  //   {remoteStream && (
  //   <>
  //   <h1>{remoteName} Stream</h1>
  //   <video
  //     style={{ width: 500 }}
  //     playsInline
  //     autoPlay
  //     ref={(v) => v && (v.srcObject = remoteStream)}
  //   />
  //   </>
  //   )}


  //   </div>
  // );

  /* ⬇️  put this inside the `return ( … )` of RoomPage  */
return (
  <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-black px-4 py-6 flex flex-col items-center">
    {/* ── Status bar ─────────────────────────── */}
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

    {/* ── Video grid ────────────────────────── */}
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
        </div>
      ) : (
        remoteSocketId && (
          <div className="flex aspect-video items-center justify-center rounded-lg bg-[#1f2937]/50 text-gray-400">
            Waiting for remote video…
          </div>
        )
      )}
    </div>
  </div>
);

};

export default RoomPage;