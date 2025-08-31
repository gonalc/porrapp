/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    /**
     * Deep Charcoal
     *
     * @description Primary text, headings and labels.
     */
    text: '#212529',
    /**
     * Soft White
     *
     * @default Backgrounds, cards and large UI surfaces.
     */
    background: '#F8F9FA',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    /**
     * Electric Blue
     *
     * @description Primary buttons, active states, headers, and key interactive elements.
     */
    primary: '#007BFF',
    /**
     * Vivid Red
     *
     * @description Secondary buttons, alerts or emphasis on polls results (e.g., winning game predictions).
     */
    secondary: '#FF2D55',
    /**
     * Lime Green
     *
     * @description Success states, progress bars, or subtle accents in charts/graphs.
     */
    accent: '#00FF85',
    /**
     * Light Gray
     *
     * @description Secondary text, borders or inactive states.
     */
    neutralSupport: '#D3D7DB',
    /**
     * Orange
     *
     * @description Error messages, warnings or validation prompts.
     */
    warning: '#FF9500'
  },
  dark: {
    /**
     * Off-White
     *
     * @description Primary text, headings and labels.
     */
    text: '#E9ECEF',
    /**
     * Dark Slate
     *
     * @default Backgrounds, cards and large UI surfaces.
     */
    background: '#1C2526',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    /**
     * Neon Blue
     *
     * @description Primary buttons, active states, headers, and key interactive elements.
     */
    primary: '#00A3FF',
    /**
     * Crimson Red
     *
     * @description Secondary buttons, alerts or emphasis on polls results (e.g., winning game predictions).
     */
    secondary: '#E0245E',
    /**
     * Emerald Green
     *
     * @description Success states, progress bars, or subtle accents in charts/graphs.
     */
    accent: '#00D68F',
    /**
     * Mid Gray
     *
     * @description Secondary text, borders or inactive states.
     */
    neutralSupport: '#495057',
    /**
     * Amber
     *
     * @description Error messages, warnings or validation prompts.
     */
    warning: '#FFB900'
  },
};
