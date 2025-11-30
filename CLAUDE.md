# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `npx expo start`
- **Run on iOS**: `npm run ios` or `expo start --ios` 
- **Run on Android**: `npm run android` or `expo start --android`
- **Run on Web**: `npm run web` or `expo start --web`
- **Lint code**: `npm run lint` (uses oxlint)
- **Build APK**: `npm run build:apk` (uses EAS build for Android preview)
- **Production Android build**: `npm run eas:prod:android`

## Project Architecture

This is a React Native Expo application using file-based routing with Expo Router. PorrApp is a sports betting/polling application where users can create and participate in polls for sports games.

### Key Architecture Components

- **Expo Router**: File-based routing with the `app/` directory structure
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root directory)
- **Supabase**: Backend service for authentication, data persistence, and real-time updates
- **MMKV Storage**: Fast, synchronous key-value storage for auth sessions (native platform only)
- **Theme System**: Light/dark theme support via `@react-navigation/native` ThemeProvider

### Critical Architecture Patterns

#### Context-Based State Management
The app uses React Context for managing cross-cutting concerns:
- **SessionProvider** (`contexts/session.tsx`): Manages Supabase authentication session globally
  - Automatically syncs auth state changes
  - Provides `useSession()` hook for accessing user session
- **PollsContextProvider** (`contexts/polls.tsx`): Game-specific poll management
  - Scoped to individual games via props
  - Handles poll creation, fetching, and state
  - Provides public poll discovery

#### Supabase Integration
- Client initialized in `services/supabase.ts` with environment variables:
  - `EXPO_PUBLIC_SUPABASE_PROJECT_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Platform-specific storage adapter (`services/storage.ts`) wraps MMKV for native platforms
- Web uses default Supabase storage (localStorage)
- Auth configured with `autoRefreshToken`, `persistSession`, and `processLock`

#### Navigation Structure
- Root layout (`app/_layout.tsx`): Wraps app with SessionProvider and ThemeProvider
- Tab navigation (`app/(tabs)/_layout.tsx`): Bottom tabs with haptic feedback
- Dynamic routes: `app/games/[gameId].tsx` for individual game details

### Directory Structure

- `app/`: File-based routing
  - `(tabs)/`: Tab-based screens (index, auth, account)
  - `games/[gameId].tsx`: Dynamic game detail routes
  - `splash.tsx`: Splash screen controller
- `components/`: Reusable UI components and themed components
- `hooks/`: Custom React hooks
  - `supabase/`: Data fetching hooks organized by domain (games, polls, etc.)
- `contexts/`: React Context providers for global state
- `services/`: External service integrations (Supabase, storage)
- `constants/`: App-wide constants including Colors theme definitions
- `utils/`: Utility functions (date helpers, etc.)

### Data Layer Patterns

- Custom hooks in `hooks/supabase/` follow a consistent pattern:
  - Return `{ data, isLoading, error, refetch }` structure
  - Handle loading states internally
  - Provide imperative refetch methods
- Poll system supports two modalities:
  - `PollModality.PRIVATE`: User-created private polls
  - `PollModality.PUBLIC`: Worldwide/public polls (one per game)

### Platform Support

- **iOS**: SF Symbols via `expo-symbols`, blur effects, tablet support
- **Android**: Edge-to-edge display, adaptive icons
- **Web**: Static output build with Metro bundler

## Code Style

- Uses oxlint for linting with React and import plugins
- TypeScript strict mode enforced
- No automatic React imports required (configured in oxlint)
- Custom hooks pattern: prefix with `use`, return object with `isLoading` state
