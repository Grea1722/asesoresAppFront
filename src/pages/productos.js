import Producto from "@/components/Producto";
import Layout from "@/components/layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

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

const Productos = () => {
  //query para obtener clientes
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) return "Cargando...";

  return (
    <div>
      <Layout>
        <h2 className="text-2xl text-gray-800 font-light">Productos</h2>
        <Link
          href="/nuevoproducto"
          className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm
        hover:bg-gray-800 mb-3 uppercase font-bold"
        >
          Nuevo Producto
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Editar</th>
              <th className="w-1/5 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Productos;
