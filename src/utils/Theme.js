/**
 * Theme - ऐप थीमिंग कॉन्फिगरेशन
 * सभी रंग, फॉन्ट्स और थीम-संबंधित सेटिंग्स को एकत्र रखता है
 * सभी प्रकार के केस (अपरकेस, लोअरकेस, मिक्स्ड केस) सपोर्टेड हैं
 */

// कलर कॉन्स्टेंट्स
const COLORS_UPPERCASE = {
  PRIMARY: '#FE7743',
  BACKGROUND: '#EFEEEA',
  SECONDARY: '#273F4F',
  TEXT: '#000000',
  SUCCESS: '#5B8C5A',
  ERROR: '#E74C3C',
  WARNING: '#F39C12',
  INFO: '#3498DB',
  DISABLED: '#CCCCCC',
  LIGHT_GRAY: '#F0F0F0',
  WHITE: '#FFFFFF',
};

const colors_lowercase = {
  primary: '#FE7743',
  background: '#EFEEEA',
  secondary: '#273F4F',
  text: '#000000',
  success: '#5B8C5A',
  error: '#E74C3C',
  warning: '#F39C12',
  info: '#3498DB',
  disabled: '#CCCCCC',
  light_gray: '#F0F0F0',
  white: '#FFFFFF',
};

const Colors_MixedCase = {
  Primary: '#FE7743',
  Background: '#EFEEEA',
  Secondary: '#273F4F',
  Text: '#000000',
  Success: '#5B8C5A',
  Error: '#E74C3C',
  Warning: '#F39C12',
  Info: '#3498DB',
  Disabled: '#CCCCCC',
  LightGray: '#F0F0F0',
  White: '#FFFFFF',
};

// फॉन्ट कॉन्स्टेंट्स
const FONTS_UPPERCASE = {
  PRIMARY: 'Noto Sans',
  SIZES: {
    SMALL: 12,
    REGULAR: 14,
    MEDIUM: 16,
    LARGE: 18,
    EXTRA_LARGE: 22,
    HEADING: 24,
  },
  WEIGHTS: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700',
  },
};

const fonts_lowercase = {
  primary: 'Noto Sans',
  sizes: {
    small: 12,
    regular: 14,
    medium: 16,
    large: 18,
    extra_large: 22,
    heading: 24,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semi_bold: '600',
    bold: '700',
  },
};

const Fonts_MixedCase = {
  Primary: 'Noto Sans',
  Sizes: {
    Small: 12,
    Regular: 14,
    Medium: 16,
    Large: 18,
    ExtraLarge: 22,
    Heading: 24,
  },
  Weights: {
    Light: '300',
    Regular: '400',
    Medium: '500',
    SemiBold: '600',
    Bold: '700',
  },
};

// स्पेसिंग कॉन्स्टेंट्स
const SPACING_UPPERCASE = {
  TINY: 4,
  SMALL: 8,
  MEDIUM: 16,
  LARGE: 24,
  EXTRA_LARGE: 32,
};

const spacing_lowercase = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  extra_large: 32,
};

const Spacing_MixedCase = {
  Tiny: 4,
  Small: 8,
  Medium: 16,
  Large: 24,
  ExtraLarge: 32,
};

// बॉर्डर रेडियस कॉन्स्टेंट्स
const BORDER_RADIUS_UPPERCASE = {
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 16,
  ROUND: 50,
};

const border_radius_lowercase = {
  small: 4,
  medium: 8,
  large: 16,
  round: 50,
};

const BorderRadius_MixedCase = {
  Small: 4,
  Medium: 8,
  Large: 16,
  Round: 50,
};

// शैडो कॉन्स्टेंट्स
const SHADOWS_UPPERCASE = {
  SMALL: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  MEDIUM: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  LARGE: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
};

const shadows_lowercase = {
  small: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  medium: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  large: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
};

const Shadows_MixedCase = {
  Small: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  Medium: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  Large: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
};

// कॉमन स्टाइल्स
const COMMON_UPPERCASE = {
  CONTAINER: {
    flex: 1,
    backgroundColor: '#EFEEEA',
    padding: 16,
  },
  CARD: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
};

const common_lowercase = {
  container: {
    flex: 1,
    backgroundColor: '#EFEEEA',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
};

const Common_MixedCase = {
  Container: {
    flex: 1,
    backgroundColor: '#EFEEEA',
    padding: 16,
  },
  Card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
};

// सभी विभिन्न केस फॉर्मेट्स को एक ही थीम में मर्ज करें
const Theme = {
  // अपरकेस
  COLORS: COLORS_UPPERCASE,
  FONTS: FONTS_UPPERCASE,
  SPACING: SPACING_UPPERCASE,
  BORDER_RADIUS: BORDER_RADIUS_UPPERCASE,
  SHADOWS: SHADOWS_UPPERCASE,
  COMMON: COMMON_UPPERCASE,
  
  // लोअरकेस
  colors: colors_lowercase,
  fonts: fonts_lowercase,
  spacing: spacing_lowercase,
  borderRadius: border_radius_lowercase,
  shadows: shadows_lowercase,
  common: common_lowercase,
  
  // मिक्स्ड केस
  Colors: Colors_MixedCase,
  Fonts: Fonts_MixedCase,
  Spacing: Spacing_MixedCase,
  BorderRadius: BorderRadius_MixedCase,
  Shadows: Shadows_MixedCase,
  Common: Common_MixedCase,
};

export default Theme;