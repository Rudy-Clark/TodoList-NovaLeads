import { createContext } from 'react';

export const drawer = {
  open: false,
  id: null,
};

export const todoList = {
  list: [],
};

export const TodosContext = createContext(todoList);

export const DrawerContext = createContext(drawer);