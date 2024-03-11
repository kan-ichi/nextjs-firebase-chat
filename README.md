## nextjs-firebase-chat
[Demo Site (Firebase Hosting Spark Plan)](https://kanichi-nextjs-chat.web.app)

![screencapture-kanichi-nextjs-chat-web-app-chatroom](https://github.com/kan-ichi/nextjs-firebase-chat/assets/43694066/d69b7e4f-5288-4c1b-9c44-8e4d96fbd9b1)

## Getting Started

First, activate "Authentication" and "Realtime Database" in your Firebase.

Create a "/src/_DoNotCommit" directory in your workspace.<br>
Then, copy the files from "_DoNotCommit_OriginalFiles" to the newly created directory.

Next, update the copied files with your Firebase settings.
![update env.ts](https://github.com/kan-ichi/nextjs-firebase-chat/assets/43694066/7bfd6d9a-7690-497e-916f-cb6de8ef4f01)


Recover node_modules from package-lock.json.

```bash
npm ci
```

Finally, run the development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
