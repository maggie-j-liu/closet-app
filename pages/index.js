import Head from 'next/head'
import Image from 'next/image'
import firebase from '../firebase/initFirebase'

firebase()

export default function Home() {
  return (
    
    <div className="container mx-auto px-4">
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-2 lg:mb-6">
          Closet App
        </h1>
        <p class="text-gray-500">
          Upload, save, and search images.
        </p>
    </div>
  )
}
