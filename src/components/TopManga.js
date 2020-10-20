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

export const TopManga = () => {
  const classes = useStyles();

  const [topManga, setTopManga] = useState([]);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v3/top/manga')
      .then(res => {
        const manga = res.data.top;

        setTopManga(manga);
      })
  }, []);

  console.log(topManga);

  const top = topManga.map(manga => {
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
                &#35;{manga.rank} {manga.title}
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
    <div className={classes.mangaContainer}>
      {top}
    </div>
  )
}

export default TopManga;
