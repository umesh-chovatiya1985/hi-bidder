import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/admin.css'
import 'react-toastify/dist/ReactToastify.min.css';
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import "./i18nextConf";
import { Provider } from 'react-redux';
import { store } from './store';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import apolloClient from '../lib/apollo-client';

// const client = new ApolloClient({
//   uri: 'http://localhost:3000',
//   cache: new InMemoryCache(),
// });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={pageProps?.session}>            
            <GoogleReCaptchaProvider
              reCaptchaKey={process.env.SITE_KEY}
              scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
              }}
            >
              <Component {...pageProps} />
            </GoogleReCaptchaProvider>
          </SessionProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default MyApp
