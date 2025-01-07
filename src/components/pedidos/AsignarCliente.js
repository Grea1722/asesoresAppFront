import React, { useEffect, useState } from "react";
import Select from "react-select";

//se esperan value y label como parametros
const clientes = [
  { id: 1, nombre: "chocolate" },
  { id: 2, nombre: "fresa" },
  { id: 3, nombre: "vainilla" },
];
const AsignarCliente = () => {
  const [cliente, setClientes] = useState([]);

  useEffect(() => {
    console.log(cliente);
  }, [cliente]);

  const seleccionarCliente = (cliente) => {
    setsabores(cliente);
  };
  return (
    <Select
      options={clientes}
      isMulti
      onChange={(opcion) => seleccionarCliente(clientes)}
      getOptionValue={(opciones) => clientes.id} //en caso de que los valores de options no sean value, en este caso es id
      getOptionLabel={(opciones) => clientes.nombre}
      placeholder="Seleccionar Cliente"
      noOptionsMessage={() => "No hay resultados"}
    />
  );
};

export default AsignarCliente;
