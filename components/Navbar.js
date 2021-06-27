import Link from "next/link";
import Image from "next/image";
import { useUser } from "../firebase/useUser";
import Logo from "../public/clearcloset.png";
const Navbar = () => {
  const { user, logout } = useUser();
  console.log(user);
  return (
    <nav
      className={
        "z-10 shadow sticky min-w-full py-4 px-10 flex items-center justify-between font-medium"
      }
    >
      <div className={"flex gap-10 items-center"}>
        <Link href={"/"}>
          <a>
            <Image
              height="40px"
              width="20px"
              src={Logo}
              alt="Clear Closet Logo"
            />
          </a>
        </Link>
        <Link href={"/"}>
          <div className={"font-bold "}>Clear Closet</div>
        </Link>

        {user && (
          <Link
            href={{
              pathname: "/closet/[userId]",
              query: {
                userId: user.id,
              },
            }}
          >
            <a className={"focus-ring rounded-sm"}>My Closet</a>
          </Link>
        )}
        {!user && (
          <Link
            href={{
              pathname: "/closet",
            }}
          >
            <a className={"focus-ring rounded-sm"}>My Closet</a>
          </Link>
        )}
      </div>
      {!user && (
        <div>
          <Link href={"/auth"}>
            <a>Log In</a>
          </Link>
        </div>
      )}
      {user && (
        <div className={"gap-10 flex"}>
          {user.name}
          <button
            alt="Logout"
            onClick={() => logout()}
            className={"focus-ring rounded-sm"}
          >
            Log Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
