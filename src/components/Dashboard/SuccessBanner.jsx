import React, { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { useSelector } from 'react-redux'

export function SuccessBanner() {

    const [isBannerClosed, setIsBannerClosed] = useState(false)
    const authData = useSelector((state) => state.auth.userData)

    const handleOnClose = () => {
        console.log('handleOnClose')
        setIsBannerClosed(true)
    }
    if (authData) {
        return !isBannerClosed ? (
            <div>
                <div className="rounded-md border-l-4 border-green-500 bg-green-100 p-4 transition-all duration-500">
                    <div className="flex items-center justify-between space-x-4">
                        <div>
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-green-600">
                                Hey, {authData.fullName}
                            </p>
                        </div>
                        <div onClick={handleOnClose} className='cursor-pointer transition-all duration-500'>
                            <X className="h-6 w-6 cursor-pointer text-green-600" />
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    }

}