import ClientComponent from './components/ClientComponent'
import RegisterModal from './components/Modals/RegisterModal'
import Navbar from './components/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}
const font = Nunito({
  subsets: ['latin'],
})

interface RootProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientComponent>
          <Navbar />
          <RegisterModal />
          <ToasterProvider />
        </ClientComponent>
        <main>{children}</main>
      </body>
    </html>
  )
}
