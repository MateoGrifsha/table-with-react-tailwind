import React, {useEffect, useState} from 'react'

interface Row {
  id: number,
  userId: number,
  title: string,
  body: string
}
interface Props{
  data: Array<Row>,
  handleModal: Function
}

export default function TableData({data, handleModal}:Props) {
  const [skeletonEffect, setSkeletonEffect] = useState(true)
  const [tips, setTips] = useState(0)


  useEffect(()=>{
    setTimeout(()=>{
      setSkeletonEffect(false)
    }, 1500)
  })


  return (
    <>
     {skeletonEffect && 
      <div>
        {data.map((row:Row)=>(
          <div className='tableRow text-center bg-gray-800 flex items-center' key={row.id}>
            <div className='w-1/12'><p className='bg-zinc-400 rounded-md w-5/12 mx-auto h-4 animate-pulse'>&nbsp;</p></div>
            <div className='w-2/12'><p className='bg-zinc-400 rounded-md w-4/12 mx-auto h-4 animate-pulse'>&nbsp;</p></div>
            <div className='w-4/12'><p className='bg-zinc-400 rounded-md w-6/12 mx-auto h-6 my-2 animate-pulse'>&nbsp;</p></div>
            <div className='w-5/12'><p className='bg-zinc-400 rounded-md w-8/12 mx-auto h-8 my-2 animate-pulse'>&nbsp;</p></div>
          </div>
        ))}

      </div>
    }

     {!skeletonEffect &&  
     <div>
        {data.map((row:Row)=>(
          <div className='tableRow text-center bg-gray-800 text-zinc-200 border border-zinc-500 border-t-0 relative hover:cursor-pointer flex items-center py-2 leading-5' 
          onMouseOver={()=>setTips(row.id)}
          onMouseOut={()=>setTips(0)}
          key={row.id} 
          onClick={()=>handleModal(row)}>
            <div className='w-1/12 font-bold'><p className='w-5/12 mx-auto'>{row.id}</p></div>
            <div className='w-2/12'><p className='w-8/12 mx-auto'>{row.userId}</p></div>
            <div className='w-4/12'><p className='w-10/12 mx-auto'>{row.title}</p></div>
            <div className='w-5/12'><p className='w-11/12 mx-auto'>{row.body.slice(0,90)}...</p></div>
            {(tips == row.id) && <div className='tip absolute w-full h-full text-2xl text-neutral-800 bg-zinc-200  z-20 flex items-center justify-center'><p className='animate-pulse'>Click to open info</p></div>}
          </div>
        ))}  
      </div>}
    </>
  )
}
