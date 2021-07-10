import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSingleBook, updateSingleBook } from '../actions';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import '../styles/BookUpdate.css';

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
  margin: 10px 0px;
  cursor: pointer;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class BookUpdate extends Component {
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
      redirect: null,
    };
  }

  componentDidMount() {
    this.props.fetchSingleBook(this.props.bookId).then(resp => {
      const { book } = resp.data;
      this.setState({ ...book });
    });
  }

  handleChangeInputTitle = async event => {
    const title = event.target.value;
    this.setState({ title });
  };
  handleChangeInputAuthor = async event => {
    const author = event.target.value;
    this.setState({ author });
  };

  handleChangeInputIsbn = async event => {
    const isbn = event.target.value;
    this.setState({ isbn });
  };

  handleChangeInputPublisher = async event => {
    const publisher = event.target.value;
    this.setState({ publisher });
  };

  handleChangeInputPublishYear = async event => {
    const publication_year = event.target.value;
    this.setState({ publication_year });
  };

  handleChangeInputImgURLL = async event => {
    const image_url_l = event.target.value;
    this.setState({ image_url_l });
  };
  handleChangeInputImgURLM = async event => {
    const image_url_m = event.target.value;
    this.setState({ image_url_m });
  };
  handleChangeInputImgURLS = async event => {
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

  handleUpdateBook = event => {
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
    const book = {
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
    };

    return this.props
      .updateSingleBook(book)
      .then(resp => {
        console.log('handleUpdateBook: resp');

        console.log(resp);
        debugger;

        if (typeof resp === 'object' && resp.status < 300 && resp.status >= 200) {
          window.alert('Book updated successfully');
          this.setState({ redirect: '/admin' });
          return true;
        } else {
          throw resp;
        }
      })
      .catch(err => {
        window.alert(`There was an error updating the book... :(`);
        console.error('handleUpdateBook: err');
        console.error(err);
      });
  };
  handleCancelButton = event => {
    this.setState({ redirect: '/admin' });
  };

  confirmUpdateBook = event => {
    if (window.confirm(`Are you sure you want to update this book? ${this.state._id}`)) {
      return this.handleUpdateBook(event);
    }
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

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      _id && (
        <div className="update-main">
          <Container fixed>
            <Wrapper>
              <Typography component="div" style={{ backgroundColor: '#ffffff', height: '130vh' }}>
                <div className="title-update">
                  <Title>Update Book</Title>
                </div>
                <Label>Title: </Label>
                <InputText type="text" value={title} onChange={this.handleChangeInputTitle} />
                <Label>Author: </Label>
                <InputText type="text" value={author} onChange={this.handleChangeInputAuthor} />
                <Label>Publication year: </Label>
                <InputText
                  type="number"
                  value={publication_year}
                  onChange={this.handleChangeInputPublishYear}
                />
                <Label>Publisher: </Label>
                <InputText
                  type="text"
                  value={publisher}
                  onChange={this.handleChangeInputPublisher}
                />
                <Label>ISBN: </Label>
                <InputText type="text" value={isbn} onChange={this.handleChangeInputIsbn} />
                <Label>Image URL Small: </Label>
                <InputText
                  type="text"
                  value={image_url_s}
                  onChange={this.handleChangeInputImgURLS}
                />
                <Label>Image URL Medium: </Label>
                <InputText
                  type="text"
                  value={image_url_m}
                  onChange={this.handleChangeInputImgURLM}
                />
                <Label>Image URL Large: </Label>
                <InputText
                  type="text"
                  value={image_url_l}
                  onChange={this.handleChangeInputImgURLL}
                />
                <Label>Number of copies: </Label>
                <InputText type="number" value={copies} onChange={this.handleChangeInputCopies} />
                <Label>Copies Avalable: </Label>
                <InputText
                  max={copies}
                  type="number"
                  value={available}
                  onChange={this.handleChangeInputAvailable}
                />

                <Button onClick={this.confirmUpdateBook}>Update Book</Button>
                <CancelButton onClick={this.handleCancelButton}>Cancel</CancelButton>
              </Typography>
            </Wrapper>
          </Container>
        </div>
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
  bindActionCreators({ fetchSingleBook, updateSingleBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookUpdate);
