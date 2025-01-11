import { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTO,
} from "../../types";

const PedidoState = ({ children }) => {
  //state de pedidos
  const initialState = {
    cliente: [],
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  //modifica el cliente
  const agregarCliente = (cliente) => {
    // console.log(cliente);

    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  return (
    <PedidoContext.Provider value={{ agregarCliente }}>
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
