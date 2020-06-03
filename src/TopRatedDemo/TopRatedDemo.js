import React from 'react';
import './TopRatedDemo.css';
import { Link } from 'react-router-dom'



class TopRatedDemo extends React.Component {

  constructor() {
    super()

    this.state = {
      rows: []
    }
  }

  addDefaultSrc(ev) {
    ev.target.src = 'notloadposter3.png'
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

  refactorData(results) {
    var filmrows = []
    if (results) {
      var newRes = []
      results.forEach(film => {
        if (this.props.type === 'topRated') {
          if (film.vote_count >= 4000) {
            newRes.push(film)
          } 
        } else {
          newRes.push(film)
        }
      })

      newRes = newRes.slice(0, 8)

      console.log(newRes)

      newRes.forEach((film) => {
        filmrows.push(
          <div className="demoBox">
            <img onError={this.addDefaultSrc} className="posterImgDemo" alt="film-poster" src={'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + film.poster_path} />
            <p className="demoBoxTitle">{film.title}</p>
          </div>
        )

      });
    }

    this.setState({ rows: filmrows })
  }

  render() {
    var title = ''
    var path = ''

    switch (this.props.type) {
      case 'topRated':
        title = 'top rated movies'
        path = '/toprated'
        break;
      case 'popular':
        title = 'most popular movies'
        path = '/popular'
        break
      case 'upcoming':
        title = 'upcoming movies'
        path = '/upcoming'
        break
      default:
        console.log('err')
    }

    return <div className="demoOuter">
      <div className="demoTitleBar">
        <div className="demoTitle">
          <p className="demoTitleP">{title}</p>
        </div>

        <div className="demoButtonBar">
          <Link className="demoButton" to={path}>Watch More</Link>
        </div>
      </div>

      <div className="contentTopRatedDemo">
        {this.state.rows}
      </div>
    </div>
  }
};

export default TopRatedDemo;
