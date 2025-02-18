import '../styles/index.css';  // Global CSS
import '../styles/app.module.css';  // CSS específico del módulo

function MyApp({ Component, pageProps }) {
  return (
    <>
      
      {/* Aquí puedes agregar tus configuraciones globales */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
