import PedidoContext from "@/context/pedidos/PedidoContext";
import { gql, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";

//se esperan value y label como parametros
// const clientes = [
//   { id: 1, nombre: "chocolate" },
//   { id: 2, nombre: "fresa" },
//   { id: 3, nombre: "vainilla" },
// ];

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;
const AsignarCliente = () => {
  const [cliente, setClientes] = useState([]);
  //context pedidos
  const pedidoContext = useContext(PedidoContext);
  const { agregarCliente } = pedidoContext;

  //consultar la base de datos
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  const seleccionarCliente = (cliente) => {
    setClientes(cliente);
  };

  if (loading) return null;

  const { obtenerClientesVendedor } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asignar Cliente al pedido
      </p>
      <Select
        options={obtenerClientesVendedor}
        onChange={(opcion) => seleccionarCliente(opcion)}
        getOptionValue={(opciones) => opciones.id} //en caso de que los valores de options no sean value, en este caso es id
        getOptionLabel={(opciones) => opciones.nombre + " " + opciones.apellido}
        placeholder="Seleccionar Cliente"
        noOptionsMessage={() => "No hay resultados"}
        className="mt-3"
      />
    </>
  );
};

export default AsignarCliente;
