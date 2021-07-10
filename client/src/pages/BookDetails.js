import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSingleBook, borrowBook, returnBook } from '../actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { ReturnButton, BorrowButton } from '../components/buttons';
import '../styles/BookDetails.css'



const Label = styled.label`
  margin: 5px;
  max-width: 30%;
`;

class BookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
      author: '',
      publication_year: '',
      publisher: '',
      isbn: '',
      image_url_s: '',
      image_url_m: '',
      image_url_l: '',
      copies: 0,
      available: 0,
    };
  }

  componentDidMount() {
    this.props.fetchSingleBook(this.props.bookId).then(resp => {
      const { book } = resp.data;
      this.setState({ ...book });
    });
  }
  handleBorrowBook = data => {
    const bookId = data;

    this.props.borrowBook(bookId).then(resp => {
      console.log('handleBorrowBook: resp');
      console.log(resp);
      this.props.fetchSingleBook(this.props.bookId).then(resp => {
        const { book } = resp.data;
        this.setState({ ...book });
      });
    });
  };
  handleReturnBook = data => {
    const bookId = data;

    this.props.returnBook(this.props.bookId).then(resp => {
      console.log('handleReturnBook: resp');
      console.log(resp);
      this.props.fetchSingleBook(this.props.bookId).then(resp => {
        const { book } = resp.data;
        this.setState({ ...book });
      });
    });
  };

  render() {
    const {
      _id,
      title,
      author,
      publication_year,
      publisher,
      isbn,
      image_url_s,
      image_url_m,
      image_url_l,
      copies,
      available,
    } = this.state;

    return (
      _id && (
        <React.Fragment>
        <div className='main'>
          
          <CssBaseline />
          <Container fixed>
            <Typography component="div" style={{ backgroundColor: '#ffffff', height: '90vh' }}>
             <div className='title'> 
              <h1>Book Details</h1>
              </div>
              <img src={image_url_l} alt={title} />
            
              <div className='booksdetail'>
              <div>
                <p className='booktitle'>
                
                  <Label>{title} </Label>
                </p>
              </div>
              <div className='italic'>
              <div>
                <p>
                 
                  <Label>{author} </Label>
                </p>
              </div>
              <div>
                <p>
                  Publication Year:
                  <Label>{publication_year} </Label>
                </p>
              </div>
              <div>
                <p>
                  Publisher:
                  <Label>{publisher} </Label>
                </p>
              </div>
              <div>
                <p>
                  Isbn:
                  <Label>{isbn} </Label>
                </p>
              </div>
              <div>
                <p>
                  Copies:
                  <Label>{copies} </Label>
                </p>
              </div>
              <div>
                <p>
                  Available:
                  <Label>{available} </Label>
                </p>
              </div>
              <div>
                <span data-delete-id={_id}>
                  {available >= 1 && <BorrowButton id={_id} onBorrow={this.handleBorrowBook} />}
                </span>
              </div>
              <div>
                <span data-delete-id={_id}>
                  {copies > available && <ReturnButton id={_id} onReturn={this.handleReturnBook} />}
                </span>
              </div>
              </div>
              </div>
            </Typography>
          </Container>
          </div>
        </React.Fragment>
      )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    bookId: ownProps.match.params.id,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchSingleBook, borrowBook, returnBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
