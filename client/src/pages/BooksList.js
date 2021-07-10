import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTable } from 'react-table';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import MaUTable from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import {
  colors,
  CssBaseline,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from '@material-ui/core';

import styled from 'styled-components';
import '../styles/Books.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
});
const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  @media screen and (max-width: 420px) {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
`;

const Table = ({ columns, data }) => {
  const classes = useStyles();
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              prepareRow(row);
              debugger;
              return (
                <TableRow
                  component={Link}
                  to={`/book/details/${row.original._id}`}
                  data-row-book-id={row.original._id}
                  key={row.id}
                  {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    console.log('cell', cell);

                    return (
                      <TableCell key={row.values._id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

class BooksTable extends Component {
  componentDidMount() {
    console.log('BooksList: props');
    console.log(this.props);
    // if (((this.props.bookData || {}).items || []).length) return;

    this.props.fetchAllBooks();
  }

  render() {
    const { books, loaded, loading } = this.props.bookData || {};
    console.log(books);

    const columns = [
      {
        //Header: 'Isbn',
        accessor: 'image',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <img src={original.image_url_m} />;
        },
      },
      {
        Header: 'Title',
        accessor: 'title',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.title}>{props.value}</span>;
        },
      },
      {
        Header: 'Author',
        accessor: 'author',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return <span data-name={original.author}>{props.value}</span>;
        },
      },
      {
        Header: 'Availability',
        accessor: 'available',

        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return original.available == 0 ? (
            <p className="unavailable">Unavailable</p>
          ) : (
            <p className="available">Available</p>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        <h4 className="browsebook" style={{ textAlign: 'left' }}>
          Books
        </h4>
        {(books || []).length > 0 ? (
          <Table data={books} columns={columns} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BooksTable);
