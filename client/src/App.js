import React from "react";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage"
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Center>
          <Route path="/" component={HomePage} exact />
          <Route path="/search" component={SearchPage} />
          <Route path="/about" component={HomePage} />
        </Center>
      </Router>
    </ChakraProvider>
  );
};

export default App;
