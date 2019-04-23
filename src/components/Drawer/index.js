import React, { useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { DrawerContext, TodosContext } from '../../context';
import Head from './Head';
import Body from './Body';
import Footer from './Footer';

export const formRows = ['name', 'tag', 'status', 'priority', 'date', 'desc'];

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '240',
      flexShrink: 0,
      padding: '0 12px',
    },
  },
});

function FormDrawer({ classes, add, update, closeDrawer }) {
  const formRef = useRef(null);
  const handleSubmit = updateItemId => e => {
    e.preventDefault();
    const form = e.target;
    const id =
      typeof updateItemId === 'string' && updateItemId
        ? updateItemId
        : Date.now().toString(32);
    const status = form.status.value;
    const name = form.name.value;
    const desc = form.desc.value;
    const date = form.date.value;
    const priority = form.priority ? form.priority.value : '';
    const tag = form.tag.value;
    if (typeof updateItemId === 'string')
      update({ id, status, name, desc, date, priority, tag });
    else add({ id, status, name, desc, date, priority, tag });
  };

  return (
    <DrawerContext.Consumer>
      {({ open, id, handleChange }) => (
        <TodosContext.Consumer>
          {({ list }) => {
            const updateItem = list.filter(item => item.id === id)[0];
            return (
              <Drawer anchor="right" open={open} onClose={closeDrawer}>
                <div className={classes.drawer}>
                  <Head item={updateItem} />
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(id)}
                    className={classes.form}
                  >
                    <Divider />
                    <Body handleChange={handleChange} updateItem={updateItem} />
                    <Divider />
                    <Footer closeDrawer={closeDrawer} />
                  </form>
                </div>
              </Drawer>
            );
          }}
        </TodosContext.Consumer>
      )}
    </DrawerContext.Consumer>
  );
}

FormDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  add: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormDrawer);
