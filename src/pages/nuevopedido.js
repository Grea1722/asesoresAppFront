import { useContext } from "react";
import Layout from "@/components/layout";
import AsignarCliente from "@/components/pedidos/AsignarCliente";
import AsignarProductos from "@/components/pedidos/AsignarProductos";

//CONTEXT PEDIDS
import PedidoContext from "@/context/pedidos/PedidoContext";

const nuevopedido = () => {
  // Utilizar context y extraer sus valores
  const pedidoContext = useContext(PedidoContext);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light"> Crear Nuevo pedido</h1>
      <AsignarCliente />
      <AsignarProductos />
    </Layout>
  );
};

export default nuevopedido;
