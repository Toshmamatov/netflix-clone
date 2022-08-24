import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const FetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };

    FetchData();
  }, []);

  console.log(movie);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            'https://image.tmdb.org/t/p/original/${movie?.backdrop_path}'
        )`,

        backgroundPosition: "center center ",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__btns">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
        <p className="banner__text">{truncate(movie?.overview, 150)}</p>
      </div>
      <div className="banner__fadeBtn"></div>
    </div>
  );
};

export default Banner;
