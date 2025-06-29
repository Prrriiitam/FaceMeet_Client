// import React, { createContext, useContext, useEffect } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "./AuthContext";    

// const SocketContext = createContext(null);


// // After successful login
// const socket = io('http://localhost:5000', {
//   withCredentials: true,
//   autoConnect: false,
//   auth: { token: localStorage.getItem("authToken") || "" },
// });

// socket.on('connect', () => {
//   console.log('Connected to socket server');
// });

// socket.on('connect_error', (err) => {
//   console.error('Connection error:', err);
// });




// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = (props) => {
//   return (
//     <SocketContext.Provider value={socket}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };



import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";    
import { useState, useRef } from "react";

const StatsContext = createContext(null);
const SocketContext = createContext(null);
export const useStats = () => useContext(StatsContext);

const BACKEND_ORIGIN = process.env.REACT_APP_API_URL || "http://localhost:5000";


// After successful login
const socket = io(BACKEND_ORIGIN, {
  withCredentials: true,
  autoConnect: false,
  auth: { token: sessionStorage.getItem("authToken") || "" },
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
});




export const useSocket = () => useContext(SocketContext);

export const SocketProvider = (props) => {
  const [liveUsers, setLiveUsers] = useState(0);
  const { user, logout } = useAuth();     // 👉 get current token
  const pollRef = useRef(null);                 // ← store interval id very few seconds only while the user is not authenticated.

  useEffect(() => {
   fetch(`${BACKEND_ORIGIN}/api/live-users`)
     .then((r) => r.json())
     .then((data) => setLiveUsers(data.count))
     .catch(() => {});          // ignore network errors silent
  }, []);                        // run once when page loads

  useEffect(() => {
  socket.on("stats:usercount", setLiveUsers);
  return () => socket.off("stats:usercount", setLiveUsers);
  }, []);
  // (Re)connect whenever the token changes

  useEffect(() => {
    if (user?.token) {
      socket.auth = { token: user.token };
      if (!socket.connected) socket.connect();
      // 👉 Logged‑in: stop polling
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    } else {
      // no token → ensure socket is closed
      if (socket.connected) socket.disconnect();
      // 👉 Not logged‑in: start/continue polling every 5 s bcoz we want unauthenticated users to show live users
      if (!pollRef.current) {
        const fetchCount = () =>
          fetch(`${BACKEND_ORIGIN}/api/live-users`)
            .then((r) => r.json())
            .then((d) => setLiveUsers(d.count))
            .catch(() => {});
        pollRef.current = setInterval(fetchCount, 5000);
      }

    }
  }, [user]);


  // If the token is rejected, wipe it so guards send user to /login
  useEffect(() => {
    const handler = (err) => {
      if (err.message === "Authentication error") {
        logout();               // clears localStorage  auth context
      }
    };
    socket.on("connect_error", handler); // built in Socket.io event.
    return () => socket.off("connect_error", handler);
  }, [logout]);

  return ( 
    <SocketContext.Provider value={socket}>
    <StatsContext.Provider value={{ liveUsers }}>
      {props.children}
    </StatsContext.Provider>
    </SocketContext.Provider>
  );
 };