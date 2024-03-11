## nextjs-firebase-chat
<p><a href="https://kanichi-nextjs-chat.web.app" target="_blank">Demo Site (right click and open in a new tab)</a></p>

Nextjs app using Firebase Authentication(with anonymous sign-in), Firebase Realtime Database.

![screencapture-kanichi-nextjs-chat-web-app-chatroom](https://github.com/kan-ichi/nextjs-firebase-chat/assets/43694066/d69b7e4f-5288-4c1b-9c44-8e4d96fbd9b1)

## Getting Started

First, in your Firebase console, activate "Authentication" and "Realtime Database".<br>
And enable anonymous auth:<br>
　　In the Firebase console, open the Authentication section.<br>
　　On the Sign-in Methods page, enable the Anonymous sign-in method.<br>

Next, in your workspace, create "/src/_DoNotCommit" directory.<br>
Then, copy files from "_DoNotCommit_OriginalFiles" to the newly created directory.

Update the copied files with your Firebase settings.
![update env.ts](https://github.com/kan-ichi/nextjs-firebase-chat/assets/43694066/7b2e2e28-8cdb-4d48-9c0a-1022435d0be8)

Recover node_modules from package-lock.json.

```bash
npm ci
```

Finally, run the development server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
