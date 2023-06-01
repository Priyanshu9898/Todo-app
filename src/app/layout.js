import { AuthProvider } from '@firebase/auth'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next To-do',
  description: 'App created using Next.js, Firebase and Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider >
          {children}
        </AuthProvider> 
        </body>
    </html>
  )
}
