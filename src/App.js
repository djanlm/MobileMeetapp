/* Esse componente extra foi criado para que fosse possivel acessar a informacao signed do estado de autenticaçao */

import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);
  return <Routes />;
}
