export const metadata = {
  title: 'SEEN',
  description: 'A self-reflection experience for women who lead',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0d0d0d' }}>
        {children}
      </body>
    </html>
  )
}
