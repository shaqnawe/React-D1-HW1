import React, { useRef, Fragment, useState, useEffect } from "react";
import moment from "moment";
import { useData } from "../contexts/DataProvider";
import { useAuth } from "../contexts/AuthProvider";
import { Card } from "react-bootstrap";
import { serverTimestamp } from "firebase/firestore";

const Sent = () => {
  const { sent, sendEmail } = useData();
  const { currentUser } = useAuth();
  const messageRef = useRef();
  const userRef = useRef();

  // Create function to handle message sending
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    // const userEmail = userRef.current.value;
    // console.log(userEmail);
    // 
    let emailData = {
      message: messageRef.current.value,
      timeSent: serverTimestamp(),
      to: userRef.current.value,
    };
    // console.log(emailData);
    sendEmail(emailData);
    messageRef.current.value = "";
    userRef.current.value = "";
  };
  
  return (
    <Fragment>
      <div className="container sent">
      <h1 className="text-center">Sent</h1>
        <form className="container form col-6" onSubmit={sendMessageHandler}>
          <ul>
            <li className="list-group-item">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                ref={userRef}
              />
            </li>
            <li className="list-group-item mt-1">
              <input
                type="text"
                className="form-control"
                placeholder="Message"
                ref={messageRef}
              />
            </li>
          </ul>
          <div>
            <button
              type="submit"
              className="btn float-right mb-4"
              id="send-btn"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <Card className="container justify-content-center col-8 bg-dark" id="card">
        <div className="container sentlist">
          {currentUser.loggedIn &&
            sent.map((s) => (
              <li key={s.id} className="list-group-item m-1">
                <div>
                  {s?.message}
                  <span className="float-right">
                    <small>{moment(s.timeSent?.toDate()).fromNow()}</small>
                  </span>
                </div>
                <div>
                  <cite> &#62; {`${s?.to}`} </cite>
                </div>
              </li>
            ))}
        </div>
      </Card>
    </Fragment>
  );
};
export default Sent;