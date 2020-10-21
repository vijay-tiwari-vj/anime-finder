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
  mangaContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center'
  },
  card: {
    width: 250,
  },
  media: {
    height: 350,
  },
  mangaInfo: {
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

export const TopManga = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');
  const [topManga, setTopManga] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_API}/top/manga`)
      .then(res => {
        const manga = res.data.top;

        setTopManga(manga);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  console.log(topManga);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText.length >= 3) {
      axios.get(`${BASE_API}/search/manga?q=${searchText}`)
        .then(res => {
          const results = res.data.results;

          setTopManga(results);
          console.log(results);
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
        id="searchManga"
        type="search"
        label="Search Manga"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        fullWidth
      />
    )
  }

  const manga = topManga.map(manga => {
    return (
      <Card className={classes.card} key={manga.mal_id}>
        <a href={manga.url} target="_blank" rel="noopener noreferrer">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={manga.image_url}
              title={manga.title}
            />

            <CardContent className={classes.mangaInfo}>
              <Typography gutterBottom variant="body2" component="p">
                {manga.rank ? `#${manga.rank} ${manga.title}` : manga.title}
              </Typography>

              <Typography variant="caption" component="p">
                <Paper className={classes.rating} elevation={0}>
                  <StarIcon style={{ marginRight: 2 }} color="primary" />{manga.score}
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
      <form className={classes.search} noValidate autoComplete="off" onSubmit={handleSubmit}>
        {searchField()}
      </form>

      <div className={classes.mangaContainer}>
        {manga}
      </div>
    </div>
  )
}

export default TopManga;
