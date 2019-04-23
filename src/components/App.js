import React, { Fragment, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';
import Grid from '@material-ui/core/Grid';

import withRoot from '../withRoot';
import Table from './Table';
import Drawer from './Drawer';
import { TodosContext, DrawerContext, todoList, drawer } from '../context';

const styles = theme => ({
  layout: {
    width: 'auto',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  warningSnackbar: {
    backgroundColor: amber[700],
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

const App = ({ classes }) => {
  const [action, setAction] = useState(todoList.action);
  const [form, setDrawer] = useState(drawer);
  const [snackState, setSnackState] = useState(false);
  const [loading, setLoad] = useState(false);
  const [list, setList] = useState(todoList.list);
  const injectActions = {
    del(id) {
      setList(list.filter(item => item.id !== id));
    },
    add: ({ name, id, desc, tag, date, priority, status }) => {
      setList([...list, { name, id, desc, tag, date, priority, status }]);
    },
    update(editedItem) {
      setList(
        list.map(item => (item.id === editedItem.id ? editedItem : item)),
      );
    },
  };

  const fakeDataFetch = () =>
    new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  useEffect(() => {
    if (!injectActions[action.type]) return undefined;
    const fakeFetch = async () => {
      setLoad(true);
      try {
        await fakeDataFetch();
        injectActions[action.type](action.param);
      } catch (error) {
        console.error('Impossible))');
      }
      setDrawer({ ...form, changed: false, open: false });
      setLoad(false);
    };
    fakeFetch();
  }, [action]);

  const openDrawer = (id = null) => {
    setDrawer({ ...form, open: true, id });
  };

  const handleChange = e => {
    if (e.target) {
      if (!e.target.value) setDrawer({ ...form, changed: false });
    } else if (!e.value) setDrawer({ ...form, changed: false });

    if (form.changed) return false;
    return setDrawer({ ...form, changed: true });
  };

  const closeDrawer = () => {
    if (form.changed && snackState) return undefined;
    if (form.changed) {
      setSnackState(true);
    } else setDrawer({ ...form, open: false });
  };

  const setStatus = (id, value) => {
    const newList = list.map(item => {
      // eslint-disable-next-line no-param-reassign
      if (item.id === id) item.status = value;
      return item;
    });
    setList(newList);
  };

  const edit = id => {
    openDrawer(id);
  };

  const add = item => {
    setAction({ type: 'add', param: item });
  };

  const del = id => {
    setAction({ type: 'del', param: id });
  };

  const update = editedItem => {
    setAction({ type: 'update', param: editedItem });
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
      <div className={classes.layout}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item sm={3} xs={12}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="textPrimary"
            >
              Список Задач
            </Typography>
          </Grid>
          <Grid item sm={3} xs={12} align="center">
            <Button
              className={classes.createButton}
              variant="contained"
              onClick={() => openDrawer()}
            >
              Добавить задачу
            </Button>
          </Grid>
        </Grid>
        <DrawerContext.Provider value={drawerValue}>
          <TodosContext.Provider value={todoValue}>
            <Table />
            <Drawer add={add} update={update} closeDrawer={closeDrawer} />
          </TodosContext.Provider>
        </DrawerContext.Provider>
      </div>
      {/* loading && snackbar */}
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
