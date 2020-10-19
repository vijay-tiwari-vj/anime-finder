import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Navbar from './components/Navbar';
import TopAnime from './components/TopAnime';
import TopCharacters from './components/TopCharacters';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography
            component={'span'}
            variant={'body2'}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <AppBar position="sticky">
          <Container maxWidth="md">
            <Tabs value={value} onChange={handleChange} aria-label="fanime tabs">
              <Tab label="Anime" {...a11yProps(0)} />
              <Tab label="Characters" {...a11yProps(1)} />
            </Tabs>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <TabPanel value={value} index={0}>
            <TopAnime />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TopCharacters />
          </TabPanel>
        </Container>
      </div>
    </>
  );
}

export default App;
