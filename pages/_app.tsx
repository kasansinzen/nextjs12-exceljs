import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TemplateDefault from '../src/components/templates/TemplateDefault'

function MyApp({ Component, pageProps }: AppProps) {
  return <TemplateDefault>
    <Component {...pageProps} />
  </TemplateDefault>;
}

export default MyApp
