import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { insertSingleBook } from '../actions';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import '../styles/BookUpdate.css';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
  text-align: left;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 100%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 70%;
  text-align: left;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;

  background-color: rgb(57, 150, 150);
  color: white;
  font-size: 20px;
  padding: 2px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class BookInsert extends Component {
  constructor(props) {
    /**
     * Currently deprecated and now known as the "legacy context":
     * - https://reactjs.org/docs/legacy-context.html
     *
     * TODO: refactor to use new Context API:
     * - https://reactjs.org/docs/context.html
     */
    super(props);
    this.state = {
      isbn: '',
      title: '',
      author: '',
      publication_year: '',
      publisher: '',
      copies: '',
      available: '',
      image_url_s: '',
      redirect: null,
    };
  }

  handleChangeInputIsbn = async event => {
    const isbn = event.target.value;
    const reg = /^\d+$|^$/;
    if (reg.test(isbn)) {
      this.setState({ isbn });
    }
  };

  handleChangeInputTitle = async event => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleChangeInputAuthor = async event => {
    const author = event.target.value;
    this.setState({ author });
  };

  handleChangeInputYear = async event => {
    const publication_year = event.target.value;
    this.setState({ publication_year });
  };
  handleChangeInputPublisher = async event => {
    const publisher = event.target.value;
    this.setState({ publisher });
  };
  handleChangeInputImage = async event => {
    const image_url_s = event.target.value;
    this.setState({ image_url_s });
  };
  handleChangeInputCopies = async event => {
    const copies = event.target.value;
    this.setState({ copies });
  };
  handleChangeInputAvailable = async event => {
    const available = event.target.value;
    this.setState({ available });
  };

  handleInsertBook = event => {
    event.preventDefault();

    const {
      isbn,
      title,
      author,
      publication_year,
      publisher,
      copies,
      available,
      image_url_m,
    } = this.state;

    const book = {
      isbn,
      title,
      author,
      publication_year,
      publisher,
      copies,
      available,
      image_url_m,
    };

    this.props
      .insertSingleBook(book)
      .then(resp => {
        console.log('handleInsertBook: resp');
        console.log(resp);
        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Book inserted successfully');
          this.setState({
            isbn: '',
            title: '',
            author: '',
            publication_year: '',
            publisher: '',
            copies: '',
            available: '',
            image_url_s: '',
            redirect: '/books/browse',
          });

          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        // TODO: pass error object correctly so that things like validation errors can be displayed to user
        window.alert(`There was an error creating the book... :(`);
        console.log('handleInsertBook: err');
        console.log(err);
      });
  };

  render() {
    const {
      isbn,
      title,
      author,
      publication_year,
      publisher,
      copies,
      available,
      image_url_s,
      redirect,
    } = this.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Container fixed>
        <Wrapper>
          <Typography
            component="div"
            style={{ backgroundColor: '#ffffff', width: '140vh', height: '120vh' }}>
            <div className="title-update">
              <Title>Create Book</Title>
            </div>
            <Label>Isbn: </Label>
            <InputText type="text" value={isbn} onChange={this.handleChangeInputIsbn} />

            <Label>Title: </Label>
            <InputText type="text" value={title} onChange={this.handleChangeInputTitle} />

            <Label>Author: </Label>
            <InputText type="text" value={author} onChange={this.handleChangeInputAuthor} />

            <Label>Publication Year: </Label>
            <InputText type="text" value={publication_year} onChange={this.handleChangeInputYear} />

            <Label>Publisher: </Label>
            <InputText type="text" value={publisher} onChange={this.handleChangeInputPublisher} />

            <Label>Image Url: </Label>
            <InputText type="textarea" value={image_url_s} onChange={this.handleChangeInputImage} />

            <Label>Copies: </Label>
            <InputText
              type="number"
              pattern="[1-9]+)?"
              max="100"
              value={copies}
              onChange={this.handleChangeInputCopies}
            />

            <Label>Available: </Label>
            <InputText
              type="number"
              pattern="[1-9]+)?"
              max="100"
              value={available}
              onChange={this.handleChangeInputAvailable}
            />

            <Button onClick={this.handleInsertBook}>Add Book</Button>
          </Typography>
        </Wrapper>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ insertSingleBook }, dispatch);

export default connect(null, mapDispatchToProps)(BookInsert);
