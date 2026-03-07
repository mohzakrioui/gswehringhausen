import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import CookieBanner from '../../components/layout/CookieBanner'
import '../globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-main',
  display: 'swap',
})

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${nunito.variable} font-main antialiased min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
