import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTextValue: '',
    };
  }

  handleChange = event => {
    this.setState({ searchTextValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state.searchTextValue);
    // this.setState({ searchTextValue: '' });
  };

  render() {
    return (
      <nav>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={this.state.searchTextValue}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    );
  }
}

export default SearchBar;
