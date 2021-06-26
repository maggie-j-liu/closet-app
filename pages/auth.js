import FirebaseAuth from "../components/auth/FirebaseAuth";
import Link from "next/link";
const Auth = () => {
  return (
    <div>
      <div
        className={
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 w-full"
        }
      >
        <div className={"w-full"}>
          <FirebaseAuth />
        </div>
        <p className={""}>
          <Link href={"/"}>
            <a className={"font-medium hover:text-indigo-900 hover:underline"}>
              &larr; Go Home
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
