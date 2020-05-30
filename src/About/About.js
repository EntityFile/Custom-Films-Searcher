import React from 'react';
import './About.css';

class About extends React.Component {
  render() {
    return <div className="aboutOuter">
      <div className="aboutContent">
        <p className="aboutTitle">About</p>
        <p className="aboutText">Search Your Movie - is web application that was made in purpose to make movie searching easizer. This site uses TMDB API, which concludes millions of movies. Main feature of the site is custom searching. You can open settings box by clicking on the icon in the right top corner. All you need is to put your searching query to the search input bar and press the search button.</p>
        <p className="aboutText">This site was made as a project at UCU by Volodymyr Lesyk.</p>
      </div>
    </div>
  }
}

export default About;