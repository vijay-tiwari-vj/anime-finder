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

const useStyles = makeStyles({
  animeContainer: {
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

export const TopAnime = () => {
  const classes = useStyles();

  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v3/top/anime')
      .then(res => {
        const anime = res.data.top;

        setTopAnime(anime);
      })
  }, []);

  console.log(topAnime);

  const top = topAnime.map(anime => {
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
              <Typography gutterBottom variant="body2" component="p">
                &#35;{anime.rank} {anime.title}
              </Typography>

              <Typography variant="caption" component="p" >
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
    <div className={classes.animeContainer}>
      {top}
    </div>
  )
}

export default TopAnime;
