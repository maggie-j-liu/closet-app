import React from "react";
import UploadModal from "../../components/UploadModal";
import ImageGrid from "../../components/ImageGrid";
import { useUser } from "../../firebase/useUser";
import NotLoggedInMessage from "../../components/NotLoggedInMessage";
import Loading from "../../components/Loading";
import firebase from 'firebase/app'
import 'firebase/firestore'
// var user_id = null;
const Closet = ({ userId }) => {
    const { user } = useUser();
    if (user === null) {
        return <Loading />;
    } else if (user === undefined) {
        return (
            <NotLoggedInMessage>Log in to access your closet</NotLoggedInMessage>
        );
    }
    // logUser().then(() => {
    // console.log("here?");
    console.log(userId)
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
            <ImageGrid images={[]} />
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const id = ctx.params.userId;
    const doc = await firebase
        .firestore()
        .collection('users')
        .doc(ctx.params.userId).get()
        if (!doc.exists) {
            firebase.firestore().collection('users').doc(id).update({id: user.id, email: user.email, name: user.name});
            firebase.firestore().collection('users').doc(id).update({closet: []});
        }

    // var userCloset = null;
    // firebase.firestore().collection('users').doc(user.id).onSnapshot(function (doc) { userCloset = doc.data().closet; console.log(userCloset) });
    // console.log(userCloset);
    return {
        props: {
            userId: id
        }
    }
}

/*

export async function getServerSideProps () {
  const { user } = useUser();
  // const user = {id: 1, email: "fdsa", name: "john"}
  console.log("logging user")
  const doc = await firebase
    .firestore()
    .collection('users')
    .doc(user.id).get()
  if (!doc.exists) {
    firebase.firestore().collection('users').doc(user.id).update({id: user.id, email: user.email, name: user.name});
    firebase.firestore().collection('users').doc(user.id).update({closet: []});
  }
  
  var userCloset = null;
  firebase.firestore().collection('users').doc(user.id).onSnapshot(function (doc) { userCloset = doc.data().closet; console.log(userCloset) });
  console.log(userCloset);
  return {
    props: {
      userCloset,
    },
  }
}
*/
export default Closet
