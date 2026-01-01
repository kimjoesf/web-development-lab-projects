"use client"
import theme from '@/theme'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
 
export default function Provider({ children }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  )
}