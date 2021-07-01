import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchComment } from "../redux";

const Comments = ({ fetchComment, loading, comments }) => {
  useEffect(() => {
    fetchComment();
  }, []);

  const commentsItems = loading ? (
    <div>loading 중...</div>
  ) : (
    comments.map((comment) => (
      <div key={comment.id}>
        <h3>{comment.name}</h3>
        <p>{comment.body}</p>
      </div>
    ))
  );
  return <div>{commentsItems}</div>;
};

const mapStateToProps = ({ comments }) => {
  console.log(comments); // undefined
  return {
    comments: comments.comments,
    loading: comments.loading,
  };
};

const mapDispatchToProps = {
  fetchComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
