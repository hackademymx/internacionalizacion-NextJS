import "../styles/globals.css";
import { createContext } from "react";
import { useRouter } from "next/router";
export const AppContext = createContext(null);
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const language = locale == "es" ? "es" : "en";
  return (
    <AppContext.Provider
      value={{
        language,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
