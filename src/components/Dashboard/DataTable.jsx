import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/solid'


export function Datatable() {

    /** set loading state  */
    const [loading, setLoading] = useState(false)
    const intialValues = [{ _id: "", name: "", userId: "", email: "", userType: "", userStatus: "" }];
    const [formValues, setFormValues] = useState(intialValues);

    const allUsers = useSelector((state) => state.allUsers.allUsersData || [])

    // console.log('allUsers:', allUsers)

    // console.log('data:', data)

    useEffect(() => {
        // localStorage.removeItem('allUsers')
        return () => {
            console.log('unmounted')
            
        }
    })

    return (
        <>
            <div>
                {allUsers.length > 0 && (
                    <section className="mx-auto w-full max-w-7xl px-4 py-4">
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                            <div>
                                <h2 className="text-lg font-semibold">Engineers</h2>
                                <p className="mt-1 text-sm text-gray-700">
                                    This is a list of all <strong>Customers</strong>
                                </p>
                            </div>
                            <div >
                                <button
                                    // type="button"
                                    // onClick={handleUserData}
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Add new Engineer
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                    >
                                                        <span>Customers</span>
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-8 py-3.5 text-left text-sm font-normal text-gray-700"
                                                    >
                                                        User ID
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                    >
                                                        Status
                                                    </th>

                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                    >
                                                        Role
                                                    </th>
                                                    <th scope="col" className="relative px-4 py-3.5">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {allUsers.map((person) => (
                                                    <tr key={person._id}>
                                                        <td className="whitespace-nowrap px-4 py-4">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0">
                                                                    {person.image ? (
                                                                        <img
                                                                            className="h-10 w-10 rounded-full object-cover"
                                                                            src={person.image}
                                                                            alt="person-image"
                                                                        />
                                                                    ) : (<UserCircleIcon className="h-8 w-8 rounded-full object-cover" />)}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                    <div className="text-sm text-gray-700">{person.email}</div>
                                                                    <div className="text-sm text-gray-700">{person._id}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-8 py-4">
                                                            <div className="text-sm text-gray-900 ">{person.title}</div>
                                                            <div className="text-sm text-gray-700">{person.userId}</div>
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4">
                                                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                {person.userStatus}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                                                            {person.userType}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-4 text-center text-sm font-medium">
                                                            {/* <a href="#" className="text-gray-700">
                                                            Edit
                                                        </a> */}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}