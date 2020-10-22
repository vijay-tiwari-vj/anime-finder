import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
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
  characterContainer: {
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
  characterInfo: {
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'space-between'
  },
  favorite: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    fontWeight: 'bold'
  }
});

const BASE_API = 'https://api.jikan.moe/v3';

export const TopCharacters = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [topCharacters, setTopCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (e, value) => {
    setPage(value);
  }

  useEffect(() => {
    axios.get(`${BASE_API}/top/characters/${page}`)
      .then(res => {
        const characters = res.data.top;

        setTopCharacters(characters);
      })
      .catch(err => {
        console.log(err)
      })
  }, [page]);

  // console.log(topCharacters);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText.length >= 3) {
      axios.get(`${BASE_API}/search/character?q=${searchText}`)
        .then(res => {
          const results = res.data.results;

          setTopCharacters(results);
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
        id="searchCharacter"
        type="search"
        label="Search Character"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        fullWidth
      />
    )
  }

  const character = topCharacters.map(character => {
    return (
      <Card className={classes.card} key={character.mal_id}>
        <a href={character.url} target="_blank" rel="noopener noreferrer">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={character.image_url}
              title={character.rank ? character.title : character.name}
            />

            <CardContent className={classes.characterInfo}>
              <Typography gutterBottom variant="body2" component="span">
                {character.rank ? `#${character.rank} ${character.title}` : character.name}
              </Typography>

              <Typography variant="caption" component="span">
                <Paper className={classes.favorite} elevation={0}>
                  <FavoriteIcon
                    style={{ marginRight: 2 }}
                    color="primary"
                  />
                  {character.favorites && character.favorites.toLocaleString()}
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

      <div className={classes.characterContainer}>
        {character}
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

export default TopCharacters;
