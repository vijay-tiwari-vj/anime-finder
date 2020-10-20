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

const useStyles = makeStyles({
  characterContainer: {
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

export const TopCharacters = () => {
  const classes = useStyles();

  const [topCharacters, setTopCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://api.jikan.moe/v3/top/characters')
      .then(res => {
        const characters = res.data.top;

        setTopCharacters(characters);
      })
  }, []);

  console.log(topCharacters);

  const top = topCharacters.map(character => {
    return (
      <Card className={classes.card} key={character.mal_id}>
        <a href={character.url} target="_blank" rel="noopener noreferrer">
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={character.image_url}
              title={character.title}
            />

            <CardContent className={classes.characterInfo}>
              <Typography gutterBottom variant="body2" component="p">
                &#35;{character.rank} {character.title}
              </Typography>

              <Typography variant="caption" component="p">
                <Paper className={classes.favorite} elevation={0}>
                  <FavoriteIcon style={{ marginRight: 2 }} color="primary" />{character.favorites.toLocaleString()}
                </Paper>
              </Typography>
            </CardContent>

          </CardActionArea>
        </a>
      </Card>
    )
  });

  return (
    <div className={classes.characterContainer}>
      {top}
    </div>
  )
}

export default TopCharacters;
