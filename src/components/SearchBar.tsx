import React, {useEffect, useState} from 'react'

type GetSearchFunction = (search: string) => void;
interface Props {
  getSearch: GetSearchFunction;
}

export default function SearchBar({getSearch}:Props) {
  const [ search, setSearch ] = useState('')
  useEffect(()=>{
    getSearch(search)
  },[search])
  return ( 
    <div className='search-container w-5/12 me-5'>
        <input type="text" onChange={(e) => {
          setSearch(e.target.value)
          }}
          placeholder='Search by title'
          className='py-2 w-full ps-10 rounded-md border-0 outline-0 text-neutral-800 bg-zinc-200'
        />
    </div>
  )
}
