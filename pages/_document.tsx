import { Html, Head, Main, NextScript } from 'next/document'
import i18next from "i18next";
import { getLocalStorage } from '../lib/useLocalStorage';

export default function Document() {
  
  const selectedLanguage = getLocalStorage("selected_language") || 'en';
  i18next.changeLanguage(selectedLanguage);
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        {/* <link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.12.1/css/pro.min.css" /> */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}