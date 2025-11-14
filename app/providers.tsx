"use client"
import { ThemeProvider } from './theme-provider'
// this is the parent providers, in here we have the theme providers and the toast providers, this file goes to
// ---> layout and wraps the children
function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        {children}
    </ThemeProvider>
     
    </>
  )
}

export default Providers