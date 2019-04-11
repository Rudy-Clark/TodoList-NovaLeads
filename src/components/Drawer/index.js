import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

function FormDrawer() {
  return (
    <Drawer anchor="right">
      Here Must be Form
    </Drawer>
  );
}

export default withStyles(styles)(FormDrawer);
