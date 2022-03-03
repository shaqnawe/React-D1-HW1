import React, { Fragment } from "react";
import '../index';
import Inbox from '../components/Inbox';
import { useData } from "../contexts/DataProvider";
import moment from 'moment';
import { useAuth } from "../contexts/AuthProvider";

const Home = () => {

  const { messages } = useData();
  const { currentUser } = useAuth();
  // console.log(messages)
  return (
    <Fragment>
      <div className="container home">
        <h1>Home</h1>
        <Inbox />
        <div className="messages">
          { currentUser.loggedIn ? 
          messages.map((m) => (
            <li key={m.id} className="list-group-item">
              <div>
                {m?.body}
                <span className="float-right">
                  <small>{moment(m.dateCreated?.toDate()).fromNow()}</small>
                </span>
              </div>
              <div>
                <cite>
                  {" "}
                  &mdash; {`${m.user?.name}`}{" "}
                </cite>
              </div>
            </li>
          )) : null }
        </div>
      </div>
    </Fragment>
  );
};
export default Home;

