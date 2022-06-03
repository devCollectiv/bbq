import { createTheme } from '@material-ui/core'
import TrykkerSvgFontFile from './fonts/Trykker/Trykker.ttf.svg'
import TrykkerEotFontFile from './fonts/Trykker/Trykker.ttf.eot'
import TrykkerWoffFontFile from './fonts/Trykker/Trykker.ttf.woff'

import YouthBlackOtfFontFile from './fonts/Youth/Youth-Black-trial.otf'
import YouthBoldOtfFontFile from './fonts/Youth/Youth-Bold-trial.otf'
import YouthLiteOtfFontFile from './fonts/Youth/Youth-Light-trial.otf'
import YouthMediumOtfFontFile from './fonts/Youth/Youth-Medium-trial.otf'
import YouthRegularOtfFontFile from './fonts/Youth/Youth-Regular-trial.otf'
import YouthThinOtfFontFile from './fonts/Youth/Youth-Thin-trial.otf'

// @font-face {
//   font-family: 'Trykker';
//   src:url('Trykker.ttf.woff') format('woff'),
//     url('Trykker.ttf.svg#Trykker') format('svg'),
//     url('Trykker.ttf.eot'),
//     url('Trykker.ttf.eot?#iefix') format('embedded-opentype');
//   font-weight: normal;
//   font-style: normal;
// }
export const Trykker: any = {
  fontFamily: 'Trykker',
  src: `url('${TrykkerWoffFontFile}') format('woff'),
    url('${TrykkerSvgFontFile}#Trykker') format('svg'),
    url('${TrykkerEotFontFile}'),
    url('${TrykkerEotFontFile}?#iefix') format('embedded-opentype')
  `,
  fontWeight: 'normal',
  fontStyle: 'normal'
}

const YouthBlack: any = {
  fontFamily: 'Youth',
  src: `
  url(${YouthBlackOtfFontFile}) format('opentype')
  `,
  fontWeight: '900',
  fontStyle: 'normal'
}

const YouthBold: any = {
  fontFamily: 'Youth',
  src: `
  url('${YouthBoldOtfFontFile}') format('opentype')
  `,
  fontWeight: '700',
  fontStyle: 'normal',
}

const YouthLite: any = {
  fontFamily: 'Youth',
  src: `
  url('${YouthLiteOtfFontFile}') format('opentype')
  `,
  fontWeight: '500',
  fontStyle: 'normal'
}

const YouthMedium: any = {
  fontFamily: 'Youth',
  src: `
  url('${YouthMediumOtfFontFile}') format('opentype')
  `,
  fontWeight: 'normal',
  fontStyle: 'normal'
}

const YouthRegular: any = {
  fontFamily: 'Youth',
  src: `
  url('${YouthRegularOtfFontFile}') format('opentype')
  `,
  fontWeight: '300',
  fontStyle: 'normal'
}

const YouthThin: any = {
  fontFamily: 'Youth',
  src: `
  url('${YouthThinOtfFontFile}') format('opentype')
  `,
  fontWeight: 'normal',
  fontStyle: 'italic'
}

const fonts = [
  Trykker.fontFamily,
  "Youth",
  'IBM Plex Sans',
  'sans-serif'
]

let blckTwttrTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 980,
      lg: 1160,
      xl: 1320
    }
  },
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#383838'
    },
    primary: {
      main: '#e7ad00',
      light: '#dcc686',
      dark: '#cc9700'
    },
    secondary: {
      main: '#c20000',
      light: '#c76969',
      dark: '#860202'
    },
    error: {
      main: '#960C00',
      light: '#BE6861',
      dark: '#840B00'
    },
    success: {
      main: '#3D9C2E',
      light: '#87C27D',
      dark: '#368928'
    },
    info: {
      main: '#2D6AD2',
      light: '#7DA3E3',
      dark: '#285D89'
    },
    warning: {
      main: '#FFE600',
      light: '#FFEF61',
      dark: '#E0CA00'
    },
    text: {
      primary: '#0c0c0c',
      secondary: '#3D3D3D',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
  },
  typography: {
    fontFamily: fonts.join(','),
    h1: {
      fontSize: '96px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '-1.5px'
    },
    h2: {
      fontSize: '60px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '-0.5px'
    },
    h3: {
      fontSize: '48px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h4: {
      fontSize: '34px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.18px'
    },
    h6: {
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '1px'
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: 1.5,
      letterSpacing: '0.15px',
      fontWeight: 500,
      fontStyle: 'normal'
    },
    subtitle2: {
      fontSize: '14px',
      lineHeight: 1.5,
      letterSpacing: '0.1px',
      fontWeight: 500,
      fontStyle: 'normal'
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
      letterSpacing: '0.5px',
      fontWeight: 400,
      fontStyle: 'normal'
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
      letterSpacing: '0.25px',
      fontWeight: 400,
      fontStyle: 'normal'
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '1.25px',
      textTransform: 'uppercase'
    },
    overline: {
      fontWeight: 500,
      fontSize: '10px',
      lineHeight: 1.5,
      letterSpacing: '1.5px',
      textTransform: 'uppercase'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          Trykker,
          YouthBlack,
          // YouthBold,
          // YouthRegular,
          // YouthThin,
          // YouthLite,
          // YouthMedium
        ]
      }
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(0,0,0,0.6)'
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: '1px solid #E0E0E0'
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: '0',
        minWidth: 'max-content',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        textDecoration: 'none'
      },
      label: {
        justifyContent: 'center'
      },
      contained: {
        color: '#FFFDFB',
        justifyContent: 'flex-start',
        padding: '4px 14px',
        '&$disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.38)',
          color: 'white'
        }
      },
      containedPrimary: {
        color: 'white'
      },
      outlined: {
        color: '#3D3D3D',
        border: '1px solid rgba(0,0,0,.12)',
        justifyContent: 'center',
        padding: '3px 13px'
      }

    },
    MuiFab: {
      root: {
        color: '#FFFFFF',
        fontWeight: 800
      }
    },
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: 'white'
        }
      }
    }
  }
})

export default blckTwttrTheme