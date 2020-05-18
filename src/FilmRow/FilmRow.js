import React from 'react';
import './FilmRow.css';

class FilmRow extends React.Component {
  constructor() {
    super()
    this.state = {
      wins: '-',
      nominees: ''
    }
  }
  addDefaultSrc(ev) {
    ev.target.src = 'notloadposter.png'
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  showBox(box) {
    switch (this.props.boxesSettings[box]) {
      case ("Academy Awards"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Academy award</p>
          </div>
          <div className="additionalContent">
            <div className="oscar">
              <img className="oscarImg" alt="oscar" src='oscar.png' />
            </div>
            <div className="academyWins">
              <p className="academyResults">Wins:</p>
              <p className="academyResWin">{this.state.wins}</p>
            </div>
            <div className={"academyNom" + box[3]}>
              <p className="academyResults">Nominations:</p>
              <p className="academyResNominee">{this.state.nominees + this.state.wins}</p>
            </div>
          </div>
        </div>
      case ("Director"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Director</p>
          </div>
          <div className="additionalContent">

          </div>
        </div>
      case ("Production"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Production</p>
          </div>
          <div className="additionalContent">

          </div>
        </div>
      default:
        console.log('none')
    }
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

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const urlApi = 'http://api.wolframalpha.com/v2/query?input=' + this.props.film.title + '%20' + this.props.film.releaseDate.slice(0,4) + '%20academy%20award%20nominees&appid=J4Y65P-E5KWT68JLR&includepodid=Result&format=plaintext&output=json'
    fetch(proxyUrl + urlApi)
    .then(res => res.json())
    .then(
      (result) => {
        var nominees = 0
        var wins = 0
        console.log(result)
        if (result.queryresult.pods) {
          const res = result.queryresult.pods[0].subpods[0].plaintext.split(' ')
          for (const word of res) {
            if (word === '(nominee)') {
              nominees += 1
            } else if (word === '(winner)') {
              wins += 1
            }
          }
          this.setState({
            wins: wins,
            nominees: nominees
          })
        } else {
          console.log(result.queryresult)
        }

      }
    );
  }

  render() {
    var data = this.refactorData()
    let [genres, date, budget, rev] = data

    var divId = 'searchRow2'

    if (this.props.film.arrayId % 2 === 0) {
      divId = 'searchRow1'
    }

    return <div className={divId} >
      <img onError={this.addDefaultSrc} className="posterImg" alt="film-poster" src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + this.props.film.poster_path} />
      <div className="mainInfo">
        <p className="filmTitle">{this.props.film.title}</p>
        {
          this.props.film.settings.showGenres ?
            <p className="filmInfo"><strong>Genres: </strong>{genres}</p>
            : null
        }
        {
          this.props.film.settings.showDate ?
            <p className="filmInfo"><strong>Release date: </strong>{date}</p>
            : null
        }
        {
          this.props.film.settings.showBudget ?
            <p className="filmInfo"><strong>Budget: </strong>{budget}</p>
            : null
        }
        {
          this.props.film.settings.showBox ?
            <p className="filmInfo"><strong>Worldwide box office: </strong>{rev}</p>
            : null
        }
      </div>

      <div className="additionalInfo">
        <div className="additionalBoxes">
          {this.showBox('Box1')}
          {this.showBox('Box2')}
          {this.showBox('Box3')}
        </div>
      </div>
    </div>
  }
};

export default FilmRow;