import React, { Component } from 'react';
import './App.css';
import FilmRow from './FilmRow/FilmRow.js';
import CastRow from './CastRow/CastRow.js';
import $ from 'jquery';
import Header from './Header/Header.js'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SearchSettings from "./SearchSettings/SearchSettings.js";
import TopRated from './TopRated/TopRated';
import About from './About/About';
import TopRatedDemo from './TopRatedDemo/TopRatedDemo';

class App extends Component {
  constructor(props) {
    super(props)

    this.searchSettings = {
      showCast: false,
      showGenres: true,
      showDuration: true,
      showStatus: false,
      showDate: true,
      showBudget: false,
      showBox: true,
    }

    if (window.innerWidth < 800) {
      this.searchSettings.maxActors = 7

      this.state = {
        initial: 'state',
        some: '',
        searchString: '%20',
        searchRoute: '/search',
        showSettings: false
      }

      this.boxesSettings = {
        Box1: "Hide the box",
        Box2: "Hide the box",
        Box3: "Academy Awards"
      }

    } else {
      this.searchSettings.maxActors = 14

      this.state = {
        initial: 'state',
        some: '',
        searchString: '%20',
        searchRoute: '/search',
        showSettings: false
      }

      this.boxesSettings = {
        Box1: "Academy Awards",
        Box2: "Director",
        Box3: "Production"
      }
    }

    this.currentMaxActors = 14

    this.searchString = '%20'

    this.results = []

    this.getinfoAboutFilm()

    this.doTheSearch = this.doTheSearch.bind(this)
    this.searchRenderer = this.searchRenderer.bind(this)
    this.changeRadioActors = this.changeRadioActors.bind(this)
    this.changeRadioGenres = this.changeRadioGenres.bind(this)
    this.changeRadioDate = this.changeRadioDate.bind(this)
    this.changeRadioBudget = this.changeRadioBudget.bind(this)
    this.changeRadioBox = this.changeRadioBox.bind(this)
    this.changeRadioDuration = this.changeRadioDuration.bind(this)
    this.changeRadioStatus = this.changeRadioStatus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleCastKeyPress = this.handleCastKeyPress.bind(this)
    this.setBoxesSettings = this.setBoxesSettings.bind(this)
    this.changeShowSettings = this.changeShowSettings.bind(this)
    this.maxActorsRenderer = this.maxActorsRenderer.bind(this)
    this.updateMaxActors = this.updateMaxActors.bind(this)
  }

  changeShowSettings() {
    // let location = window.location.pathname

    this.setState({ showSettings: !this.state.showSettings })

  }

