import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Tags from "./Tags";
import getImageTags from "../utils/getImageTags";
import { useTags } from "./TagsContext";
const UploadModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState();
  const [image, setImage] = React.useState();
  const { tags, setTags } = useTags();
  console.log("tags", tags);
  const closeModal = () => {
    setIsOpen(false);
    setImage("");
    setTags([]);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const handleImageChange = (event) => {
    if (event.target.files?.[0]) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener(
        "load",
        async (e) => {
          setImage(e.target.result);
          const t = await getImageTags(reader.result);
          //console.log("tags", t);
          const tagsArray = t.map((t) => t[0]);
          setTags(tagsArray);
        },
        false
      );
    } else {
      setImage("");
      setTags([]);
    }
  };

  return (
    <>
      <div className="my-8 inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Upload an Image
        </button>
      </div>

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
                    onChange={handleImageChange}
                  />
                  <img src={image} className={"w-3/4 m-auto"} />
                  <Tags />
                  <div>
                    <button
                      type="submit"
                      className="bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus-ring"
                    >
                      Submit
                    </button>
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
