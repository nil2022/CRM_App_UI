import React from 'react'
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <section className="w-full min-h-[40px] bg-zinc-800">
      <div className="relative mx-auto">
        <ul className="flex flex-col sm:flex-row justify-between text-zinc-300/50 py-2">

          <div className="flex flex-col sm:flex-row p-3">
            <span className='flex items-center justify-center text-sm font-[400]'>
              Copyright &copy; 2024 CRM. All Rights Reserved.
            </span>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-center text-sm font-[600] gap-y-1 sm:gap-x-2 items-end sm:mr-4'>
            <Link to={"#"}
              className='px-2 py-1 hover:bg-zinc-700/40 text-zinc-300/50 hover:text-white transition-all duration-500 rounded-md'>
              Privacy Policy
            </Link>
            <Link to={"#"}
              className='px-2 py-1 hover:bg-zinc-700/40 text-zinc-300/50 hover:text-white transition-all duration-500 rounded-md'>
              Terms and Conditions
            </Link>
            <Link to={"#"}
              className='px-2 py-1 hover:bg-zinc-700/40 text-zinc-300/50 hover:text-white transition-all duration-500 rounded-md'>
              Contact Us
            </Link>
          </div>
        </ul>
      </div>
    </section>
  )
}
