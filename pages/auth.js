import FirebaseAuth from "../components/auth/FirebaseAuth";
import { useUser } from "../firebase/useUser";

import Link from "next/link";
import { useRouter } from 'next/router'; // next has its own router that we can use 

const Auth = () => {
  const { user } = useUser();
  const router = useRouter();

  if (user != null) {
    console.log('user found');
    router.push("/closet");
    return (
      <>
      </>
    );
  }
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
            <a className={"font-medium hover:text-indigo-900 hover:underline hover:text-indigo-600"}>
              &larr; Go Home
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
