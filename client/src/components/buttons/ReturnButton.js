import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Return = styled.button.attrs({
  className: 'delete-item-btn',
})`
background-color: black;
color: white;
font-size: 20px;
padding: 2px 20px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
  }
`;

class ReturnButton extends Component {
  confirmReturnBook = event => {
    event.preventDefault();

    if (window.confirm(`Do you want to return this Book? ${this.props.id}`)) {
      this.props.onReturn(this.props.id);
    }
  };

  render() {
    return <Return onClick={this.confirmReturnBook}>Return Book</Return>;
  }
}

ReturnButton.propTypes = {
  id: PropTypes.string,
};

export default ReturnButton;
