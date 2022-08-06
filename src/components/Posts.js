import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

function Posts() {
  const pageSize = 10;
  const [post, setPost] = useState([]);
  const [paginatedPost, setPaginatedPost] = useState();
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setPost(res.data);
        setPaginatedPost(_(res.data).slice(0).take(pageSize).value());
      })
      .catch((err) => console.log(err));
  }, []);
  const pageCount = post ? Math.ceil(post.length / pageSize) : 0;

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNumber) => {
    setcurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedPost = _(post).slice(startIndex).take(pageSize).value();
    setPaginatedPost(paginatedPost);
  };

  return (
    <div>
      {!paginatedPost ? (
        "No data found"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPost.map((post, index) => {
              return (
                <tr key={index}>
                  <th>{post.id}</th>
                  <th>{post.userId}</th>
                  <th>{post.title}</th>
                  <th>
                    <p
                      className={
                        post.completed ? "btn btn-success" : "btn btn-danger"
                      }
                    >
                      {post.completed ? "completed" : "panding"}
                    </p>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Posts;
