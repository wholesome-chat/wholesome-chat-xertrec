# WS Workshop -- Let's build a chat app

https://github.com/user-attachments/assets/1f83497a-5338-4ec4-8da8-35b03f66d874

Goal: simulate solving technical challenges in a company environment by quickly learning, building, and collaborating with unfamiliar technologies.

## Materials

WebSockets

- https://www.slideshare.net/slideshow/intro-to-websockets/6229906?utm_source=chatgpt.com#4

TypeScript

- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- https://www.slideshare.net/slideshow/typescript-an-introduction/63110530#2

Optional

- https://www.slideshare.net/slideshow/indexeddb-and-push-notifications-in-progressive-web-apps/65428648

## Workshop

Requirements:

- Laptop
- (Optional) Collaboration: local network access and 1 or 2 peers.
- (Optional) GitHub Copilot, Cursor etc.

| Phase | Notes |
| --- | --- |
| Setup | Clone the repo https://github.com/zurfyx/websocket-chat-tutorial <br>Open in VSCode with devcontainer |
| (Optional) Create your own repo | Create your own repo here and publish your very own chat on the Internet: https://github.com/orgs/wholesome-chat/repositories |
| Hello world | Server <> client hello world with WS. Repeat sent messages. |
| Chat | The client sends a message, the server broadcasts it to all connected clients. |
| (Optional) Shared types | Share types across client and server to ensure type safety. |
| UI | Build a complete UI to host the rest of the features: channels and active indicator¹. |
| Room | Rooms are independent chat “platforms”. This can be specified with the `ws` path i.e. `ws://host/room_name` |
| User info | Capture user info on first page load and store it in local storage. |
| Channel | Chat “folders” within the same room. |
| Active indicator | Show online users. An online user is a user who is connected to the websocket. Optionally, you can implement the idle status. |
| Client storage | Persist the messages on the client so that page load is immediate. |
| (Optional) Optimistic rendering | Show the message even before it has been sent to the server (reference: WhatsApp ticks). |
| (Optional) AI bot | Run a model locally or query one externally to respond to `@AI` commands. LLM responses are streamed to the client in real time. |
| (Optional) Collaboration | Servers can be connected with other servers to share messages, rooms and channels. Servers list and format convention specified below². |
| (Optional) Server storage | Using any DB (i.e. SQLite, Mongo, MySQL, Cassandra) persist the messages so that new users can retrieve them when the open the page for the first time. |
| (Optional) Deployment | Deploy the server and client online. Recommended: Railway. |
| (Optional) PWA | Make it behave like a desktop app. With the client storage we implemented earlier this completes the offline-first experience. |
| (Optional) Videocall | Using WebRTC allow users to have 1:1 calls and videocalls. You can leverage the current WS server as the signaling server. |
| (Optional) Authentication | A centralized server would typically host the users’ credentials. For a decentralized server a sort of private-public keys such as GitHub trusted SSH keys can work. |

¹

![image](https://github.com/user-attachments/assets/60623126-9b66-470d-b8f8-2d6bff229263)

²

https://docs.google.com/document/d/1mH45NadznMdhJjNkRZXMjt9OZ9hDCKi2FODiOJ_4gzg/edit?usp=sharing

```jsx
export type USER_ID = string;

export type User = {
  id: USER_ID;
  name?: string;
  email?: string;
};

export type ClientMessage = {
  type: "CLIENT_MESSAGE";
  content: string;
  channel: string;
  optimisticId: string;
};

export type ServerMessage = {
  type: "SERVER_MESSAGE";
  id: string;
  optimisticId: string;
  content: string;
  server: string;
  userId: USER_ID;
  channel: string;
  created: number;
  updated: number;
};

export type ServerActiveUsers = {
  type: "ACTIVE_USERS";
  users: Array<User>;
};

export type ClientUser = {
  type: "CLIENT_USER";
  user: User;
};

export type Self = {
  type: "SELF";
  user: User;
};

type WebsocketData =
  | ClientMessage
  | ServerMessage
  | ServerActiveUsers
  | ClientUser
  | Self;
```

## Example

(Will be published by end of day on the 30th)

https://github.com/wholesome-chat/gerardrovira-chat
