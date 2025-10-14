'use client'

import React, { useEffect, useState } from 'react'

export default function IconsList() {
    const [collections, setCollections] = useState([])
    const [loading, setLoading]= useState(false)
    useEffect(() => {
        const fetchCollections = async () => {
            setLoading(true)
            const res= await fetch("https://api.iconify.design/collections")
            const data= await res.json()
            setCollections(data)
            setLoading(false)
        }

        fetchCollections()
    }, [])

    if(loading){
        return <div>Loading....</div>
    }
    return (
        <div>
            <h3 className='text-lg font-semibold'>Collections</h3>
            {collections.map((collection)=>(
                <div>{collection}</div>
            ))}
        </div>
    )
}
