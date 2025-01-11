import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Select from "react-select";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const AsignarProductos = () => {
  //state local del componente
  const [productos, setProductos] = useState([]);
  //Consulta base de datos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    //TODO: Funcion para pasar a pedido state
  }, [productos]);

  const seleccionarProducto = (producto) => {
    console.log(producto);
  };

  if (loading) return null;
  const { obtenerProductos } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Seleccionar o buscar productos
      </p>
      <Select
        options={obtenerProductos}
        isMulti
        onChange={(opcion) => seleccionarProducto(opcion)}
        getOptionValue={(opciones) => opciones.id} //en caso de que los valores de options no sean value, en este caso es id
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} unidades`
        }
        placeholder="Seleccionar Producto/s"
        noOptionsMessage={() => "No hay resultados"}
        className="mt-3"
      />
    </>
  );
};

export default AsignarProductos;
