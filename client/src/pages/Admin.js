import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// Constants
import * as actions from '.././actions';
import { routes } from '.././constants';

// Styles
import { CssBaseline } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././styles/App.css';

// Static/Stateless
import { NavBar, PageLayout, Welcome } from '.././components';
import { BooksTable, BookInsert } from './';
import BooksList from './BooksList';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
  padding-top:5%;
  
 
`;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'edit',
    };
  }
  handleChange = event => {
    debugger;
    this.setState({
      value: event.target.value,
    });
  };
  render() {
    return (
      <Wrapper>
      <FormControl component="fieldset">
        
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={this.state.value}
          onChange={this.handleChange}>

          <FormLabel component="legend">Admin Functionalities</FormLabel>  
          <FormControlLabel
            value="edit"
            control={<Radio color="primary" />}
            label="Edit Book"
            labelPlacement="top"
          />
          <FormControlLabel
            value="create"
            control={<Radio color="primary" />}
            label="Create Book"
            labelPlacement="top"
          />
        </RadioGroup>
        {this.state.value === 'edit' ? <BooksTable></BooksTable> : <BookInsert></BookInsert>}
      </FormControl>
      </Wrapper>
    );
  }
}
export default Admin;
