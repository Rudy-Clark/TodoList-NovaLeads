import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    width: '100%',
  },
});

function Footer({ classes, closeDrawer }) {
  return (
    <div className={classes.footer}>
      <Divider />
      <Grid container justify="space-between">
        <Grid item align="center" xs={5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Сохранить
          </Button>
        </Grid>
        <Grid item align="center" xs={5}>
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
    </div>
  );
}
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Footer);
