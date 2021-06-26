import Head from 'next/head'
import Image from 'next/image'
import firebase from '../firebase/initFirebase'

firebase()

export default function Home() {
  return (
    
    <div className="container mx-auto">
        {/* tailwind is not loading */}
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-2 lg:mb-6">Win your market</h1>
        <p class="text-gray-500">You have a new message!</p>
          The quick brown fox jumps over the lazy dog.
    </div>
  )
}
