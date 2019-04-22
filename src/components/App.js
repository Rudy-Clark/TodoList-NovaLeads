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
import { TodosContext, DrawerContext, todoList, drawer } from '../context';

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
  const [form, setDrawer] = useState(drawer);
  const [loading, setLoad] = useState(false);
  const [snackState, setSnackState] = useState(false);

  const openDrawer = (id = null) => {
    setDrawer({ ...form, open: true, id });
  };

  const handleChange = () => {
    if (form.changed) return false;
    return setDrawer({ ...form, changed: true });
  };

  const closeDrawer = type => () => {
    switch (type) {
      case 'check':
        if (form.changed && snackState) return undefined;
        if (form.changed) {
          setSnackState(true);
        } else setDrawer({ ...form, open: false });
        break;
      case 'submit':
        setDrawer({ ...form, open: false, changed: false });
        break;
      default:
        setDrawer({ open: false, changed: false, id: null });
    }
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
    openDrawer(id);
  };
  const update = editedItem => {
    setList(list.map(item => (item.id === editedItem.id ? editedItem : item)));
  };

  const drawerValue = {
    open: form.open,
    id: form.id,
    handleChange,
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
          onClick={() => openDrawer()}
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
            setSnackState={setSnackState}
            closeDrawer={closeDrawer}
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
        onClose={() => setSnackState(false)}
      >
        <SnackbarContent
          className={classes.warningSnackbar}
          aria-describedby="warning-snackbar"
          message={
            <span id="warning-snackbar" style={{ margin: 0 }}>
              Все введенные данные будут утеряны
              <br /> вы уверены что хотите выйти?
            </span>
          }
          action={[
            <Button
              onClick={() => {
                setSnackState(false);
                setDrawer({ ...form, changed: false, open: false });
              }}
              size="small"
              color="inherit"
              key="yes"
            >
              OK
            </Button>,
            <Button
              onClick={() => setSnackState(false)}
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
