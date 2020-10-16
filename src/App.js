import React from 'react';
import TopAnime from './components/TopAnime';

import Container from '@material-ui/core/Container';

export const App = () => {
  return (
    <Container maxWidth="lg" className="App">
      <TopAnime />
    </Container>
  );
}

export default App;
