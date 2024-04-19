import React, { useState } from 'react'
import '../index.css'
interface Element {
    id: number,
    userId: number,
    title: string,
    body: string
  }
interface Props{
    row_info: Element,
    closeModal: Function,
    updateData: Function,
    deleteData: Function
}

export default function UpdateModal({row_info, closeModal, updateData, deleteData}:Props) {
    const [updateInfo, setUpdateInfo] = useState({
        id: row_info.id,
        userId: row_info.userId,
        title: row_info.title,
        body: row_info.body
    })

    const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>, input:string)=>{
        setUpdateInfo({ ...updateInfo, [input]: e.target.value });
    }
    const handleUpdate = ()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${row_info.id}`, {
            method: 'PUT',
            body: JSON.stringify({updateInfo}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => updateData(json));
            closeModal()
    }
    const handleDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${row_info.id}`, {
            method: 'DELETE',
          });
          deleteData(row_info.id)
          closeModal()
    }
  return (
    <div id='modal-wrapper' className='fixed h-screen w-screen top-0 flex justify-center items-center  z-20'>
        <div className="w-screen h-screen cursor-pointer" id='modalBackground' onClick={()=>closeModal()}></div>
        <div className=" w-5/12" id='modal'>
            <div className="relative modal grid grid-cols-2 gap-x-5 bg-white rounded-lg px-8 pb-6 pt-8">
                <div className='col-span-2'><p className="font-semibold">Title:</p><textarea className='rounded-lg bg-gray-100 px-3 h-max w-full' onChange={(e)=>{handleChange(e, 'title')}}>{row_info.title}</textarea></div>
                <div className='col-span-2'><p className='font-semibold'>Body: </p><textarea className='rounded-lg bg-gray-100 px-3 w-full' onChange={(e)=>{handleChange(e, 'body')}} rows={4}>{row_info.body}</textarea></div>
                <div>
                    <p className='font-semibold'>ID: </p>
                    <p className='rounded-lg bg-gray-100 px-3 py-2 h-max'>{row_info.id}</p>
                </div>
                <div>
                    <p className='font-semibold'>User ID: </p>
                    <p className='rounded-lg bg-gray-100 px-3 py-2 h-max'>{row_info.userId}</p>
                </div>
                <div className='col-span-2 grid grid-cols-4 mt-4 gap-x-4'>
                    <div className='col-span-2 '>
                        <p className='text-sm'>Press <em>DELETE</em> to delete this row or <em>UPDATE</em> to confirm changes. <b>ID and User ID are immutable.</b></p>
                    </div>
                    <button className='text-lg font-semibold text-red-600 hover:text-white py-2 hover:bg-red-600 duration-300 rounded-lg' onClick={handleDelete}>DELETE</button>
                    <button className='text-lg font-semibold bg-blue-600 text-white py-2 hover:bg-blue-500 rounded-lg duration-200' onClick={handleUpdate}>UPDATE</button>
                    <button className='absolute rounded-full border text-base text-red-600 border-red-600 hover:bg-red-600 duration-200 hover:text-white hover:border-white px-3 py-1 top-2 right-2' onClick={()=>closeModal()}>x</button>
                </div>
            </div>
        </div>
    </div>
  )
}
