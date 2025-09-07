# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `npx expo start`
- **Run on iOS**: `npm run ios` or `expo start --ios` 
- **Run on Android**: `npm run android` or `expo start --android`
- **Run on Web**: `npm run web` or `expo start --web`
- **Lint code**: `npm run lint` (uses oxlint)
- **Reset project**: `npm run reset-project` (moves starter code to app-example and creates blank app directory)

## Project Architecture

This is a React Native Expo application with file-based routing using Expo Router. The app appears to be a sports betting/polling application called "PorrApp".

### Key Architecture Components

- **Expo Router**: Uses file-based routing with the `app/` directory structure
- **TypeScript**: Strict TypeScript configuration with path aliases (`@/*` maps to root)
- **Supabase**: Backend service for data management, configured in `services/supabase.ts`
- **Theme System**: Comprehensive light/dark theme support with color definitions in `constants/Colors.ts`

### Directory Structure

- `app/`: File-based routing structure with tab navigation
  - `(tabs)/`: Tab-based screens (Partidos, Porras, Mi cuenta)
  - `games/[gameId].tsx`: Dynamic route for individual game details
- `components/`: Reusable UI components including themed components and platform-specific UI elements
- `hooks/`: Custom React hooks including Supabase data hooks (`useGetGames`, `getSingleGame`)
- `services/`: External service integrations (Supabase client)
- `constants/`: App-wide constants including comprehensive color theme definitions
- `utils/`: Utility functions including date helpers

### Data Management

- **Supabase Integration**: Configured with environment variables (`EXPO_PUBLIC_SUPABASE_PROJECT_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`)
- **Custom Hooks Pattern**: Data fetching through custom hooks like `useGetGames()` with loading states
- **Type Definitions**: Comprehensive TypeScript types for Game, Team, and related entities

### UI/UX Patterns

- **Theming**: Extensive color system supporting light/dark modes with semantic color names
- **Tab Navigation**: Bottom tab navigation with haptic feedback and platform-specific styling
- **Accessibility**: Uses SF Symbols through IconSymbol component for consistent iconography

### Platform Support

- **iOS**: Optimized with blur effects, adaptive icons, and tablet support
- **Android**: Edge-to-edge display and adaptive icons configured
- **Web**: Static output build configuration with Metro bundler

## Code Style

- Uses oxlint for linting with React and import plugins enabled
- TypeScript strict mode enabled
- No automatic React imports required (configured in oxlint)
- Custom hook patterns for data fetching with loading states