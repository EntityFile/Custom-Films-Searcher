import React from 'react';
import './FilmRow.css';

class FilmRow extends React.Component {
  constructor() {
    super()
    this.state = {
      wins: <img className="load" style={{'filter': 'invert(49%) sepia(62%) saturate(527%) hue-rotate(2deg) brightness(80%) contrast(98%)'}} width="30" alt="loading" src="https://i.gifer.com/ZNeT.gif" />,
      nominees: <img className="load" style={{'filter': 'invert(69%) sepia(73%) saturate(3603%) hue-rotate(10deg) brightness(105%) contrast(175%)'}} width="25" alt="loading" src="https://i.gifer.com/ZNeT.gif" />
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = 'notloadposter3.png'
  }
  
  addDefaultSrcCrew(ev) {
    ev.target.src = 'notloadprofile3.svg'
  }

  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  showBox(box, director, writer, composer, production) {
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
              <p className="academyResNominee">{
                Number.isInteger(parseInt(this.state.nominees)) ?
                this.state.wins + this.state.nominees
                : this.state.nominees
              }</p>
            </div>
          </div>
        </div>
      case ("Director"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Director</p>
          </div>
          <div className="additionalContent">
            <div className="crewImgDiv">
              <img onError={this.addDefaultSrcCrew} className="crewImg" width="40" alt="Crew member" src={"https://image.tmdb.org/t/p/w138_and_h175_face/" + director.profile_path}/>
            </div>
            <p className="crewTitle">{
              director.name ?
                director.name
              : 'Unknown'
              }
            </p>
          </div>
        </div>
      case ("Writer"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Writer</p>
          </div>
          <div className="additionalContent">
            <div className="crewImgDiv">
              <img onError={this.addDefaultSrcCrew} className="crewImg" width="40" alt="Crew member" src={"https://image.tmdb.org/t/p/w138_and_h175_face/" + writer.profile_path}/>
            </div>
            <p className="crewTitle">{
              writer.name ?
                writer.name
              : 'Unknown'
              }
            </p>
          </div>
        </div>
      case ("Composer"):
        return <div className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Composer</p>
          </div>
          <div className="additionalContent">
            <div className="crewImgDiv">
              <img onError={this.addDefaultSrcCrew} className="crewImg" width="40" alt="Crew member" src={"https://image.tmdb.org/t/p/w138_and_h175_face/" + composer.profile_path}/>
            </div>
            <p className="crewTitle">{
              composer.name ?
                composer.name
              : 'Unknown'
              }
            </p>
          </div>
        </div>
      case ("Production"):
        return <div style={
          window.innerWidth < 800 ?
            {"padding-bottom": "2px"}
          : {"padding-bottom": "5px"}
          } className={"additional" + box}>
          <div className="additionalTitle">
            <p className="additionalTitleP">Production</p>
          </div>
          <div className="additionalContent">
            {production}
          </div>
        </div>
      case ("Hide the box"):
        return <div></div>
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

    var duration = this.props.film.duration
    if (duration === '' || duration === 0 || duration === null) {
      duration = 'Unknown'
    } else {
      duration += ' min'
    }

    var filmStatus = this.props.film.filmStatus
    if (filmStatus === '') {
      filmStatus = 'Unknown'
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

    var director = {}
    if (Object.values(this.props.boxesSettings).includes("Director")) {
      for (const drtor of this.props.crew) {
        if (drtor.department === "Directing" && drtor.job === "Director") {
          // Could be 2 or more directors in one box, but i don't know how to fit them into the box.
          director = drtor
          break;
        }
      }
    }

    var writer = {}
    if (Object.values(this.props.boxesSettings).includes("Writer")) {
      for (const wrtr of this.props.crew) {
        if ((wrtr.department === "Writing") && (wrtr.job === "Screenplay" || wrtr.job === "Writer")) {
          // Could be 2 or more writers in one box, but i don't know how to fit them all into the box.
          writer = wrtr
          break;
        }
      }
    }

    var composer = {}
    if (Object.values(this.props.boxesSettings).includes("Composer")) {
      for (const cmpsr of this.props.crew) {
        if ((cmpsr.department === "Sound") && (cmpsr.job === "Original Music Composer" || cmpsr.job === "Music")) {
          // Could be 2 or more composers in one box, but i don't know how to fit them all into the box.
          composer = cmpsr
          break;
        }
      }
    }

    var production = []
    if (Object.values(this.props.boxesSettings).includes("Production")) {
      var id = 0
      for (const prod of (this.props.film.production.slice(0, 5))) {
        production.push(
          <div className='prodDiv'>
            <p className={"prodTitle" + (id % 2 + 1)}>{
            prod.name.length > 35 ?
              prod.name.slice(0, 35) + '...'
            : prod.name
            }
            </p>
          </div>
        )

        id++;
      }
    }

    return [genres, date, budget, rev, filmStatus, duration, director, writer, composer, production]
  }

  componentDidMount() {
    if (Object.values(this.props.boxesSettings).includes("Academy Awards")) {
      const proxyUrl = 'https://sym-cors-server.herokuapp.com/'
      const urlApi = 'http://api.wolframalpha.com/v2/query?input=' + this.props.film.title + '%20film%20' + this.props.film.releaseDate.slice(0, 4) + '%20academy%20award%20nominees&appid=J4Y65P-E5KWT68JLR&includepodid=Result&format=plaintext&output=json'
      fetch(proxyUrl + urlApi)
        .then(res => res.json())
        .then(
          (result) => {
            var nominees = 0
            var wins = 0
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
              this.setState({
                wins: '-',
                nominees: '-'
              })
            }

          }
        );
    }
  }

  render() {
    var data = this.refactorData()
    let [genres, date, budget, rev, filmStatus, duration, director, writer, composer, production] = data


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
          this.props.film.settings.showDuration ?
            <p className="filmInfo"><strong>Duration: </strong>{duration}</p>
            : null
        }
        {
          this.props.film.settings.showBox ?
            <p className="filmInfo"><strong>Worldwide box office: </strong>{rev}</p>
            : null
        }
        {
          this.props.film.settings.showBudget ?
            <p className="filmInfo"><strong>Budget: </strong>{budget}</p>
            : null
        }
        {
          this.props.film.settings.showStatus ?
            <p className="filmInfo"><strong>Status: </strong>{filmStatus}</p>
            : null
        }
      </div>

      <div className="additionalInfo">
        <div className="additionalBoxes">
          {this.showBox('Box1', director, writer, composer, production)}
          {this.showBox('Box2', director, writer, composer, production)}
          {this.showBox('Box3', director, writer, composer, production)}
        </div>
      </div>
    </div>
  }
};

export default FilmRow;