import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  //routing de next
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/6 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black text-center">
          CRM Clientes
        </p>
      </div>
      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
          <Link href="/" className="text-white block">
            Clientes
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"}
        >
          <Link href="/pedidos" className="text-white block">
            Pedidos
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"
          }
        >
          <Link href="/productos" className="text-white block">
            productos
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;