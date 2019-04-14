import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  title: {
    padding: '8px 0',
  },
});

function Head({ classes }) {
  return (
    <Typography
      component="h4"
      variant="h6"
      color="inherit"
      noWrap
      className={classes.title}
    >
    Создать Задачу
    </Typography>
  );
}
Head.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Head);
