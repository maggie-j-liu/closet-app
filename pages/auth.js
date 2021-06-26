import FirebaseAuth from "../components/auth/FirebaseAuth";
import Link from "next/link";
const Auth = () => {
  return (
    <div>
      <div className={"h-96 flex flex-col items-center justify-center"}>
        <div className={"w-full"}>
          <FirebaseAuth />
        </div>
        <p className={"mt-10"}>
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
