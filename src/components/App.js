import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import withRoot from '../withRoot';
import Table from './Table';
import Drawer from './Drawer';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  createButton: {
    position: 'absolute',
    top: '12px',
    left: '12px',
  },
  mainTitle: {
    padding: '12px 0 12px',
  },
});

// eslint-disable-next-line arrow-body-style
const App = ({ classes }) => {
  return (
    <Fragment>
      <CssBaseline />
      <section className="title">
        <Typography
          className={classes.mainTitle}
          component="h3"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Список Задач
          <Button
            className={classes.createButton}
            variant="contained"
            color="primary"
          >
            Добавить задачу
          </Button>
        </Typography>
      </section>
      <section className="table">
        <Table />
      </section>
      <section>
        <Drawer />
      </section>
    </Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
