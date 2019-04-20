import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';

import withRoot from '../withRoot';
import Table from './Table';
import Drawer from './Drawer';
import {
  TodosContext,
  DrawerContext,
  todoList,
  drawer as drawerState,
} from '../context';

const styles = () => ({
  createButton: {
    position: 'absolute',
    top: '12px',
    left: '12px',
  },
  warningSnackbar: {
    backgroundColor: amber[700],
  },
  mainTitle: {
    padding: '12px 0',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'table',
    opacity: 0.5,
    backgroundColor: '#fff',
  },
  loaderWrapper: {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  loader: {
    display: 'inline-block',
  },
});

// eslint-disable-next-line arrow-body-style
const App = ({ classes }) => {
  const [form, setToggle] = useState(drawerState);
  const [loading, setLoad] = useState(false);
  const handleDrawer = (id = null) => {
    setToggle({ open: !form.open, id });
  };
  const openDrawer = () => {
    setToggle({ ...form, open: true });
  };

  const closeWithoutCheck = () => {
    setToggle({ ...form, open: false });
  };

  const [list, setList] = useState(todoList.list);
  const add = ({ name, id, desc, tag, date, priority, status }) => {
    setList([...list, { name, id, desc, tag, date, priority, status }]);
  };

  const setStatus = (id, value) => {
    const newList = list.map(item => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.status = value;
      return item;
    });
    setList(newList);
  };

  const del = id => setList(list.filter(item => item.id !== id));
  const edit = id => {
    handleDrawer(id);
  };
  const update = editedItem => {
    setList(list.map(item => (item.id === editedItem.id ? editedItem : item)));
  };

  const [snackState, setSnackbar] = useState(false);

  const drawerValue = {
    open: form.open,
    id: form.id,
  };
  const todoValue = {
    list,
    setStatus,
    del,
    edit,
  };
  return (
    <Fragment>
      <Typography
        className={classes.mainTitle}
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Список Задач
        <Button
          className={classes.createButton}
          variant="contained"
          onClick={() => {
            openDrawer();
            setSnackbar(true);
          }}
        >
          Добавить задачу
        </Button>
      </Typography>
      <DrawerContext.Provider value={drawerValue}>
        <TodosContext.Provider value={todoValue}>
          <Table />
          <Drawer
            add={add}
            update={update}
            closeDrawer={closeWithoutCheck}
            handleClose={handleDrawer}
          />
        </TodosContext.Provider>
      </DrawerContext.Provider>
      {loading && (
        <div className={classes.loaderContainer}>
          <div className={classes.loaderWrapper}>
            <CircularProgress
              className={classes.loader}
              size={90}
              color="secondary"
            />
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackState}
        onClose={() => {
          setSnackbar(false);
          closeWithoutCheck();
        }}
      >
        <SnackbarContent
          className={classes.warningSnackbar}
          aria-describedby="warning-snackbar"
          message={
            <span id="warning-snackbar" style={{ margin: 0 }}>
              Все введение данные будут утеряны<br /> вы уверены что хотите выйти?
            </span>
          }
          action={[
            <Button
              onClick={() => {
                setSnackbar(false);
                closeWithoutCheck();
              }}
              size="small"
              color="inherit"
              key="yes"
            >
              OK
            </Button>,
            <Button
            onClick={() => {
              setSnackbar(false);
            }}
            size="small"
            color="inherit"
            key="no"
          >
            Отмена
          </Button>,
          ]}
        />
      </Snackbar>
    </Fragment>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
