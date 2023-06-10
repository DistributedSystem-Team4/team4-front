import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./Components/App/Header"
import Nav from "./Components/App/Nav"
import Main from "./Components/App/Main"
import Footer from "./Components/App/Footer"
import AuthProvider from "./Components/Context/AuthProvider"
import HttpHeadersProvider from "./Components/Context/HttpHeadersProvider";
import "./css/style.css"


function App() {
  return (
    <div>
        <BrowserRouter>
        <Header />  
        <AuthProvider>
          <HttpHeadersProvider>
            <Nav />
            <Main />
          </HttpHeadersProvider>
        </AuthProvider>

        <Footer />

      </BrowserRouter>
      
    </div>
  );
}

export default App;
