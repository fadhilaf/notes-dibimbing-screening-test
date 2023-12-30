// app/layout.tsx
import Header from './header'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
