import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { TodosContext } from '../../context';
import StatusMenu from './StatusMenu';


function ListTodos() {
  return (
    <Fragment>
      <TodosContext.Consumer>
        {({ list, setStatus }) => {
          console.log(list);
          return list.map(item => (
            <TableRow key={item.id}>
              <TableCell component="td" scope="row">
                {item.id}
              </TableCell>
              <TableCell>
                <StatusMenu
                  status={item.status}
                  id={item.id}
                  setStatus={setStatus}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.desc}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.priority}</TableCell>
              <TableCell>{item.tag}</TableCell>
            </TableRow>
          ));
        }}
      </TodosContext.Consumer>
    </Fragment>
  );
}

export default withStyles(() => {})(ListTodos);
