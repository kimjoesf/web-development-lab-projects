import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: '_dark',        // 'light' | 'dark' | 'system'
  useSystemColorMode: false,        // true = follow OS dark/light mode
}

const theme = extendTheme({
  config,
 
  semanticTokens: {
    colors: {
      bg: {
        default: 'white',
        _dark: 'gray.900',
      },
      'bg-muted': {
        default: 'gray.50',
        _dark: 'gray.800',
      },
      fg: {
        default: 'gray.900',
        _dark: 'gray.100',
      },
      'fg-muted': {
        default: 'gray.600',
        _dark: 'gray.400',
      },
      border: {
        default: 'gray.200',
        _dark: 'gray.700',
      },
      primary: {
        default: 'blue.600',
        _dark: 'blue.400',
      },
    },
  },
})

export default theme ;