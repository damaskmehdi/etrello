import React, { Component } from "react";

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    filterText: ''
  }
  searchText = 'type something';

  onSearchChange = (e) => {
    const filterText = e.target.value;
    this.setState({filterText: filterText});
    this.props.onSearchChange(filterText);
  }

  render() {
    //const { onChange }

    return (
      <input className="search-input"
             placeholder={ this.searchText }
             onChange={ this.onSearchChange }
             value={ this.state.filterText } />
    );
  }


}
