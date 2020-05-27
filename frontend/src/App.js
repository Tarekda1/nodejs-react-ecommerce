import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { NoMatchPage } from "./pages/NoMatchPage";
import "./App.css";
import { Cart } from "./pages/Cart";

function App() {
  const openMenu = (e) => {
    if (!document.querySelector(".sidebar").classList.contains("open")) {
      document.querySelector(".sidebar").classList.remove("close");
      document.querySelector(".sidebar").classList.add("open");
    } else {
      document.querySelector(".sidebar").classList.remove("open");
      document.querySelector(".sidebar").classList.add("close");
    }
  };
  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            <a href="signin.html">Signin</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Category</h3>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Switch>
              <Route path="/products/:id" component={ProductPage} />
              <Route path="/cart" component={Cart} />
              <Route path="/" exact component={HomePage} />
              <Route component={NoMatchPage} />
            </Switch>
          </div>
        </main>
        <footer className="footer">All rights reserved</footer>
      </div>
    </Router>
  );
}

export default App;
