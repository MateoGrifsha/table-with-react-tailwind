import React, { useEffect, useState } from 'react'
import dualArrow from '../assets/dualArrow.svg'
import downArrow from '../assets/downArrow.svg'
import upArrow from '../assets/upArrow.svg'

interface Props{
  column_titles: Array<string>,
  getSort: Function
}
export default function TableHeader({column_titles, getSort}:Props) {
  const [sort, setSort] = useState({colToSort: 'id', direction: 'asc'})
  const [isSorted, setIsSorted] = useState(false)
  const [isAsc, setIsAsc] = useState(false)

  const handleHeaderClick = (colTitle:string) => {
    setSort({
      colToSort: colTitle,
      direction: 
      colTitle === sort.colToSort 
        ?sort.direction === 'asc'
          ? 'desc' 
          : 'asc'
        :'desc'
    })
    setIsSorted(true)
    if(sort.direction === 'asc'){
      setIsAsc(true)
    }
    else{
      setIsAsc(false)
    }
  }
  return (
    <>
        <div className='headerRow grid grid-cols-12 rounded-t-lg border border-zinc-500'>
          {column_titles.map((title:string) => (
            <div
            className='tableHeadCell col-span-3 font-medium tableHeader h-10 cursor-pointer uppercase flex items-center justify-center text-lg bg-gray-700 text-neutral-300 hover:bg-gray-600'
            key={title}
            onClick={()=>
              {
              handleHeaderClick(title)
              getSort(sort)
            }}
            >
            <div className='flex justify-center items-center ms-5'>
              {title}
              {!isSorted && <img src={dualArrow} className='w-5'/>}
              {(isSorted && sort.colToSort === title) && <img src={isAsc ? downArrow : upArrow} className='w-5'/>}
            </div>
            </div>
            )
          )}
        </div>
    </>
  )
}
