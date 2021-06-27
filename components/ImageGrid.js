import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import initFirebase from "../firebase/initFirebase";
import firebase from "firebase/app";
import { useUser } from "../firebase/useUser";
import { useRouter } from "next/router";

initFirebase();

const Image = ({ url, tags, deleteItem }) => {
  return (
    <div
      className={"relative w-full h-full group flex justify-center focus-ring"}
      tabIndex={0}
    >
      <img src={url} className={"self-center"} />

      <div
        className={
          "absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-60 group-focus:opacity-60"
        }
      />

      <div
        className={"absolute inset-0 flex flex-col items-center justify-center"}
      >
        <div
          className={
            "flex flex-wrap items-center justify-center gap-2 px-6 py-4"
          }
        >
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={
                "opacity-0 group-hover:opacity-100 group-focus:opacity-100 h-max text-gray-800 bg-indigo-300/90 px-1 py-0.5 rounded-md"
              }
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          "text-white absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100"
        }
      >
        <button
          className={"focus-visible:text-indigo-900 focus-ring rounded-sm"}
          onClick={() => deleteItem()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ImageGrid = ({ images }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [toDelete, setToDelete] = React.useState();
  const [success, setSuccess] = React.useState(false);
  const { user } = useUser();
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
    setToDelete(undefined);
    setSuccess(false);
    router.replace(router.asPath, router.asPath, {
      scroll: false,
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  const setDeleteItem = (itemUrl) => {
    console.log("to delete", itemUrl);
    setToDelete(itemUrl);
    openModal();
  };

  const deleteItem = async () => {
    const storageRef = firebase.storage().ref();
    const itemRef = storageRef.child(toDelete);
    await itemRef.delete();
    const firestore = firebase.firestore();
    const userRef = firestore.collection("users").doc(user.id);
    const doc = await userRef.get();
    let currentCloset = doc.data().closet;
    currentCloset = currentCloset.filter(
      (item) => item.storagePath !== toDelete
    );
    userRef.update({
      closet: currentCloset,
    });
    setSuccess(true);
  };

  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 py-10"
      }
    >
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Image
                  </Dialog.Title>
                  {!success && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this image?
                      </p>
                    </div>
                  )}
                  {success && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your image has been deleted.
                      </p>
                    </div>
                  )}
                  {!success && (
                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:bg-indigo-200 focus-ring"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-100 bg-indigo-900 border border-transparent rounded-md hover:bg-indigo-800 focus:bg-indigo-800 focus-ring"
                        onClick={deleteItem}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  {success && (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-100 bg-indigo-900 border border-transparent rounded-md hover:bg-indigo-800 focus:bg-indigo-800 focus-ring"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
      {images.map((image, idx) => (
        <Image
          key={idx}
          {...image}
          deleteItem={() => setDeleteItem(image.storagePath)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
