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

const SocketContext = createContext(null);


// After successful login
const socket = io('http://localhost:5000', {
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
  const { user, logout } = useAuth();     // 👉 get current token
// (Re)connect whenever the token changes
  useEffect(() => {
    if (user?.token) {
      socket.auth = { token: user.token };
      if (!socket.connected) socket.connect();
    } else {
      // no token → ensure socket is closed
      if (socket.connected) socket.disconnect();
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
      {props.children}
    </SocketContext.Provider>
  );
 };