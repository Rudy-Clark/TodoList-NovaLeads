import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import withRoot from '../withRoot';
import Table from './Table';
import Drawer from './Drawer';
import {
  TodosContext,
  DrawerContext,
  todoList,
  drawer as drawerState,
} from '../context';
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
  const [draw, setToggle] = useState(drawerState);
  const handleDrawer = () => {
    setToggle({ open: !draw.open });
  };

  const [items, setList] = useState(todoList.list);
  const add = ({ name, id, desc, tag, date, priority, status }) => {
    setList([...items, { name, id, desc, tag, date, priority, status }]);
  };

  const setStatus = (id, value, closeFunc) => () => {
    const newItems = items.map(item => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.status = value;
      return item;
    });
    setList(newItems);
    closeFunc();
  };

  const todoValue = {
    list: items,
    add,
    setStatus,
  };
  return (
    <Fragment>
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
          onClick={handleDrawer}
        >
          Добавить задачу
        </Button>
      </Typography>
      <DrawerContext.Provider value={draw}>
        <TodosContext.Provider value={todoValue}>
          <Table />
          <Drawer handleClose={handleDrawer} />
        </TodosContext.Provider>
      </DrawerContext.Provider>
    </Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
