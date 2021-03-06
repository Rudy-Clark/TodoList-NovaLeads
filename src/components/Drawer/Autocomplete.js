/* eslint-disable react/prop-types, react/jsx-handler-names */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import InputAdornment from '@material-ui/core/InputAdornment';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
const suggestions = [];

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 4; i++) {
  suggestions.push({ label: `тег${i}`, value: `тег${i}` });
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 0,
    margin: '13px 0 0',
  },
  input: {
    display: 'flex',
    padding: `0 ${theme.spacing.unit}px`,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    padding: `0 ${theme.spacing.unit - 10}px`,
  },
  placeholder: {
    position: 'absolute',
    left: 35,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 0,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        startAdornment: (
          <InputAdornment>
            <LocalOfferIcon />
          </InputAdornment>
        ),
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

function IntegrationReactSelect({ classes, defaultValue, handleChange }) {
  const [single, setSingle] = React.useState(null);
  function handleChangeSingle(value) {
    setSingle(value);
  }

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          name="tag"
          classes={classes}
          options={suggestions}
          components={components}
          defaultInputValue={defaultValue}
          value={single}
          onChange={e => {
            handleChangeSingle(e);
            handleChange(e);
          }}
          placeholder="тег"
        />
      </NoSsr>
    </div>
  );
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);
