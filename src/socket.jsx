import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_socketURL);

export default socket;