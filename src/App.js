import React from 'react';
import Container from '@material-ui/core/Container';

import Navbar from './components/Navbar';
import TopAnime from './components/TopAnime';

export const App = () => {

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <TopAnime />
      </Container>
    </>
  );
}

export default App;
