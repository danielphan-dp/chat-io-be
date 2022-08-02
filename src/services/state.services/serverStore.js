const { v4: uuidv4 } = require('uuid');

// server state
let io = null;
const connectedClients = new Map();
let activeRooms = [];

const setIo = (ioNamespace) => (io = ioNamespace);
const getIo = () => io;

const addClient = (socketId, userId) => connectedClients.set(socketId, { userId });
const removeClient = (socketId) => connectedClients.delete(socketId);

const getActiveClientsOfUser = (userId) => {
  const activeClients = [];
  connectedClients.forEach((value, key) => value.userId === userId && activeClients.push(key));
  return activeClients;
};

const getOnlineClients = () => {
  const onlineUsers = [];
  connectedClients.forEach((value, key) => onlineUsers.push({ socketId: key, userId: value.userId }));
  return onlineUsers;
};

const addRoom = (userId, socketId) => {
  const newRoom = {
    roomId: uuidv4(),
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
  };
  activeRooms = [...activeRooms, newRoom];
  return newRoom;
};

const removeRoom = (userId, socketId) => {};

const getActiveRooms = () => [...activeRooms];
const getActiveRoom = (roomId) => ({ ...activeRooms.find((activeRoom) => activeRoom.roomId === roomId) });

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find((room) => room.roomId === roomId);
  activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };
  activeRooms.push(updatedRoom);
};

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);
  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };
    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      (participant) => participant.socketId !== participantSocketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);
    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

// prettier-ignore
module.exports = {
  setIo, getIo,
  addClient, removeClient,
  getActiveClientsOfUser, getOnlineClients,
  addRoom, removeRoom,
	getActiveRooms,
	getActiveRoom,
	joinActiveRoom,
	leaveActiveRoom,
};
