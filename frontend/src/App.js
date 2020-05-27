import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import "./App.css";

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
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>
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
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/" exact component={HomePage} />
          </div>
        </main>
        <footer className="footer">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
