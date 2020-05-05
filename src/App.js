import React, { Component } from 'react';
import './App.css';
import FilmRow from './FilmRow.js';
import CastRow from './CastRow.js';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: 'state',
      some: ''
    }

    this.searchSettings = {
      showCast: false,
      showGenres: true,
      showDate: true,
      showBudget: true,
      showBox: true
    }

    this.searchString = ''

    this.getinfoAboutFilm()

    this.doTheSearch = this.doTheSearch.bind(this)  
    this.changeRadioActors = this.changeRadioActors.bind(this)
    this.changeRadioGenres = this.changeRadioGenres.bind(this)
    this.changeRadioDate = this.changeRadioDate.bind(this)
    this.changeRadioBudget = this.changeRadioBudget.bind(this)
    this.changeRadioBox = this.changeRadioBox.bind(this)
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

        if (results.length === 0) {
          alert('No results')
        }

        var filmrows = []
        var i = 0
        results.forEach((film) => {
          film.arrayId = i

          console.log(this.searchSettings)
          film.settings = this.searchSettings

          this.getinfoAboutFilm(film.id)
          
          film.genres = this.filmData.genres
          film.releaseDate = this.filmData.release_date
          film.budget = this.filmData.budget
          film.boxOffice = this.filmData.revenue

          const filmInfo = <FilmRow key={film.id} film={film}/>
          i++;
          filmrows.push(filmInfo)

          if (this.searchSettings.showCast === true) {
            this.findCredits(film.id, film.title)
            const castInfo = <CastRow key={this.castRes.cast_id} cast={this.castRes}/>
            
            filmrows.push(castInfo)
          }
        })

        this.setState({rows: filmrows})
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }

  findCredits(filmId, filmTitle) {
    const urlApi = 'https://api.themoviedb.org/3/movie/' + filmId + '/credits?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0'
    $.ajaxSetup({"async": false})
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")
        const slicedSearchResults = searchResults.cast

        this.castRes = slicedSearchResults.slice(0, 10)        
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }
  
  searchRenderer(event) {
    const searchStr = event.target.value;
    this.searchString = searchStr;
  }

  searchPeople() {
    const urlApi = 'https://api.themoviedb.org/3/movie/299537?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US';
    $.ajax({
      url: urlApi,
      success: (searchResults) => {
        console.log("Data received successfuly")
        const results = searchResults
        console.log(results);
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
        const results = searchResults
        console.log(results);
      },
      error: (xhr, status, err) => {
        console.log("Failed to receive data")
      }
    })
  }

  changeRadioActors() {
    console.log(this.searchSettings.showCast)
    if (this.searchSettings.showCast) {
      this.searchSettings.showCast = false;
    } else {
      this.searchSettings.showCast = true;
    }

    this.doTheSearch();
  }

  changeRadioGenres() {
    console.log(this.searchSettings.showGenres)
    if (this.searchSettings.showGenres) {
      this.searchSettings.showGenres = false;
    } else {
      this.searchSettings.showGenres = true;
    }

    console.log(this.searchSettings.showGenres)

    this.doTheSearch();
  }

  changeRadioDate() {
    console.log(this.searchSettings.showDate)
    if (this.searchSettings.showDate) {
      this.searchSettings.showDate = false;
    } else {
      this.searchSettings.showDate = true;
    }

    this.doTheSearch();
  }

  changeRadioBudget() {
    console.log(this.searchSettings.showBudget)
    if (this.searchSettings.showBudget) {
      this.searchSettings.showBudget = false;
    } else {
      this.searchSettings.showBudget = true;
    }

    this.doTheSearch();
  }

  changeRadioBox() {
    console.log(this.searchSettings.showBox)
    if (this.searchSettings.showBox) {
      this.searchSettings.showBox = false;
    } else {
      this.searchSettings.showBox = true;
    }

    this.doTheSearch();
  }

  getinfoAboutFilm(filmId) {
    const urlApi = 'https://api.themoviedb.org/3/movie/' + filmId + '?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US';
    $.ajaxSetup({"async": false})
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

        <div className="titleBar">
          <table>
            <tbody>
              <td>
                <img className="icon" width="50" alt="fm-icon" src="icon-3.svg"/>
              </td>
              <td width="10"/>
              <td>
                <p className="titleText">Search Your Movie</p>
              </td>
              <td width="10"/>
            </tbody>
          </table>
          <div className="outerSearchBar">
            <div className="searchTableBar">
              <input className="searchBar" onChange={this.searchRenderer.bind(this)} placeholder=""/>
              <button className="searchButton" onClick={this.doTheSearch}><div class="w3-text-white"><i class="fa fa-search"></i></div></button>
            </div>
          </div>
        </div>
  
        <div class="dbgOuter">
          <p className="radioSettings">Settings:</p>
          <div class="dbgContRows">
            <div class="dbgContColumn">
              <div class="checkBoxes">
                <input onChange={this.changeRadioGenres} type="checkbox" id="dbgTrace" class="dbgCheck1" />
                <label for="dbgTrace">Genres</label>
              </div>
              <div class="checkBoxes">
                <input onChange={this.changeRadioDate} type="checkbox" id="dbgDebug" class="dbgCheck1" />
                <label for="dbgDebug">Realise date</label>
              </div>
            </div>
            <div class="dbgContColumn">
              <div class="checkBoxes">
                <input onChange={this.changeRadioBudget} type="checkbox" id="dbgWarn"  class="dbgCheck1" />
                <label for="dbgWarn">Budget</label>
              </div>
              <div class="checkBoxes">
                <input onChange={this.changeRadioBox} type="checkbox" id="dbgErr"  class="dbgCheck1"/>
                <label for="dbgErr">Box office</label>
              </div>
            </div>      
          </div>

          <div class="line">

          </div>

          <div class="dbgCont">
            <input onChange={this.changeRadioActors} type="checkbox" id="dbgInfo" class="dbgCheck2" />
            <label for="dbgInfo">Show Actors</label>
          </div>
        </div>
        <div className="searchData">
          {this.state.rows}
        </div>
        
      </div>
    );
  }
}

export default App;
