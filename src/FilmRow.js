import React from 'react';
import './App.css';

class FilmRow extends React.Component {
    addDefaultSrc(ev) {
      ev.target.src = 'notloadposter.svg'
    }

    numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    refactorData() {
      var genres = []
      for (var i = 0; i < this.props.film.genres.length; i++) {
        if (i !== this.props.film.genres.length - 1) {
          genres.push(this.props.film.genres[i].name + ', ')
        } else {
          genres.push(this.props.film.genres[i].name)
        }
      }

      if (genres.length === 0) {
        genres = 'Unknown'
      }

      var date = this.props.film.releaseDate
      if (date === '') {
        date = 'Unknown'
      }

      var budget = this.numberWithSpaces(this.props.film.budget)
      if (budget === '0') {
        budget = 'Unknown'
      } else {
        budget += '$'
      }
      var rev = this.numberWithSpaces(this.props.film.boxOffice)
      if (rev === '0') {
        rev = 'Unknown'
      } else {
        rev += '$'
      }
      return [genres, date, budget, rev] 
    }

    render() {
        var data = this.refactorData()
        var genres = data[0]
        var date = data[1]
        var budget = data[2]
        var rev = data[3]

        var divId = 'searchRow2'

        if (this.props.film.arrayId%2 === 0) {
          divId = 'searchRow1'
        }

        return <div className={divId} >
          <img onError={this.addDefaultSrc} className="posterImg" width="150" alt="film-poster" src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + this.props.film.poster_path}/>
          <div>
            <p className="filmTitle">{this.props.film.title}</p>
            {
              this.props.film.settings.showGenres?
              <p className="filmInfo"><strong>Genres: </strong>{genres}</p>
              :null
            }
            {
              this.props.film.settings.showDate?
              <p className="filmInfo"><strong>Release date: </strong>{date}</p>
              :null
            }
            {
              this.props.film.settings.showBudget?
              <p className="filmInfo"><strong>Budget: </strong>{budget}</p>
              :null
            }
            {
              this.props.film.settings.showBox?
              <p className="filmInfo"><strong>Worldwide box office: </strong>{rev}</p>
              :null
            }
          </div>  
        </div>
    }
};

export default FilmRow;