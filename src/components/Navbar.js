import React from 'react';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    paddingLeft: '8%'
  }
});

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Container maxWidth="lg">
          <Toolbar className={classes.title}>
            <FavoriteIcon style={{ marginRight: 5 }} />
            <Typography variant="h6" noWrap>
              Anime Finder
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
