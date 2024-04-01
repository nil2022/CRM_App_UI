import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function Home() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  return (
    <div className="relative">
      <div className="relative isolate -z-0 px-6 pt-40 lg:px-8 pb-40 md:pb-36 md:h-[88vh] ">
        <div className="relative mx-auto max-w-2xl py-auto">
          { /** Background Gradient Color */}
          <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu blur-3xl md:-top-[10rem] md:overflow-hidden">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 max-w-none 
              -translate-x-1/2 rotate-[30deg] md:left-[calc(50%-30rem)] h-[5rem] md:h-[30rem] xl:h-[35rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-sans sm:text-7xl transition-all duration-500">
              Customer Queries ? {' '}
              Solved !
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Complaints Resolved, Trust Restored: Your Satisfaction, Our Priority
            </p>
            <div className="mt-5 flex flex-col items-center justify-center">
              {!authStatus && (<Link
                // to="/register"
                onClick={() => setTimeout(() => {
                  navigate('/register')
                }, 500)}
                className="rounded-md border border-black px-3 py-2 text-md font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black bg-violet-200 hover:bg-violet-600 hover:scale-105 transition-all hover:z-50
                hover:shadow-xl duration-500 hover:text-white hover:ring-4 ring-violet-400"
              >
                Register Now!
              </Link>)}
              {!authStatus && (<div className='mt-2'>
                <span className='text-gray-700 font-inter font-[500]'>Already have an account?{' '}</span>
                <Link
                  // to='/login'
                  onClick={() => setTimeout(() => {
                    navigate('/login')
                  }, 400)}
                  className='mt-2 hover:underline text-gray-600 font-semibold'
                > Login Now!</Link>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
