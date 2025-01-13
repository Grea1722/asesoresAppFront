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

  //Modifica los productos
  const agregarProductos = (productos) => {
    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: productos,
    });
  };

  //Modifica cantidadesd el producto
  const cantidadProductos = (nuevoProducto) => {
    dispatch({
      type: CANTIDAD_PRODUCTO,
      payload: nuevoProducto,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos,
        agregarCliente,
        agregarProductos,
        cantidadProductos,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
