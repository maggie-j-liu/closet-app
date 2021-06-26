import Link from "next/link";
import { useUser } from "../firebase/useUser";
const Navbar = () => {
  const { user, logout } = useUser()
  return (
    <nav
      className={
        "z-10 shadow sticky min-w-full py-4 px-10 flex items-center justify-between font-medium"
      }
    >
      <div className={"flex gap-10"}>
        <Link href={"/"}>
          <a className={"font-bold text-indigo-900"}>Clear Closet</a>
        </Link>
        <Link href={"/closet"}>
          <a>My Closet</a>
        </Link>
      </div>
      {!user && (
        <div>
          <Link href={"/auth"}>
            <a>Log In</a>
          </Link>
        </div>
      )}
      {user && <div>{user.name} <button alt = "Logout" onClick={() => logout()} style={{ width: '100px' }}>Log Out</button></div>}
    </nav>
  );
};

export default Navbar;
