import "../styles/globals.css";
import Navbar from "../components/Navbar";
import AuthUserProvider from "../firebase/useUser";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;
