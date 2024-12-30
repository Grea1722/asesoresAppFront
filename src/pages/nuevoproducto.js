import Layout from "@/components/layout";
import { gql, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      precio
      existencia
    }
  }
`;

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

const nuevoproducto = () => {
  const router = useRouter();
  const [mensaje, guardarMensaje] = useState("");
  //mutation para crear nuevos clientes
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      //objeto que queremos actualizar
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      //reescribimos cache
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      existencia: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      precio: Yup.number()
        .required("Precio Requerido")
        .positive("No se aceptan numeros negativos"),
      existencia: Yup.number()
        .required("Se requiere existencia")
        .integer("La existencia solo pueden ser numeros enteros"),
    }),
    onSubmit: async (valores) => {
      const { nombre, precio, existencia } = valores;

      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              precio,
              existencia,
            },
          },
        });

        router("/productos");
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));
        setTimeout(() => {
          guardarMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1>Nuevo Producto</h1>
      {mensaje && mostrarMensaje()}

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre del producto"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.nombre}
              />
            </div>
            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio del producto"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.precio}
              />
            </div>
            {formik.touched.precio && formik.errors.precio ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existencia"
              >
                Existencia
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Cantidad disponible"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.existencia}
              />
            </div>
            {formik.touched.existencia && formik.errors.existencia ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full p-2 text-white uppercase font-bold hover:bg-grey-900 cursor-pointer"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default nuevoproducto;
