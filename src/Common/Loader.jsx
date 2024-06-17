import React from 'react'
import { Hourglass } from 'react-loader-spinner'


export default function Loader() {
    return (
        <>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#1bbd36', '#1bbd36']}
            />
        </>
    )
}
