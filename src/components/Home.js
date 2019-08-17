import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import MediaCard from './MediaCard';
import { TMDB_API_KEY } from '../utils/api';

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${TMDB_API_KEY}`
      )
      .then(({ data }) => {
        setTopMovies(shuffle(data.results));
      });
  }, []);

  return (
    <Grid
      style={{ marginTop: '1rem' }}
      container
      spacing={1}
      justify='center'
      alignItems='center'
      direction='row'
    >
      {topMovies.slice(0, 10).map(movie => (
        <Grid key={movie.id} item>
          <MediaCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
