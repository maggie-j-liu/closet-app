import Head from "next/head";
import Image from "next/image";
import WriteToCloudFirestore from "../components/cloudFirestore/Write";
import ReadDataFromCloudFirestore from "../components/cloudFirestore/Read";

export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4">
        <WriteToCloudFirestore />
        <ReadDataFromCloudFirestore />
        <h1 className="text-5xl lg:text-6xl font-bold text-indigo-900 mb-2 lg:mb-6">
          Closet App
        </h1>
        <p className="text-gray-500">Upload, save, and search images.</p>
      </div>
    </>
  );
}
