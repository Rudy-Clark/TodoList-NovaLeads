import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

const styles = () => ({
  iconButton: {
    fontSize: '1em',
  },
});

const options = ['На Потом', 'Выполняется', 'Выполнено'];

const getStatus = status => {
  switch (+status) {
    case 1:
      return 'На Потом';
    case 2:
      return 'Выполняется';
    case 3:
      return 'Выполнено';
    default:
      return '';
  }
};

const ITEM_HEIGHT = 32;

function StatusMenu({ status, classes }) {
  const [ref, setRefEl] = useState(null);
  const open = Boolean(ref);

  function handleClick(event) {
    setRefEl(event.currentTarget);
  }

  function handleClose() {
    setRefEl(null);
  }

  return (
    <Fragment>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.iconButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={ref}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={option}
            selected={idx + 1 === +status}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
};

export default withStyles(styles)(StatusMenu);
