# RN LLM Chat

A React Native chat app for talking to an LLM. It uses Google's Gemini models through the OpenAI-compatible endpoint, renders replies as Markdown, and strips common personal data from messages before they leave the device.

## Features

- **Chat UI**: message bubbles with timestamps, a typing indicator, a composer, and a "New chat" action.
- **Markdown replies**: assistant messages render with `react-native-markdown-display`.
- **Light and dark theme**: styles are built from a shared theme (`src/theme.ts`).
- **Keyboard-aware layout**: safe-area insets and a keyboard-avoiding composer.
- **Conversation memory**: the last 10 messages are sent with each request. Error bubbles are shown in the UI but never sent to the model.
- **PII scrubbing**: emails, credit cards (Luhn-validated), SSNs and phone numbers are replaced with `[EMAIL]`, `[CARD]`, `[SSN]` and `[PHONE]` before sending. This is best-effort regex redaction. Names, addresses and free-form IDs are **not** detected.
- **Response validation**: replies are checked with [Zod](https://zod.dev). Unexpected shapes, empty replies and safety-filter blocks become readable errors. Replies cut off by the length limit are flagged.
- **Readable API errors**: Gemini's array-wrapped error bodies are unwrapped into a plain message.
- **AI disclaimer** shown above the composer.

## Tech stack

- React Native 0.87 and React 19, written in TypeScript
- `openai` SDK pointed at `https://generativelanguage.googleapis.com/v1beta/openai/`
- Model: `gemini-3.5-flash-lite`
- `react-native-dotenv` for loading the API key from `.env`
- `zod`, `react-native-markdown-display`, `react-native-safe-area-context`
- Inter font family (`assets/fonts`)
- Jest for tests, ESLint and Prettier for code quality

## Project structure

```
App.tsx
src/
├── components/     AIDisclaimer, ChatHeader, Composer, MessageBubble, MessageList
├── hooks/          useKeyboardVisible
├── screens/        ChatScreen
├── services/       openai.ts (API client, history handling, error parsing)
├── utils/          scrubPII.ts, verifyResponse.ts
├── theme.ts
└── types.ts
```

Each component lives in its own folder with a `.tsx` file, a `.styles.ts` file and an `index.ts`.

## Getting started

### Prerequisites

- Node.js >= 22.11
- The [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) for your target platform (Xcode and CocoaPods for iOS, Android Studio for Android)
- A [Gemini API key](https://aistudio.google.com/apikey)

### Install

```sh
npm install

# iOS only
bundle install
bundle exec pod install --project-directory=ios
```

### Configure the API key

Create a `.env` file in the project root (it is git-ignored):

```
GEMINI_API_KEY=your_key_here
```

The key is inlined into the JS bundle at build time. Restart Metro after changing it, using `npm start -- --reset-cache` if the old value sticks.

### Run

```sh
npm start          # start Metro
npm run ios        # in another terminal
npm run android
```

### Other scripts

```sh
npm run lint
npm test
```

## Security note

Because the API key is bundled into the app, **this setup is for development only**. Anyone who unpacks a release build can extract the key. For production, route requests through your own backend and keep the key on the server.

## Roadmap

- Streaming responses (a commented-out `stream: true` hook is already in `src/services/openai.ts`)
- Persisting conversations across launches
- A backend proxy for the API key
