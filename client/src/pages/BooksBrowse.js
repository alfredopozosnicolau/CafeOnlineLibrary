import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTable } from 'react-table';
import * as actions from '../actions';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/App.css';
import MaUTable from '@material-ui/core/Table';
import { DataGrid } from '@material-ui/data-grid';
import { CssBaseline, Divider, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  padding-top: 5%;
`;
const BookImage = styled.img`
  float: left;
  width: 100%;
  padding: 5px;
`;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const Table = ({ columns, data }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={7} {...getTableProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <Grid item xs={4} data-row-book-id={row.values._id} {...row.getRowProps()}>
            {row.cells.map(cell => {
              debugger;
              return (
                <div key={row.values._id} item {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </div>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
    /*
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow data-row-book-id={row.values._id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
    */
  );
};

class BooksBrowse extends Component {
  componentDidMount() {
    console.log('BooksList: props');
    console.log(this.props);
    // if (((this.props.bookData || {}).items || []).length) return;

    this.props.fetchAvailable();
  }

  render() {
    const { books, loaded, loading } = this.props.bookData || {};
    console.log(books);

    const columns = [
      {
        Header: ' ', //Image
        accessor: 'image',
        // filterable: true,
        Cell: props => {
          const { original } = props.cell.row;
          return (
            <div>
              <Link data-book-id={original._id} to={`/book/details/${original._id}`}>
                <BookImage src={original.image_url_m} alt={original.title} />
              </Link>
              {original.title}
            </div>
          );
        },
      },
    ];

    return (
      <Wrapper>
        <CssBaseline />
        {(books || []).length > 0 ? <Table data={books} columns={columns} pageSize={5} /> : ``}
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

export default connect(mapStateToProps, mapDispatchToProps)(BooksBrowse);
