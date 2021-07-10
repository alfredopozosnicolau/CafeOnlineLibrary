import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Borrow = styled.button.attrs({
  className: 'delete-item-btn',
})`
background-color: rgb(57, 150, 150);
color: white;
font-size: 20px;
padding: 2px 20px;
border-radius: 5px;
margin: 10px 0px;
cursor: pointer;
`;
class BorrowButton extends Component {
  confirmBorrowBook = event => {
    event.preventDefault();

    if (window.confirm(`Do you want to Borrow this book? ${this.props.id} `)) {
      this.props.onBorrow(this.props.id);
    }
  };

  render() {
    return <Borrow onClick={this.confirmBorrowBook}>Borrow Book</Borrow>;
  }
}

BorrowButton.propTypes = {
  id: PropTypes.string,
};

export default BorrowButton;
