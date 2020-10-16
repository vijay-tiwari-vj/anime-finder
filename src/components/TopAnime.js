import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
    alignItems: 'center',
    justifyContent: 'space-between'
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
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={anime.image_url}
            title={anime.title}
          />

          <CardContent className={classes.animeInfo}>
            <Typography gutterBottom variant="body1" component="p">
              {anime.title}
            </Typography>

            <Typography variant="body2" component="p">
              {anime.score}
            </Typography>
          </CardContent>

        </CardActionArea>
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
