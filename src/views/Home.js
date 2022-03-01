import React, { Fragment } from "react";
import '../index';
import Inbox from '../components/Inbox';

const Home = () => {
  return (
    <Fragment>
      <div className="container home">
        <h1>Home</h1>
        <Inbox />
      </div>
    </Fragment>
  );
};
export default Home;
