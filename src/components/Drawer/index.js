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

function FormDrawer({ handleClose, classes }) {
  const handleSubmit = (add, updateItem) => e => {
    e.preventDefault();
    console.log(updateItem);
    const form = e.target;
    const id =
      typeof updateItem === 'string' ? updateItem : Date.now().toString(32);
    const status = form.status.value;
    const name = form.name.value;
    const desc = form.desc.value;
    const date = form.date.value;
    const priority = form.priority ? form.priority.value : '';
    const tag = form.tag.value;
    add({ id, status, name, desc, date, priority, tag });
    handleClose();
  };

  return (
    <DrawerContext.Consumer>
      {({ open, id }) => (
        <TodosContext.Consumer>
          {({ add, list }) => (
            <Drawer anchor="right" open={open} onClose={handleClose}>
              <div className={classes.drawer}>
                <Head />
                <form onSubmit={handleSubmit(add, id)} className={classes.form}>
                  <Divider />
                  <Body updateItem={list.filter(item => item.id === id)[0]} />
                  <Divider />
                  <Footer handleClose={handleClose} />
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
