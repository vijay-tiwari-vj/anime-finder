import React from 'react';
import Container from '@material-ui/core/Container';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const Footer = () => {
  return (
    <Container maxWidth="lg">
      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '7%',
          paddingRight: '7%',
          padding: '1rem'
        }}
      >
        <small>&copy; Copyright 2020</small>
        <small style={{ display: 'flex', alignItems: 'center' }}>
          Made with
          <FavoriteIcon
            style={{ margin: 2 }}
            color="#fff"
          /> by VJ
        </small>
      </footer>
    </Container>
  )
}

export default Footer;
