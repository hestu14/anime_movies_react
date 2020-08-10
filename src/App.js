import React, { Component } from 'react';
import axios from 'axios';
import './component/App.css';

require('dotenv').config()


class App extends Component {

  constructor() {
    super();
    this.state = {
      DataMovies: [],
      Header_title: "",
      Header_subtitle: "",
    };
  }

  // 'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.DB_API_KEY + '&query=SEARCHQUERY&page=1'

  componentDidMount() {
    axios.get('https://api.themoviedb.org/4/list/143529?api_key=' + process.env.DB_API_KEY + '&page=1', {
      "async": true,
      "crossDomain": true,
      "method": "GET",
      "headers": {
        "content-type": "application/json;charset=utf-8",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGUxM2FlZGU0MWUwZTE3YTQxMDRmZmNhNzMzMjNkYSIsInN1YiI6IjVlYzc0ZmFiZDIxNDdjMDAyM2JlYjA5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JCgsMXm5wbYGA6lcd7_Yq970YK-HZEsyec87wgiF-9c"
      },
      "processData": false,
      "data": "{}"
    }).then((response) => {
      console.log(response.data);
      this.setState({
        DataMovies: response.data.results,
        Header_title: response.data.name,
        Header_subtitle: response.data.description
      })
    })
      .catch(error => {
        console.log(error.response)
      });
  }


  render() {
    const data_kolom = this.state.DataMovies.map((item, index) => {

      var id_title = item.title;
      var id_original_title = item.original_title;
      var id_film_rating = item.vote_average;
      var id_film_rating_count = item.vote_count;
      var url_default = "https://www.themoviedb.org/movie/";
      var id_url_movies = item.id;
      var img_default = "https://image.tmdb.org/t/p/w500/";
      var id_image = img_default+item.poster_path;
      
      return <div className="row" key={index}>
          <div className="col-sm-4">
            <div id="film_img" /> <img src={id_image} alt="film_poster" onClick={() => window.open(url_default + id_url_movies, "_blank")}></img>
          </div>
          <div className="col-sm-8 col-film-info">
            <div id="film"> {id_title} </div>
            <div id="film_original_title"> {id_original_title} </div>
            <div id="film_rating"> Rating: {id_film_rating} ({id_film_rating_count} users vote) </div> 
          </div>
        </div>;
    })

    const header_title = this.state.Header_title;
    const header_subtitle = this.state.Header_subtitle;

    return (
      <div>
        <div className="container container-header">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4"><span id="deskripsi" /> {header_title} </h1>
              <p className="lead" id="deskripsi_header"> {header_subtitle}
              </p>
            </div>
          </div>
        </div>
        <div className="container">

        {data_kolom}


        </div>
        <footer id="sticky-footer" className="py-4 bg-light text-white-50">
          <div className="container text-center">
            <small>Sponsored by : <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
              <img alt="tmdb_logo" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" height={11} />
            </a></small>
          </div>
        </footer>
      </div>
    );
  }
}
export default App;
