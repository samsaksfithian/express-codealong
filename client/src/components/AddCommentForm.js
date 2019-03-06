import React from 'react';

class AddCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentTextValue: '',
    };
  }

  handleChange = event => {
    this.setState({ commentTextValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onAddComment(this.state.commentTextValue);
    this.setState({ commentTextValue: '' });
  };

  render() {
    return (
      <div className="add-comment">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="comment"
            placeholder="Your opinion here"
            value={this.state.commentTextValue}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={this.state.commentTextValue === ''}>
            Comment
          </button>
        </form>
      </div>
    );
  }
}

export default AddCommentForm;
