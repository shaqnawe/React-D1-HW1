import React, { Fragment } from "react";
import "../index.css";
import { useData } from '../contexts/DataProvider';

const Posts = () => {
  const { posts } = useData();
  
  return (
    <Fragment>
      <h1 className="container text-center" id="posts">Posts</h1>
      <div className="container posts">
        {posts.map((p) => (
          <li key={p.id} className="list-group-item m-1">
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
