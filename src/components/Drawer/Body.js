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

function Body({ classes }) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  return (
    <main className={classes.main}>
      <FormControl margin="normal" required>
        <InputLabel htmlFor="name">Название задачи</InputLabel>
        <Input id="name" name="name" type="text" />
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
      <Grid container spacing={8}>
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
                value="3"
                control={<Radio />}
                label="Срочная важная задача"
              />
              <FormControlLabel
                className={classes.radioGroup}
                value="2"
                control={<Radio />}
                label="Срочная неважная задача"
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Не срочная важная задача"
              />
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="Не срочная неважная задача"
              />
            </RadioGroup>
          )}
        </Grid>
      </Grid>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="status">Статус</InputLabel>
        <Select
          onChange={e => {
            setValue(e.target.value);
          }}
          value={value}
          inputProps={{ id: 'status', name: 'status' }}
        >
          <MenuItem value="Выполняется">Выполняется</MenuItem>
          <MenuItem value="На потом">На потом</MenuItem>
          <MenuItem value="Выполнена">Выполнена</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete />
    </main>
  );
}

Body.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Body);
