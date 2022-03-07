import React, { Fragment, useRef, useState } from "react";
import Inbox from "../components/Inbox";
import { useData } from "../contexts/DataProvider";
import { useAuth } from "../contexts/AuthProvider";
import moment from "moment";
import "../index";

const Home = () => {
  const { messages } = useData();
  const { currentUser } = useAuth();
  const inputRef = useRef();
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Create function to handle form submission
  const findMessage = ( e ) => {
    e.preventDefault();
    const filteredMessagesList = [];
    
    // Loop through the messages list 
    for(const message of messages){
      if(message.body.includes(inputRef.current.value)){
        // console.log(message.body)
        filteredMessagesList.push(message);
      }
    }
    setFilteredMessages(filteredMessagesList);
    inputRef.current.value = '';
  };

  return (
    <Fragment>
      <div className="container home">
        <h1 className="text-center">Home</h1>
        <form onSubmit={findMessage} className="input-group mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            ref={inputRef}
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-block"
              id="search-btn"
            >
              Search
            </button>
          </div>
        </form>
        <Inbox />
        <div className="messages">
          {currentUser.loggedIn && filteredMessages.length < 1
            ? messages.map((m) => (
                <li key={m.id} className="list-group-item m-1">
                  <div>
                    {m?.body}
                    <span className="float-right">
                      <small>{moment(m.dateCreated?.toDate()).fromNow()}</small>
                    </span>
                  </div>
                  <div>
                    <cite> &mdash; {`${m.user?.name}`} </cite>
                  </div>
                </li>
              ))
            : filteredMessages.map((m) => (
                <li key={m.id} className="list-group-item">
                  <div>
                    {m?.body}
                    <span className="float-right">
                      <small>{moment(m.dateCreated?.toDate()).fromNow()}</small>
                    </span>
                  </div>
                  <div>
                    <cite> &mdash; {`${m.user?.name}`} </cite>
                  </div>
                </li>
              ))}
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
