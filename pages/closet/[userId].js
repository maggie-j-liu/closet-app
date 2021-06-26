import React from "react";
import UploadModal from "../../components/UploadModal";
import ImageGrid from "../../components/ImageGrid";
import { useUser } from "../../firebase/useUser";
import NotLoggedInMessage from "../../components/NotLoggedInMessage";
import Loading from "../../components/Loading";
import firebase from "firebase/app";
import "firebase/firestore";
import { useRouter } from "next/router";
// var user_id = null;
const Closet = ({ userId, userCloset }) => {
  const { user } = useUser();
  const router = useRouter();
  if (user === null) {
    return <Loading />;
  }
  if (user === undefined) {
    return (
      <NotLoggedInMessage>Log in to access your closet</NotLoggedInMessage>
    );
  }
  // no support for sharing closets yet
  if (userId != user.id) {
    router.replace({
      pathname: "/closet/[userId]",
      query: {
        userId: user.id,
      },
    });
  }
  // logUser().then(() => {
  // console.log("here?");
  console.log(userId);
  // })
  return (
    <div>
      <div
        className={
          "bg-indigo-50 w-full h-72 flex items-center justify-between px-20"
        }
      >
        <h1 className={"text-5xl font-bold"}>My Closet</h1>
        <div>Icon of closet here</div>
      </div>
      <UploadModal />
      <ImageGrid images={userCloset} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const id = ctx.params.userId;
  const doc = await firebase.firestore().collection("users").doc(id).get();
  if (!doc.exists) {
    firebase.firestore().collection("users").doc(id).set({
      id: user.id,
      email: user.email,
      name: user.name,
      closet: [],
    });
  }

  const userDoc = await firebase.firestore().collection("users").doc(id).get();
  const userCloset = userDoc.data().closet ?? null;
  return {
    props: {
      userId: id,
      userCloset,
    },
  };
}

export default Closet;
