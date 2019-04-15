/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import Autocomplete from './Autocomplete';

const styles = theme => ({
  main: {
    width: 'auto',
    padding: '8px',
    display: 'block', // Fix IE 11 issue.
    overflowY: 'auto',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  formControl: {
    minWidth: 120,
  },
});

function Body({ classes, updateItem }) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  let defaultValues;
  if (updateItem) {
    defaultValues = { ...updateItem };
  }
  return (
    <main className={classes.main}>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="name">Название задачи</InputLabel>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultValues ? defaultValues.name : ''}
        />
      </FormControl>
      <TextField
        name="desc"
        label="Описание задачи"
        margin="normal"
        multiline
        fullWidth
        rowsMax="3"
        className={classes.textField}
      />
      <Grid container spacing={8} alignItems="center">
        <Grid item xs={6}>
          <TextField
            label="Дата выполнения"
            type="date"
            name="date"
            margin="normal"
            onChange={e => setActive(true)}
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          {active && (
            <RadioGroup name="priority" defaultValue="">
              <FormControlLabel
                className={classes.radioGroup}
                value="Срочная важная задача"
                control={<Radio />}
                label="Срочная важная задача"
              />
              <FormControlLabel
                className={classes.radioGroup}
                value="Срочная неважная задача"
                control={<Radio />}
                label="Срочная неважная задача"
              />
              <FormControlLabel
                value="Не срочная важная задача"
                control={<Radio />}
                label="Не срочная важная задача"
              />
              <FormControlLabel
                value="Не срочная неважная задача"
                control={<Radio />}
                label="Не срочная неважная задача"
              />
            </RadioGroup>
          )}
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="status">Статус</InputLabel>
            <Select
              onChange={e => {
                setValue(e.target.value);
              }}
              value={value}
              inputProps={{ id: 'status', name: 'status' }}
            >
              <MenuItem value="3">Выполнена</MenuItem>
              <MenuItem value="2">Выполняется</MenuItem>
              <MenuItem value="1">На потом</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete />
        </Grid>
      </Grid>
    </main>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
  updateItem: PropTypes.object || '',
};

export default withStyles(styles)(Body);