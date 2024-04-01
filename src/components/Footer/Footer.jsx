import React from 'react'
import { GitHub, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { CopyrightIcon } from 'lucide-react';

export function Footer() {
  return (
    <section className=" bg-slate-300 w-full min-h-[50px]">
      <div className="relative mx-auto">
        <ul className="flex flex-col sm:flex-row justify-center ">

          <li className="max-w-[500px] px-3 pt-2 sm:p-3 flex items-center sm:justify-center gap-x-2">

            <li className="sm:px-2 hover:scale-105 sm:rounded-xl transition-all duration-500 outline-none">
              <Link to="https://github.com/nil2022"
                target='_blank'>
                <div className="flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <GitHub sx={{ fontSize: 30 }} color='black' />
                </div>
              </Link>
            </li>
            <li className="sm:px-2 hover:scale-105 sm:rounded-xl transition-all duration-500 outline-none">
              <Link to="https://www.linkedin.com/in/nil2022"
                target='_blank'>
                <div className="flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <LinkedIn sx={{ fontSize: 32, outline: 'none' }} color='primary' />
                </div>
              </Link>
            </li>
          </li>

          <ul className="flex flex-col max-w-[500px] sm:flex-row p-3 text-left sm:text-center gap-y-1  ">

            <li className="min-w-[100px] sm:p-2 text-left sm:text-center hover:bg-white rounded-md hover:scale-105 sm:rounded-xl transition-all duration-500">
              <Link className="text-lg text-gray-800 hover:text-gray-700" to="#">
                Privacy Policy
              </Link>
            </li>
            <li className="min-w-[100px] sm:p-2 text-left sm:text-center hover:bg-white rounded-md hover:scale-105 sm:rounded-xl transition-all duration-500 ">
              <Link className="text-lg text-gray-800 hover:text-gray-700" to="#">
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="flex p-3 min-w-[200px] sm:max-w-[500px] items-center justify-center gap-x-1 bg-violet-700 text-white font-[500] sm:text-black sm:bg-transparent ">          
            <CopyrightIcon size={16} className='text-white sm:text-gray-800 ' />
            {' '}2024 Copyright by 
            <a href="https://github.com/nil2022" target='_blank' className='hover:text-gray-700 hover:underline'>ABC Company</a>
          </div>
        </ul>
      </div>
    </section>
  )
}
