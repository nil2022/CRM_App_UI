import React from 'react'
import { GitHub, LinkedIn, CopyrightRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <section className=" bg-slate-300 w-full min-h-[50px]">
      <div className="relative mx-auto">
        <ul className="flex flex-col sm:flex-row justify-center ">

          <li className="max-w-[500px] px-3 pt-2 sm:p-3 flex items-center sm:justify-center gap-x-2">

            <div className="sm:px-2 hover:scale-105 sm:rounded-xl transition-all duration-500 outline-none">
              <Link to="https://github.com/nil2022"
                target='_blank'>
                <div className="flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <GitHub sx={{ fontSize: 30 }} color='black' />
                </div>
              </Link>
            </div>
            <div className="sm:px-2 hover:scale-105 sm:rounded-xl transition-all duration-500 outline-none">
              <Link to="https://www.linkedin.com/in/nil2022"
                target='_blank'>
                <div className="flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                  <LinkedIn sx={{ fontSize: 32, outline: 'none' }} color='primary' />
                </div>
              </Link>
            </div>
          </li>

          <ul className="flex flex-col min-w-fit sm:flex-row p-3 sm:items-center text-left sm:text-center gap-y-1 gap-x-2 ">

            <li className="min-w-fit sm:px-2 text-left sm:text-center hover:bg-white rounded-md hover:scale-105 sm:rounded-xl transition-all duration-500">
              <Link className="md:text-lg text-gray-800 hover:text-gray-700 hover:underline" to="#">
                Privacy Policy
              </Link>
            </li>
            <li className="min-w-fit sm:px-2 text-left sm:text-center hover:bg-white rounded-md hover:scale-105 sm:rounded-xl transition-all duration-500 ">
              <Link className="md:text-lg text-gray-800 hover:text-gray-700 hover:underline" to="https://www.linkedin.com/in/nil2022" target='_blank'>
                Contact Me
              </Link>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row p-3 min-w-[200px] sm:max-w-[500px] items-center justify-center bg-violet-700 text-white font-[300] sm:text-black sm:bg-transparent ">
            <span className='flex items-center justify-center text-sm '>
              <CopyrightRounded sx={{ fontSize: 20, marginX: 1 }} className='text-white sm:text-gray-800' />
              {' '}Copyright 2024. All Rights Reserved. Created by
            </span>
            <a href="https://github.com/nil2022" target='_blank' className='hover:text-gray-700 hover:underline font-[400] px-2'
            >
              Nilanjan
            </a>
          </div>
        </ul>
      </div>
    </section>
  )
}
