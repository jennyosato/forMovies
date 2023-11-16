import Link from 'next/link'
import React from 'react'

export default function MobileNavbar({onClose}){
    const linkArr = [
        {
            title: 'Home',
            route: '/'
        },
        {
            title: 'Movies',
            route: '/movies'
        },
        {
            title: 'Watchlist',
            route: '/watchlist'
        },
        {
            title: 'Search',
            route: '/search'
        },
        {
            title: 'Favourite',
            route: '/favourites'
        }
    ]
    return(
        <div className='bg-white w-full'>
            <button className='text-gray-900' onClick={onClose}>X</button>
            <nav className='flex flex-col gap-2'>
                {
                    linkArr.map(link => (
                        <Link className='py-4 px-5 text-gray-900' href={link.route}>{link.title}</Link>
                    ))
                }
            </nav>
        </div>
    )
}