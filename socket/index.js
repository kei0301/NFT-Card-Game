module.exports = (io) => {
    io.on('connection', async (socket) => {
        socket.on('disconnect', async () => {
            console.log("disconnect socket");
        })
    })
}