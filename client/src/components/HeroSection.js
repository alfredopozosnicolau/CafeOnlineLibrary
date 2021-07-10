import React from 'react'
import '../App.css';
import './HeroSection.css';
import { Button } from './buttons/landingButton.js';

// HeroSection displays the landing page's background and properties

function HeroSection() {
    return (
        <div className='hero-container'>
            <h1>WELCOME TO THE TIGER CAFE LIBRARY</h1>
            <h2>Donate. Read. Repeat.</h2>
            <p>The Tiger Cafe Library is a community-driven bookshare hosted by the Tiger Cafe.
                Patrons can use this site to borrow, return and check the availability of books.
                Be sure to stop by the cafe to donate your used books and help grow the library!
            </p>
            <div className="hero-btn">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>BROWSE BOOKS</Button>
            </div>
        </div>
    )
}

export default HeroSection;