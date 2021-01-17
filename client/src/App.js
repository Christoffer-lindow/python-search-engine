import React from "react";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage"
import AboutPage from "./pages/AboutPage"
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Center>
          <Route path="/" component={SearchPage} exact />
          <Route path="/about" component={AboutPage} />
        </Center>
      </Router>
    </ChakraProvider>
  );
};

export default App;
