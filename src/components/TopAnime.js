import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  search: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5%',
    paddingTop: '0.5rem',
    paddingBottom: '2rem'
  },
  animeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    paddingBottom: '2rem'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: 250,
  },
  media: {
    height: 350,
  },
  animeInfo: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between'
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    fontWeight: 'bold'
  }
});

const BASE_API = 'https://api.jikan.moe/v3';

export const TopAnime = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [topAnime, setTopAnime] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (e, value) => {
    setPage(value);
  }

  useEffect(() => {
    axios.get(`${BASE_API}/top/anime/${page}`)
      .then(res => {
        const anime = res.data.top;

        setTopAnime(anime);
      })
      .catch(err => {
        console.log(err)
      })
  }, [page]);

  // console.log(topAnime);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText.length >= 3) {
      axios.get(`${BASE_API}/search/anime?q=${searchText}`)
        .then(res => {
          const results = res.data.results;

          setTopAnime(results);
          // console.log(results);
        })
        .catch(err => {
          console.log(err)
        })

      setSearchText('');
    }
  }

  const searchField = () => {
    return (
      <TextField
        id="searchAnime"
        type="search"
        label="Search Anime"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        fullWidth
      />
    )
  }

  const anime = topAnime.map(anime => {
    return (
      <Card className={classes.card} key={anime.mal_id}>
        <a href={anime.url} target="_blank" rel="noopener noreferrer">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={anime.image_url}
              title={anime.title}
            />

            <CardContent className={classes.animeInfo}>
              <Typography gutterBottom variant="body2" component="span">
                {anime.rank ? `#${anime.rank} ${anime.title}` : anime.title}
              </Typography>

              <Typography variant="caption" component="span" >
                <Paper className={classes.rating} elevation={0}>
                  <StarIcon style={{ marginRight: 2 }} color="primary" />{anime.score}
                </Paper>
              </Typography>
            </CardContent>

          </CardActionArea>
        </a>
      </Card>
    )
  });

  return (
    <div className={classes.container}>
      <form
        className={classes.search}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {searchField()}
      </form>

      <div className={classes.animeContainer}>
        {anime}
      </div>

      <div className={classes.paginationContainer}>
        <Pagination
          count={50}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  )
}

export default TopAnime;
