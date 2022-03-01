import React from "react";
import "../index.css";

const posts = [
  {
    body: "First post",
    date_created: "Tue, 15 Feb 2022 17:06:23 GMT",
    id: 1,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "Third post",
    date_created: "Tue, 15 Feb 2022 17:06:23 GMT",
    id: 3,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "This is a test post from the form",
    date_created: "Tue, 15 Feb 2022 18:06:01 GMT",
    id: 5,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "This is a post created from the api",
    date_created: "Tue, 15 Feb 2022 20:50:44 GMT",
    id: 6,
    user_id: {
      email: "joelc@codingtemple.com",
      first_name: "Joel",
      id: 2,
      last_name: "Carter",
    },
  },
  {
    body: "This post was updated from the api",
    date_created: "Tue, 15 Feb 2022 17:06:23 GMT",
    id: 2,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "This is a test post from the form",
    date_created: "Wed, 16 Feb 2022 16:09:01 GMT",
    id: 7,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "This is a test post from the form",
    date_created: "Wed, 16 Feb 2022 16:10:10 GMT",
    id: 8,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
  {
    body: "this is a test from Heroku",
    date_created: "Fri, 18 Feb 2022 16:05:06 GMT",
    id: 9,
    user_id: {
      email: "lucasl@codingtemple.com",
      first_name: "Lucas",
      id: 1,
      last_name: "Lang",
    },
  },
];

const Posts = () => {
  return (
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
  );
};
export default Posts;
