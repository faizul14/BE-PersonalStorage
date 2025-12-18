const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on("connection", (socket) => {
        console.log("socket connect:", socket.id);

        socket.on("disconnect", (reason) => {
            console.log("socket disconnect:", socket.id, reason);
        });
    });
    
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket belum di-init");
    }
    return io;
};

module.exports = {
    initSocket,
    getIO
};
