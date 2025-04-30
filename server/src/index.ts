import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on("connection", (ws) => {
    console.info("Client connected")

    ws.on("message", (msg) => {
        console.info("Message received:", msg.toString())
        ws.send(`Echo: ${msg}`)
    })

    ws.on("close", () => {
        console.info("Client disconnected")
    })
})

console.info("WebSocket server is running on ws:")