import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import "../index.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://fakebook-january-derek.herokuapp.com/api/v1/blog`
      )
      .then((res) => setPosts(res.data));
  }, []);
  return (
    <Fragment>
      <div className="container posts">
        {posts.map((p) => (
          <li key={p.id} className="list-group-item">
            <div>
              {p.id}: {p.body}
              <span className="float-right">
                <small>{p.date_created}</small>
              </span>
            </div>
            <div>
              <cite>
                {" "}
                &mdash; {`${p.user_id.first_name} ${p.user_id.last_name}`}{" "}
              </cite>
            </div>
          </li>
        ))}
      </div>
    </Fragment>
  );
};
export default Posts;
