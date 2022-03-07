import React, { Fragment } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Posts from "./views/Posts";
import Sent from "./views/Sent";
import Contact from "./views/Contact";
import Trash from "./views/Trash";
import Login from "./views/Login";

const App = () => {
  // Using React Hook createContext
  // const { signIn } = createContext(AuthContext);

  // Using our custom React Hook
  const { signIn, currentUser, logOut } = useAuth();
  // const authCtx = useContext(AuthContext);
  // const userLoggedIn = authCtx.isLoggedIn;

  return (
    <Fragment>
      <header>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/sent">
                  Sent <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trash">
                  Trash
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            {/* {condition} ? condition to run if true : condition to run if false */}
            {!currentUser.loggedIn ? (
              <ul className="ul-inline my-2 my-lg-0">
                <li className="nav-item auth">
                  <Link
                    id="auth"
                    onClick={() => signIn()}
                    className="nav-link auth"
                    to="."
                  >
                    Google Login
                  </Link>
                </li>
                <li className="nav-item auth">
                  <Link
                    id="auth"
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li className="nav-item auth">
                  <Link
                    id="auth"
                    onClick={() => logOut()}
                    className="nav-link"
                    to="."
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </header>
      <main className="container"></main>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sent" element={<Sent />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/trash" element={<Trash />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
      <footer></footer>
    </Fragment>
  );
};

export default App;
