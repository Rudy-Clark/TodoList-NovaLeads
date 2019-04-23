import { createContext } from 'react';

export const drawer = {
  open: false,
  id: null,
  changed: false,
  handleChange: () => {},
};

export const todoList = {
  list: [],
  action: { type: '', param: null },
};

export const TodosContext = createContext(todoList);

export const DrawerContext = createContext(drawer);
