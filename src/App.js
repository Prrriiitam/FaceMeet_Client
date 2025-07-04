import { Route, Routes } from "react-router-dom";
// import Lobby from "./screens/Lobby";
import './index.css';

import Navbar from "./components/Pages/Navbar";
import Home from "./components/Pages/Home";
import Policy from "./components/Pages/Policy";
import About from "./components/Pages/About";
import MatchScreen from "./screens/Match";
import Room from "./screens/Room";
import Login from "./components/Pages/Login";
import Footer from "./components/Footer";
import Community from "./components/Pages/Community";
import Features from "./components/Pages/Features";
import Blog from "./components/Pages/Blog";
import Issues from "./components/Issues";

import RequireAuth from "./components/RequireAuth";

const  App= () => {
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar />
     <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/community" element={<Community />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/issues" element={<Issues />} />

        <Route
          path="/match" element={<RequireAuth>
          <MatchScreen />
          </RequireAuth> } />
          
          <Route path="/room/:roomid" element={<RequireAuth>
          <Room /> 
          </RequireAuth> }/>
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
