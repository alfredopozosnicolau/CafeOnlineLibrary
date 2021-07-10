import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Constants
import * as actions from './actions';
import { routes } from './constants';

// Styles
import { CssBaseline } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Static/Stateless
import { NavBar, PageLayout, Welcome } from './components';

// Pages
import {
  BookInsert,
  BooksList,
  BooksTable,
  BookUpdate,
  BookDetails,
  BooksBrowse,
  Admin,
} from './pages';

class App extends Component {
  render() {
    const publicViews = (
      <Switch>
        <Route path='/' exact component={Welcome} />
        <Route exact path={routes.HOME} component={Welcome} />
        <Route exact path={routes.BOOK_INSERT} component={BookInsert} />
        <Route exact path={routes.BOOK_UPDATE} component={BookUpdate} />
        <Route exact path={routes.BOOK_DETAILS} component={BookDetails} />
        <Route exact path={routes.BOOKS_BROWSE} component={BooksList} />
        <Route exact path={routes.ADMIN} component={Admin} />
      </Switch>
    );

    return (
      <Router>
        <CssBaseline />
        <NavBar />
        <div className="app--main">
          <PageLayout />
          <div className="view-container">{publicViews}</div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
