import React from 'react';
import './App.css';

class CastRow extends React.Component {
    addDefaultSrc(ev) {
        ev.target.src = 'notloadprofile.svg'
      } 
    render() {
      var arr = this.props.cast
      var renderedOutput = arr.map(item =><div className="castBoxes">
        <img onError={this.addDefaultSrc} className="castPic" width="50" alt="cast-pic" src={'https://image.tmdb.org/t/p/w138_and_h175_face/' + item.profile_path} onerror="this.onerror=null;this.src='notloadprofile.svg';"/>
        <p className="castName">{item.name}</p>
      </div>)

        return <div className="castBar">
        <div className="castSpace"></div>{renderedOutput}
      </div>
    }
};

export default CastRow;