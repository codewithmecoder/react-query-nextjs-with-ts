import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

import '../styles/globals.css';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
