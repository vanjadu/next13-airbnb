import ClientComponent from './components/ClientComponent'
import RegisterModal from './components/Modals/RegisterModal'
import Navbar from './components/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/Modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

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

export default async function RootLayout({ children }: RootProps) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientComponent>
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <ToasterProvider />
        </ClientComponent>
        <main>{children}</main>
      </body>
    </html>
  )
}
