import React from 'react';
import axios from 'axios';
import '../css/MessageBoardApp.css';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import SearchBar from './SearchBar';

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://ssaksfithian-express-codealong.herokuapp.com/api/comments`)
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  }

  handleDelete = id => {
    axios
      .delete(`https://ssaksfithian-express-codealong.herokuapp.com/api/comments/${id}`)
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response || error.response.status === 404) {
          alert('ID not found');
        }
      });
  };

  handleAddComment = commentText => {
    axios
      .post(`https://ssaksfithian-express-codealong.herokuapp.com/api/comments/`, {
        text: commentText,
      })
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Please enter comment text!');
        }
      });
  };

  handleSearch = searchText => {
    axios
      .get(
        `https://ssaksfithian-express-codealong.herokuapp.com/api/comments/?filter=${searchText}`,
      )
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div className="message-board-app">
        <SearchBar onSearch={this.handleSearch} />
        <CommentList comments={this.state.comments} onDelete={this.handleDelete} />
        <AddCommentForm onAddComment={this.handleAddComment} />
      </div>
    );
  }
}

export default MessageBoardApp;
