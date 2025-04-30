import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({ port: 8080 })
const wsConnections: Set<WebSocket> = new Set()

wss.on("connection", (ws) => {
    console.info("Client connected")
    wsConnections.add(ws)

    ws.on("message", (msg) => {
        console.info("Message received:", msg.toString())
        ws.send(`Echo: ${msg}`)
        for (const currentWs of wsConnections) {
            currentWs.send(`${msg}`)
        }
    })

    ws.on("close", () => {
        wsConnections.delete(ws)
        console.info("Client disconnected")
    })
})

console.info("WebSocket server is running on ws:")