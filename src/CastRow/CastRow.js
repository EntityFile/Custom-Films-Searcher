import React from 'react';
import './CastRow.css';

class CastRow extends React.Component {
    addDefaultSrc(ev) {
        ev.target.src = 'notloadprofile3.svg'
      } 
    render() {
      var arr = this.props.cast
      var renderedOutput = arr.map(item =><div className="castBoxes">
        <img onError={this.addDefaultSrc} className="castPic" width="50" alt="cast-pic" src={'https://image.tmdb.org/t/p/w138_and_h175_face/' + item.profile_path} />
        <p className="castName">{item.name}</p>
        <p className="testP">{
          item.character.length < 35 ?
            item.character
          : item.character.slice(0, 35) + '...'
        }</p>
      </div>)

        return <div className="castBar">
        {renderedOutput.slice(0, this.props.maxActors)}
      </div>
    }
};

export default CastRow;