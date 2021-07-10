import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table-6';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  padding-top:5%;
  text-align:center;
`;

class BooksList extends Component {
  componentDidMount() {
    console.log('BooksList: props');
    console.log(this.props);
    // if (((this.props.bookData || {}).books || []).length) return;

    this.props.fetchAllBooks();
  }

  handleRemoveBook = data => {
    const bookId = data;

    this.props.deleteSingleBook(bookId).then(resp => {
      console.log('handleRemoveBook: resp');
      console.log(resp);
      this.props.fetchAllBooks();
    });
  };

  render() {
    const { books, loaded, loading } = this.props.bookData || {};
    console.log(books);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true,
        Cell: props => {
          return <span data-book-id={props.original._id}>{props.original._id}</span>;
        },
      },
      {
        Header: 'Isbn',
        accessor: 'isbn',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.isbn}>{props.value}</span>;
        },
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.titile}>{props.value}</span>;
        },
      },
      {
        Header: 'Author',
        accessor: 'author',
        filterable: true,
        Cell: props => {
          return <span data-name={props.original.author}>{props.value}</span>;
        },
      },

      {
        Header: 'Puplication Year',
        accessor: 'publication_year',
        filterable: true,

        Cell: props => {
          return <span data-priority={props.original.publication_year}>{props.value || '-'}</span>;
        },
      },
      {
        Header: 'Publisher',
        accessor: 'publisher',
        filterable: true,
        Cell: props => {
          return <span data-priority={props.original.publisher}>{props.value}</span>;
        },
      },
      {
        Header: 'Copies',
        accessor: 'copies',
        // filterable: true,
        Cell: props => {
          return <span data-name={props.original.copies}>{props.value}</span>;
        },
      },
      {
        Header: 'Available',
        accessor: 'available',

        // filterable: true,
        Cell: props => {
          return <span data-name={props.original.available}>{props.value}</span>;
        },
      },

      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <Link data-update-id={props.original._id} to={`/admin/update/${props.original._id}`}>
              Update Book
            </Link>
          );
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: props => {
          return (
            <span data-delete-id={props.original._id}>
              <DeleteButton id={props.original._id} onDelete={this.handleRemoveBook} />
            </span>
          );
        },
      },
    ];

    return (
      <Wrapper>
        {(books || []).length > 0 ? ( // defeats the purpose of using `isLoading` prop?
          <ReactTable
            data={books}
            columns={columns}
            isLoading={loaded && loading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={10}
          />
        ) : (
          `No books to render... :(`
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
