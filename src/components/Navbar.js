import React, {useState} from 'react'
import Link from 'next/link'
const Navbar = ({searchTerm, onOpen}) => {
  const [search, setSearch] = useState('')
  return (
    <>
    <nav className="flex justify-between items-center px-4 py-2 shadow-md bg-black border-b-2 border-[#888] ">
    <div className="border-4 text-3xl font-semibold text-[#880808]">ForMovies</div>
    <div className='md: hidden'>
      <button className='text-white' onClick={onOpen}>open</button>
    </div>
    <ul className="hidden md:flex gap-4 text-white font-medium ">
      <li className='p-2 hover:text-red-800'>
        <Link href="/">Home</Link>
      </li>
      <li className='p-2 hover:text-red-800 group'>
        <Link href="/movie" className=''>Movies</Link>
        <ul className='border px-3 py-2 absolute hidden group-hover:block'>
          <li>
            <Link href='/movie' shallow={false}>Movies</Link>
          </li>
          <li>
            <Link href='/tv' shallow={true}>Series</Link>
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