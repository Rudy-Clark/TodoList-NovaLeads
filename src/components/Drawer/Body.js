/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
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
import { formRows } from './index';

const styles = theme => ({
  main: {
    overflowY: 'auto',
    height: '80%',
    overflowX: 'hidden',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 70px`,
  },
  selectFormControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const priorityOptions = [
  { label: 'Не срочная неважная задача', id: 'a' },
  { label: 'Не срочная важная задача', id: 'b' },
  { label: 'Срочная неважная задача', id: 'c' },
  { label: 'Срочная важная задача', id: 'd' },
];

function Body({ classes, updateItem, handleChange }) {
  const defaultValues = formRows.reduce((object, key) => {
    if (!updateItem) object[key] = '';
    else object[key] = updateItem[key];
    return object;
  }, {});
  const [active, setActive] = useState(!!defaultValues.priority);
  const [value, setValue] = useState(defaultValues.status);
  return (
    <main className={classes.main}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            required
            onChange={handleChange}
            name="name"
            label="Название задачи"
            className={classes.textField}
            defaultValue={defaultValues.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={handleChange}
            name="desc"
            label="Описание задачи"
            multiline
            fullWidth
            rowsMax="3"
            className={classes.textField}
            defaultValue={defaultValues.desc}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Дата выполнения"
            type="date"
            name="date"
            margin="normal"
            onChange={e => {
              setActive(true);
              handleChange(e);
            }}
            defaultValue={defaultValues.date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {active && (
            <RadioGroup
              onChange={handleChange}
              name="priority"
              defaultValue={defaultValues.priority}
            >
              {priorityOptions.map(item => (
                <FormControlLabel
                  key={item.id}
                  className={classes.radioGroup}
                  value={item.label}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.selectFormControl}>
            <InputLabel htmlFor="status">Статус</InputLabel>
            <Select
              className={classes.selectEmpty}
              onChange={e => {
                setValue(e.target.value);
                handleChange(e);
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
        <Grid item xs={12} alignContent="flex-end" sm={6}>
          <Autocomplete
            handleChange={handleChange}
            defaultValue={defaultValues.tag}
          />
        </Grid>
      </Grid>
    </main>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
  updateItem: PropTypes.object || '',
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Body);
