import React, { Component } from 'react';
import '../css/CommentItem.css';

export class CommentItem extends Component {
  render() {
    const { comment, onDeleteMe } = this.props;
    return (
      <div className="message-board-comment-item">
        <p>{comment.text}</p>
        <button type="button" className="delete-button" onClick={onDeleteMe}>
          x
        </button>
      </div>
    );
  }
}

export default CommentItem;
