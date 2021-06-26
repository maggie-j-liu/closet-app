import "../styles/globals.css";
import Navbar from "../components/Navbar";
import AuthUserProvider from "../firebase/useUser";
import TagsContextProvider from "../components/TagsContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <TagsContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </TagsContextProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
