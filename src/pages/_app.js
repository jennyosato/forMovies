import "@/styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import Layout from "./layout";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
      <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
      </QueryClientProvider>
      </Layout>
  );
}
