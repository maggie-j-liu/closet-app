import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <p><a href="/auth">LOG IN</a></p>
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-2 lg:mb-6">
          Closet App
        </h1>
        <p className="text-gray-500">Upload, save, and search images.</p>
      </div>
    </>
  );
}
