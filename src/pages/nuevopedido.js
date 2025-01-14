import { useContext, useState } from "react";
import Layout from "@/components/layout";
import AsignarCliente from "@/components/pedidos/AsignarCliente";
import AsignarProductos from "@/components/pedidos/AsignarProductos";
import ResumenPedido from "@/components/pedidos/ResumenPedido";
import Total from "@/components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

//CONTEXT PEDIDS
import PedidoContext from "@/context/pedidos/PedidoContext";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;
const nuevopedido = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);
  // Utilizar context y extraer sus valores
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  //mutation para crear nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? " opacity-50 cursor-not-allowed"
      : "";
  };

  const crearNuevoPedido = async () => {
    const { id } = cliente;
    //Remover no deseado de productos
    const pedido = productos.map(
      ({ existencia, __typename, ...producto }) => producto
    );
    try {
      const { data } = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });

      //redireccionar
      router.push("/pedidos");

      //mostar alerta
      Swal.fire("Correcto", "El pedido se registro correctamente", "success");
    } catch (error) {
      setMensaje(error.message.replace("GraphQL error:", ""));

      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full m-y3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Crear Nuevo pedido</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default nuevopedido;