  setBoxesSettings(box, setting) {
    this.boxesSettings[box] = setting

    this.refillRows()
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.doTheSearch();
      return (<Redirect to={this.state.searchRoute} />)
    }
  }

  refillRows() {
    var filmrows = []

    if (this.results.length === 0) {
      filmrows.push(<p>No results found</p>)
    } else {
      var i = 0;

      this.results.forEach((film) => {
        film.settings = this.searchSettings

        film.arrayId = i

        this.getinfoAboutFilm(film.id)

        film.genres = this.filmData.genres
        film.releaseDate = this.filmData.release_date
        film.budget = this.filmData.budget
        film.boxOffice = this.filmData.revenue
        film.filmStatus = this.filmData.status
        film.duration = this.filmData.runtime
        film.production = this.filmData.production_companies

        if (this.searchSettings.showCast === true || Object.values(this.boxesSettings).includes("Director") || Object.values(this.boxesSettings).includes("Writer") || Object.values(this.boxesSettings).includes("Composer")) {
          this.findCredits(film.id, film.title)

        }

        const filmInfo = <FilmRow key={film.id} crew={this.crewRes} film={film} boxesSettings={this.boxesSettings} />
        filmrows.push(filmInfo)

        if (this.searchSettings.showCast === true) {
          const castInfo = <CastRow key={this.castRes.cast_id} cast={this.castRes} maxActors={this.searchSettings.maxActors} />

          filmrows.push(castInfo)
        }

        i++;
      })
    }

    this.setState({ rows: filmrows })
  }

  doTheSearch() {
    if (this.searchString === undefined || this.searchString === '') {
      this.searchString = '%20';
    }
    const urlApi = 'https://api.themoviedb.org/3/search/movie?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&query=' + this.searchString;
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")
        const results = searchResults.results

        this.results = results

        this.refillRows()
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }

  findCredits(filmId) {
    const urlApi = 'https://api.themoviedb.org/3/movie/' + filmId + '/credits?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0'
    $.ajaxSetup({ "async": false })
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")

        this.castRes = searchResults.cast
        this.crewRes = searchResults.crew
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }


  updateMaxActors() {
    if (this.currentMaxActors >= 0 && this.currentMaxActors <= 140) {
      this.searchSettings.maxActors = this.currentMaxActors
      this.refillRows()
    }
  }

  handleCastKeyPress(event) {
    if (event.key === 'Enter') {
      this.updateMaxActors()

      this.refillRows()
    }
  }

  maxActorsRenderer(event) {
    const amount = event.target.value
    this.currentMaxActors = amount
  }

  searchRenderer(event) {
    const searchStr = event.target.value;
    this.searchString = searchStr
  }

  searchPeople() {
    const urlApi = 'https://api.themoviedb.org/3/movie/299537?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US';
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")
        // const results = searchResults
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }

  searchFilm() {
    const urlApi = 'https://api.themoviedb.org/3/movie/299537?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US';
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")
        //const results = searchResults
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }

  changeRadioActors() {
    if (this.searchSettings.showCast) {
      this.searchSettings.showCast = false;
    } else {
      this.searchSettings.showCast = true;
    }

    this.refillRows();
  }

  changeRadioGenres() {
    if (this.searchSettings.showGenres) {
      this.searchSettings.showGenres = false;
    } else {
      this.searchSettings.showGenres = true;
    }

    this.refillRows();
  }

  changeRadioDate() {
    if (this.searchSettings.showDate) {
      this.searchSettings.showDate = false;
    } else {
      this.searchSettings.showDate = true;
    }

    this.refillRows();
  }

  changeRadioBudget() {
    if (this.searchSettings.showBudget) {
      this.searchSettings.showBudget = false;
    } else {
      this.searchSettings.showBudget = true;
    }

    this.refillRows();
  }

  changeRadioBox() {
    if (this.searchSettings.showBox) {
      this.searchSettings.showBox = false;
    } else {
      this.searchSettings.showBox = true;
    }

    this.refillRows();
  }

  changeRadioStatus() {
    if (this.searchSettings.showStatus) {
      this.searchSettings.showStatus = false;
    } else {
      this.searchSettings.showStatus = true;
    }

    this.refillRows();
  }

  changeRadioDuration() {
    if (this.searchSettings.showDuration) {
      this.searchSettings.showDuration = false;
    } else {
      this.searchSettings.showDuration = true;
    }

    this.refillRows();
  }

  getinfoAboutFilm(filmId) {
    const urlApi = 'https://api.themoviedb.org/3/movie/' + filmId + '?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US';
    $.ajaxSetup({ "async": false })
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        this.filmData = searchResults
      },
      error: (xhr, status, err) => {
      }
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Header changeShowSettings={this.changeShowSettings} searchRenderer={this.searchRenderer} doTheSearch={this.doTheSearch} handleKeyPress={this.handleKeyPress} />
          {
            this.state.showSettings ?
              <SearchSettings handleCastKeyPress={this.handleCastKeyPress} maxActorsRenderer={this.maxActorsRenderer} maxActors={this.searchSettings.maxActors} changeRadioStatus={this.changeRadioStatus} changeRadioDuration={this.changeRadioDuration} changeShowSettings={this.changeShowSettings} boxesSettings={this.boxesSettings} setBoxesSettings={this.setBoxesSettings} updateMaxActors={this.updateMaxActors} searchSettings={this.searchSettings} changeRadioGenres={this.changeRadioGenres} changeRadioDate={this.changeRadioDate} changeRadioBudget={this.changeRadioBudget} changeRadioBox={this.changeRadioBox} changeRadioActors={this.changeRadioActors} />
              : null
          }
          <Switch>
            <Route path='/search' component={() =>
              <div>
                <div className="searchData">
                  {this.state.rows}
                </div>
              </div>}>
            </Route>
            <Route path='/toprated' component={() =>
              <div>
                <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='topRated' page={1} />
                <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='topRated' page={2} />
                <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='topRated' page={3} />
                <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='topRated' page={4} />
                <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='topRated' page={5} />
              </div>
            }>
            </Route>
            <Route path='/popular' component={() =>
              <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='popular' page={1} />
            }>
            </Route>
            <Route path='/upcoming' component={() =>
              <TopRated searchSettings={this.searchSettings} boxesSettings={this.boxesSettings} type='upcoming' page={1} />
            }>
            </Route>
            <Route path='/about' component={() =>
              <About />
            }>
            </Route>
            <Route path='/' component={() =>
              <div>
                <TopRatedDemo type='topRated' page={1}/>
                <TopRatedDemo type='popular' page={1}/>
                <TopRatedDemo type='upcoming' page={1}/>
              </div>
              }>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
