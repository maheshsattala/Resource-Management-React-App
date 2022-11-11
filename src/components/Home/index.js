import React, { Component } from "react";
import Header from "../Header";

export class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home-container">Home</div>
      </div>
    );
  }
}

export default Home;
