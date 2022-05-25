import { DarkTheme, Colors, configureFonts, DefaultTheme } from 'react-native-paper';

declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
        myOwnColor: string;
        }

        interface Theme {
            primaryDark: boolean;
        }
    }
}

// const dark = {
//     ...DarkTheme,
//     myOwnProperty: true,
//     colors: {
//         myOwnColor: '#7ED957',
//     }
// }

const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
        primary: '#7ED957',         // green
        secondary: '#8A95A6',       // grey
        primaryDark: '#0A1321',     // black
        background: '#1A2433',      // dark blue
        neutral: '#FFFFFF',         // white
    }
}

// const darkTheme = {
//     ...dark
// }
// const lightTheme = {
//     ...light
// }

// export { darkTheme, lightTheme };
export { theme };
import { DarkTheme, Colors, configureFonts, DefaultTheme } from 'react-native-paper';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      primaryDark: boolean;
    }
  }
}

// const dark = {
//     ...DarkTheme,
//     myOwnProperty: true,
//     colors: {
//         myOwnColor: '#7ED957',
//     }
// }

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    primary: '#7ED957',
    secondary: '#8A95A6',
    primaryDark: '#0A1321',
    background: '#1A2433',
    neutral: '#FFFFFF'
  }
};

// const darkTheme = {
//     ...dark
// }
// const lightTheme = {
//     ...light
// }

// export { darkTheme, lightTheme };
export { theme };
