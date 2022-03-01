import React, { Fragment } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from './views/Home';
import Posts from './views/Posts';
import Sent from './views/Sent';
import Contact from './views/Contact';
import Trash from './views/Trash';

const App = () => {
  // let name = "Shakti Shah";
  // let occupation = "Web Developer";
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
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-muted my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className="container">
      </main>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sent" element={<Sent />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/trash" element={<Trash />} />
      </Routes>
      <footer></footer>
    </Fragment>
  );
};

export default App;
