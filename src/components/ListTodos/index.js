import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { TodosContext } from '../../context';
import StatusMenu from './StatusMenu';
import Actions from './Actions';

function ListTodos() {
  return (
    <Fragment>
      <TodosContext.Consumer>
        {({ list, setStatus, del, edit }) => {
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
              <TableCell>
                <Actions del={() => del(item.id)} edit={() => edit(item.id)} />
              </TableCell>
            </TableRow>
          ));
        }}
      </TodosContext.Consumer>
    </Fragment>
  );
}

export default withStyles(() => {})(ListTodos);
