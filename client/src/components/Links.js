import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '.././constants';

import Logo from './Logo';

const HomeWrapper = styled.div``;

const Collapse = styled.div.attrs({
   className: 'collapse navbar-collapse',
})`
  @media screen and (max-width: 420px) {
    display: flex;
    flex-grow: 1;
  }
`;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})`
  @media screen and (max-width: 420px) {
    flex-direction: row;
    justify-content: space-between;
    /* justify-content: flex-start; */
    width: 100%;
  }
`;

const Book = styled.div.attrs({
  // className: 'collapse navbar-collapse',
})`
  @media screen and (max-width: 420px) {
    /* margin-right: 2em; */
  }
`;

const homeStyles = {
  marginLeft: `1em`,
};

const logoStyles = {
  height: '60px',
  width: '60px',
};

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <HomeWrapper>
          <Link to="/" className="navbar-logo" style={homeStyles}>
            LOGO <i className='fab fa-typo3' />
          </Link>
        </HomeWrapper>
        <Collapse>
          <List>
            <Book>
              <Link to={'/books/browse'} className="nav-links">
                Catalog
              </Link>
            </Book>
            <Book>
              <Link to={'/Admin'} className="nav-links">
                Administrator
              </Link>
            </Book>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default Links;
