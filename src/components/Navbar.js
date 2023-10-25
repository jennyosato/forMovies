import React, {useState} from 'react'
import Link from 'next/link'
const Navbar = ({searchTerm}) => {
  const [search, setSearch] = useState('')
  return (
    <>
    <nav className="flex justify-between items-center px-4 py-2 shadow-md ">
    <div className="border-4 text-3xl font-semibold text-[#880808]">ForMovies</div>
    <ul className="flex gap-4 text-white font-medium ">
      <li className='p-2 hover:text-red-800'>
        <Link href="/">Home</Link>
      </li>
      <li className='p-2 hover:text-red-800 group'>
        <Link href="/movie" className=''>Movies</Link>
        <ul className='border px-3 py-2 absolute hidden group-hover:block'>
          <li>
            <Link href='/movie'>Movies</Link>
          </li>
          <li>
            <Link href='/tv'>Series</Link>
          </li>
        </ul>
      </li>
      <li className='p-2 hover:text-red-800'>
        <Link href="/watchlist">Watchlist</Link>
      </li>
      <li className='p-2 hover:text-red-800'>
        <Link href={`?search=${searchTerm}`}>Search</Link></li>
      <li className='p-2 hover:text-red-800'>Favourite</li>
      <li className='p-2 hover:text-red-800'>Sign-in</li>
    </ul>
  </nav>
  </>
  )
}

export default Navbar