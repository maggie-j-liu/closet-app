import React from "react";
import UploadModal from "../components/UploadModal";
import ImageGrid from "../components/ImageGrid";
import { useUser } from "../firebase/useUser";
import NotLoggedInMessage from "../components/NotLoggedInMessage";
import Loading from "../components/Loading";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useRouter } from 'next/router'; // next has its own router that we can use 
// var user_id = null;
const Closet = ({ userCloset }) => {
  const { user } = useUser();
  const router = useRouter();
  if (user == null) {
    return <NotLoggedInMessage>Log in to access your closet</NotLoggedInMessage>
  }
  if (user == undefined) {
    return <Loading />
  }
  router.replace({
    pathname: '/closet/[userId]',
    query: {
      userId: user.id
    }
  });
  return null;
  /*
  return <Redirect to={{
    pathname: '/closet/[userId]',
    query: {
      userId: (user?.id ?? '')
    }
  }} />
  */
  // logUser().then(() => {
  // console.log("here?");
  // console.log(userCloset)
  // // })
  // return (
  //   <div>
  //     <div
  //       className={
  //         "bg-indigo-50 w-full h-72 flex items-center justify-between px-20"
  //       }
  //     >
  //       <h1 className={"text-5xl font-bold"}>My Closet</h1>
  //       <div>Icon of closet here</div>
  //     </div>
  //     <UploadModal />
  //     <ImageGrid images={[]} />
  //   </div>
  // );
};
// export async function getServerSideProps () {
//   const { user } = useUser();
//   // const user = {id: 1, email: "fdsa", name: "john"}
//   console.log("logging user")

//   return {
//     props: {
//       userCloset,
//     },
//   }
// }
export default Closet;
