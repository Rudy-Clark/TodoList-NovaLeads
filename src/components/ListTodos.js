import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function ListTodos() {
  return (
    <Fragment>
      {data.map(n => (
        <TableRow key={n.id}>
          <TableCell component="td" scope="row">
            {n.name}
          </TableCell>
          <TableCell>{n.calories}</TableCell>
          <TableCell>{n.fat}</TableCell>
          <TableCell>{n.carbs}</TableCell>
          <TableCell>{n.protein}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
}

export default withStyles(() => {})(ListTodos);
