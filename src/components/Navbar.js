import React from 'react';
import Container from '@material-ui/core/Container';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: '6rem'
  },
  title: {
    flexGrow: 1
  }
});

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Fanime
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Navbar;
