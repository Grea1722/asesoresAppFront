import Layout from "@/components/layout";
import Link from "next/link";

const Pedidos = () => {
  return (
    <div>
      <Layout>
        <h2 className="text-2xl text-gray-800 font-light">Pedidos</h2>
        <Link
          href="/nuevopedido"
          className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm
        hover:bg-gray-800 mb-3 uppercase font-bold"
        >
          Nuevo Pedido
        </Link>
      </Layout>
    </div>
  );
};

export default Pedidos;
