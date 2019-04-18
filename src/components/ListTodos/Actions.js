import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
  root: {
    position: 'relative',
  },
  hide: {
    display: 'none',
  },
});

function Actions({ del, edit, classes }) {
  const [hide, toggle] = useState(true);
  const openActions = () => toggle(false);
  const closeActions = () => toggle(true);
  return (
    <div className={classes.root}>
      <SettingsIcon
        onMouseEnter={openActions}
        className={classnames({ [classes.hide]: !hide })}
      />
      <Grid
        container
        onMouseLeave={closeActions}
        className={classnames({ [classes.hide]: hide })}
        justify="space-between"
      >
        <Grid item xs={6}>
          <IconButton onClick={del}>
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton onClick={edit}>
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

Actions.propTypes = {
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Actions);
