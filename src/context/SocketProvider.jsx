import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);


// After successful login
const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: false
});

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err);
});




export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};