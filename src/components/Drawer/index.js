import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DrawerContext, TodosContext } from '../../context';
import Head from './Head';
import Body from './Body';
import Footer from './Footer';

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '240',
      flexShrink: 0,
      padding: '0 12px',
    },
  },
});

const handleSubmit = (add, handleClose) => e => {
  e.preventDefault();
  const form = e.target;
  const id = Date.now().toString(32);
  const status = form.status.value;
  const name = form.name.value;
  const desc = form.desc.value;
  const date = form.date.value;
  const priority = form.priority.value;
  const tag = form.tag.value;
  add({ id, status, name, desc, date, priority, tag });
  handleClose();
};

function FormDrawer({ handleClose, classes }) {
  return (
    <DrawerContext.Consumer>
      {({ open }) => (
        <TodosContext.Consumer>
          {({ add }) => (
            <Drawer anchor="right" open={open} onClose={handleClose}>
              <div className={classes.drawer}>
                <Head />
                <form
                  onSubmit={handleSubmit(add, handleClose)}
                  className={classes.form}
                >
                  <Divider />
                  <Body />
                  <Divider />
                  <Footer add={add} handleClose={handleClose} />
                </form>
              </div>
            </Drawer>
          )}
        </TodosContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}

FormDrawer.propTypes = {
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDrawer);
