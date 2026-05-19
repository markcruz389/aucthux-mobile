# Aucthux Mobile

A cross-platform mobile app built with Expo and React Native. Users can sign in, browse public posts and view their own posts. The app uses file-based routing, TanStack Query for data fetching, and NativeWind for styling.

## Setup instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) with npm
- **iOS**: macOS — see [iOS Simulator](#ios-simulator-macos-only) below
- **Android**: [Android Studio](https://developer.android.com/studio) — see [Android Emulator](#android-emulator) below
- Optional: [Expo Go](https://expo.dev/go) on a physical device for quick testing

### Install

1. Clone the repository and open the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. **(Optional)** Configure the API base URL. By default, requests go to [JSONPlaceholder](https://jsonplaceholder.typicode.com).

   ```bash
   EXPO_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

   The app appends `/api` to this value (see `src/lib/axios.ts`). Restart the dev server after changing env vars.

4. **(Optional)** Run the linter:

   ```bash
   npm run lint
   ```

### iOS Simulator (macOS only)

The iOS Simulator only runs on macOS. Follow Expo’s guide for full details: [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/).

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835) from the Mac App Store.
2. In Xcode, open **Settings** (⌘ + ,) → **Locations** and install **Command Line Tools** (pick the latest version).
3. In **Settings** → **Components**, under **Platform Support** → **iOS**, click **Get** to install an iOS Simulator runtime.
4. *(Recommended)* Install [Watchman](https://facebook.github.io/watchman/docs/install#macos) for faster file watching:
   ```bash
   brew update
   brew install watchman
   ```
5. From the project root, start the app on the simulator:
   ```bash
   npm run ios
   ```
   Or run `npm start` and press **`i`** in the terminal. Press **Shift + i** to pick a specific simulator.

If the simulator does not open automatically, launch it with `open -a Simulator`, then use **File → Open Simulator** to choose a device. See [troubleshooting](https://docs.expo.dev/workflow/ios-simulator/#troubleshooting) in the Expo docs if Expo Go does not load or Xcode license prompts appear.

### Android Emulator

Use Android Studio’s virtual device manager if you do not have a physical Android device. Full walkthrough: [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/).

1. Install [Android Studio](https://developer.android.com/studio).
2. On first launch, complete the setup wizard and install the **Android SDK** and **Android SDK Platform**.
3. In Android Studio, go to **Settings** → **Languages & Frameworks** → **Android SDK**:
   - **SDK Platforms**: install **Android 15** (API 35) — required for current React Native builds.
   - **SDK Tools**: ensure **Android SDK Build-Tools** and **Android Emulator** are installed. Note the **Android SDK Location** path.
4. Add SDK tools to your shell profile (`~/.zshrc` or `~/.bashrc`):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
   Then reload your shell: `source ~/.zshrc` (or `source ~/.bashrc`).
5. *(macOS, recommended)* Install a JDK and Watchman if you have not already — Expo documents [JDK 17 (Azul Zulu)](https://docs.expo.dev/workflow/android-studio-emulator/#install-watchman-and-jdk) and Watchman via Homebrew. Set `JAVA_HOME` as described in that guide.
6. Create a virtual device: **More Actions** → **Virtual Device Manager** → **Create device** → choose hardware (e.g. Pixel) → select a system image → **Finish**.
7. Start the emulator from the **Play** button in Virtual Device Manager (or leave it running), then from the project root:
   ```bash
   npm run android
   ```
   Or run `npm start` and press **`a`** in the terminal.

Confirm `adb` works: `adb version`. See [troubleshooting](https://docs.expo.dev/workflow/android-studio-emulator/#troubleshooting) if you hit JDK or multiple-`adb` issues.

For a guided setup (Expo Go vs development build), see [Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/).

## How to run the app

Start the Expo development server:

```bash
npm start
```

From the terminal UI you can open the app on a simulator, emulator, or device. You can also use platform-specific scripts:

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm start`       | Start Expo dev server (choose target) |
| `npm run ios`     | Start and open iOS Simulator          |
| `npm run android` | Start and open Android emulator       |
| `npm run web`     | Run in the browser                    |

**Sign-in (development):** The app uses mock authentication. Use the demo credentials defined in `src/services/auth.ts` (e.g. the mock email shown on the sign-in screen).

## Libraries used

| Library                                                                        | Description                                                                             |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| **Expo** (`expo`, `babel-preset-expo`)                                         | SDK and tooling for building and running the React Native app on iOS, Android, and web. |
| **Expo Router** (`expo-router`)                                                | File-based navigation and routing (screens live under `src/app/`).                      |
| **React** / **React Native**                                                   | UI framework and native mobile renderer.                                                |
| **React Navigation** (`@react-navigation/native`, `bottom-tabs`, `elements`)   | Navigation primitives used by Expo Router (tabs, stacks, headers).                      |
| **TanStack Query** (`@tanstack/react-query`)                                   | Server state: caching, refetching, and loading/error states for API data.               |
| **TanStack Form** (`@tanstack/react-form`)                                     | Form state and validation for screens like sign-in and create post.                     |
| **Axios**                                                                      | HTTP client for API requests (configured in `src/lib/axios.ts`).                        |
| **Zod**                                                                        | Schema validation for forms and API-related types.                                      |
| **NativeWind** + **Tailwind CSS**                                              | Utility-first styling with Tailwind classes in React Native.                            |
| **clsx** / **tailwind-merge**                                                  | Helpers for composing and merging class names.                                          |
| **Expo Secure Store**                                                          | Encrypted storage for session data (email, user id).                                    |
| **Expo Image**                                                                 | Optimized image component for post thumbnails and assets.                               |
| **Expo Font** / **Expo Splash Screen**                                         | Custom fonts and splash screen handling on launch.                                      |
| **Expo Linking** / **Expo Web Browser**                                        | Deep links and in-app browser flows where needed.                                       |
| **Expo Constants** / **Device** / **System UI** / **Status Bar** / **Symbols** | Device info, system UI, status bar, and SF Symbol-style icons.                          |
| **Expo Glass Effect**                                                          | iOS glass/blur UI effects where used.                                                   |
| **react-native-safe-area-context**                                             | Safe area insets for notches and system bars.                                           |
| **react-native-screens**                                                       | Native screen containers for better navigation performance.                             |
| **react-native-gesture-handler**                                               | Native gesture handling for navigation and interactions.                                |
| **react-native-reanimated** / **react-native-worklets**                        | Animations and worklet runtime used by Reanimated.                                      |
| **react-native-toast-message**                                                 | Toast notifications for API errors and feedback.                                        |
| **react-native-web**                                                           | Web support when running `npm run web`.                                                 |
| **TypeScript**                                                                 | Static typing across the codebase.                                                      |
| **ESLint** (`eslint-config-expo`)                                              | Linting via `npm run lint`.                                                             |

For Expo-specific APIs and version details, see the [Expo SDK 55 docs](https://docs.expo.dev/versions/v55.0.0/).
