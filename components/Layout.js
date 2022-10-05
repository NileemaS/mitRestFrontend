import React from "react";
import Link from "next/link";
import Cookie from "js-cookie";

import { Container, Nav, NavItem } from "reactstrap";

export default function Layout(props) {
  const title = "Welcome to Restaurant List";
  const checkUser = Cookie.get("user");

  return (
    <div>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>

          <NavItem className="ms-auto">
            {
              checkUser? 
                <Link href="/logout">
                  <a className="nav-link">Sign Out</a>
                </Link>
              :
                <Link href="/login">
                  <a className="nav-link">Sign In</a>
                </Link>
            }
          </NavItem>

          <NavItem>
            <Link href="/register">
              <a className="nav-link"> Sign Up</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link href="/checkout">
              <a className="nav-link"> Cart</a>
            </Link>
          </NavItem>
         
        </Nav>
      </header>
      <Container>
        {props.children}        
      </Container>
    </div>
  );
}