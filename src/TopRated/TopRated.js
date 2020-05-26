import React from 'react';
import './TopRated.css';
import $ from 'jquery';
import FilmRow from '../FilmRow/FilmRow.js';
import CastRow from '../CastRow/CastRow.js';


class TopRated extends React.Component {

	constructor() {
		super()

		this.state = {
			rows: []
		}
	}

	addDefaultSrc(ev) {
		ev.target.src = 'notloadposter3.svg'
	}

	componentDidMount() {
		if (this.state.rows.length === 0) {
      var urlApi = ''
      switch (this.props.type) {
        case 'topRated':
          urlApi = 'https://api.themoviedb.org/3/movie/top_rated?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US&page='
          break;
        case 'popular':
          urlApi = 'https://api.themoviedb.org/3/movie/popular?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US&page='
          break
        case 'upcoming':
          urlApi = 'https://api.themoviedb.org/3/movie/upcoming?api_key=2fc26b04aa90bdfcc6f7f1d86fe7b1c0&language=en-US&page='
          break
        default:
          console.log('err')
      }

      urlApi += this.props.page

			fetch(urlApi)
				.then(res => res.json())
				.then(
					(result) => {
						if (result.results) {
							this.refactorData(result.results)
						} else {

						}

					}
				);
		}
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

	refactorData(results) {
		var filmrows = []
		var i = 0
		if (results) {
			results.forEach((film) => {
				film.settings = this.props.searchSettings

				film.arrayId = i

				this.getinfoAboutFilm(film.id)

				film.genres = this.filmData.genres
				film.releaseDate = this.filmData.release_date
				film.budget = this.filmData.budget
				film.boxOffice = this.filmData.revenue
				film.filmStatus = this.filmData.status
				film.duration = this.filmData.runtime
				film.production = this.filmData.production_companies

				if (this.props.searchSettings.showCast === true || Object.values(this.props.boxesSettings).includes("Director") || Object.values(this.props.boxesSettings).includes("Writer") || Object.values(this.props.boxesSettings).includes("Composer")) {
					this.findCredits(film.id, film.title)

				}

				const filmInfo = <FilmRow key={film.id} crew={this.crewRes} film={film} boxesSettings={this.props.boxesSettings} />

				if (this.props.searchSettings.showCast === true) {
					const filmTotalInfo = <div className="totalRow">
						<div className={"ratingOuter" + i % 2}>
							<p className="topID">{i + 1 + (this.props.page - 1) * 20}</p>
						</div>
						{filmInfo}
						<CastRow key={this.castRes.cast_id} cast={this.castRes} maxActors={this.props.searchSettings.maxActors} />
					</div>

					filmrows.push(filmTotalInfo)
				} else {
					const filmTotalInfo = <div className="totalRow">
						<div className={"ratingOuter" + i % 2}>
							<p className="topID">{i + 1 + (this.props.page - 1) * 20}</p>
						</div>
						{filmInfo}
					</div>

					filmrows.push(filmTotalInfo)
				}

				i++;
			});
		}

		this.setState({ rows: filmrows })
	}

	render() {

		return <div className="contentTopRated">
			{this.state.rows}
		</div>
	}
};

export default TopRated;