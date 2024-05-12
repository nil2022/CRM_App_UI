import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function Home() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-zinc-800">
      <div className="relative px-6 pt-24 lg:px-8 pb-14">
        {/* Main Content */}
        <div className="relative mx-auto max-w-2xl py-auto text-white">
          <div className="w-full">
            <h1 className="text-4xl text-center font-bold tracking-tight sm:text-7xl transition-all duration-500">
              Customer Queries ? {' '}
              <p className=' text-violet-500 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-violet-700'>Solved.</p>
            </h1>
            <p className="mt-6 text-lg min-w-[300px] mx-auto text-center justify-center sm:text-2xl font-[700]">
              Complaints Resolved, Trust Restored. Your Satisfaction,<br className='hidden sm:block'/> Our Priority.
            </p>
            <div className="mt-5 flex flex-col items-center justify-center">
              {!authStatus && (
                <Link
                  // to="/register"
                  onClick={() => setTimeout(() => {
                    navigate('/register')
                  }, 500)}
                  className="rounded-md border border-black px-3 py-2 text-md font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-white hover:bg-violet-600 hover:scale-105 transition-all hover:z-50
                hover:shadow-xl duration-500 hover:text-white hover:ring-4 ring-violet-400"
                >
                  Register Now!
                </Link>)}
            </div>
          </div>
          <div className='mt-8'>
            <img
              src="/hero-main.jpg"
              alt="hero-image"
              width={800}
              className='rounded-lg justify-center mx-auto hidden sm:block' />
            <img
              src="/mobile-hero.jpg"
              alt="hero-image"
              width={800}
              className='rounded-lg justify-center mx-auto sm:hidden' />
          </div>
        </div>
      </div>
    </div>
  )
}
