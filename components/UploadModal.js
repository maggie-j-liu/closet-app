import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Tags from "./Tags";
import getImageTags from "../utils/getImageTags";
import { useTags } from "./TagsContext";
import initFirebase from "../firebase/initFirebase";
import firebase from "firebase/app";
import { useUser } from "../firebase/useUser";
import { useRouter } from "next/router";

initFirebase();

const UploadModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = React.useState();
  const [filename, setFilename] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [tagsLoading, setTagsLoading] = React.useState(false);
  const { tags, setTags } = useTags();
  const { user } = useUser();
  const router = useRouter();
  const inputRef = React.useRef();

  console.log("tags", tags);
  const closeModal = () => {
    setIsOpen(false);
    setImage("");
    setFilename("");
    setTags([]);
    setSuccess(false);
    setCanSubmit(false);
    router.replace(router.asPath, router.asPath, {
      scroll: false,
    });
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleImageChange = (event) => {
    setSuccess(false);
    if (event.target.files?.[0]) {
      setFilename(event.target.files[0].name);
      setTagsLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        "load",
        async (e) => {
          setImage(e.target.result);
          const t = await getImageTags(reader.result);
          const tagsArray = t.map((t) => t[0]);
          setTags(tagsArray);
          setTagsLoading(false);
          setCanSubmit(true);
        },
        false
      );
    } else {
      setImage("");
      setTags([]);
      setCanSubmit(false);
      setFilename("");
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) {
      return;
    }
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const userRef = storageRef.child(user.id);
    const imageRef = userRef.child(filename);
    const snapshot = await imageRef.putString(image, "data_url");
    const url = await snapshot.ref.getDownloadURL();
    console.log(url);
    const firestore = firebase.firestore();
    const ref = firestore.collection("users").doc(user.id);
    const doc = await ref.get();
    let currentCloset = doc.data().closet;
    currentCloset = [
      { url: url, tags: tags, storagePath: imageRef.fullPath },
      ...currentCloset,
    ];
    ref.update({
      closet: currentCloset,
    });
    console.log("updated");
    setFilename("");
    setImage("");
    setTags([]);
    setCanSubmit(false);
    setSuccess(true);
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="z-40 my-8 inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-indigo-800 focus-ring"
        >
          Upload an Image
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center z-40">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900/50" />
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
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload an Image
                </Dialog.Title>
                <div className={"flex flex-col gap-4 mt-4"}>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    className={"p-0.5 rounded-md focus-ring w-min"}
                    ref={inputRef}
                    onChange={handleImageChange}
                  />
                  <img src={image} className={"w-3/4 m-auto"} />
                  <Tags tags={tags} setTags={setTags} loading={tagsLoading} />
                  <div>
                    <button
                      type="submit"
                      className={`${
                        canSubmit
                          ? "bg-indigo-900 hover:bg-indigo-800"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-indigo-50 px-4 py-2 rounded-md text-sm font-medium focus-ring`}
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                    >
                      Submit
                    </button>
                    {success && (
                      <span className={"ml-4 text-indigo-800"}>
                        Success! Your image has been uploaded.
                      </span>
                    )}
                  </div>

                  <div className="self-end">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-indigo-900 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UploadModal;
