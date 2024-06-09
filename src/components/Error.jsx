import React from 'react';
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function Error() {
    const { slug } = useParams();
    console.log('slug:', slug)
    
    return (
        <div className="min-h-screen py-48">
            <div className="text-center">
                <p className="text-6xl font-bold text-black">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 mx-auto text-lg  leading-7 text-gray-600 w-[300px] sm:w-full">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Go back
                    </Link>
                    <button
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        Contact us
                    </button>
                </div>
            </div>
        </div>
    )
}
