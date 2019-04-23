import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function Footer({ classes, closeDrawer }) {
  return (
    <Grid container style={{ width: '100%' }} spacing={24}>
      <Grid item xs={6}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Сохранить
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={closeDrawer}
        >
          Отмена
        </Button>
      </Grid>
    </Grid>
  );
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Footer);
