import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader';
import TableData from './TableData';
import UpdateModal from './UpdateModal';

interface Element {
  id: number,
  userId: number,
  title: string,
  body: string
}
interface Update{
  id: number,
  updateInfo: object
}
interface SortData{
  colToSort: string,
  direction: string
}

export default function TableStructure({column_titles, content, search}:any) {
  const [data, setData] = useState(content);
  const [sort, setSort] = useState({colToSort:'id' , direction: 'asc'})
  const [dataSearch, setDataSearch] = useState(search)
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState( {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  })

  const handleModal = (row_info:Element)=>{
    setModalInfo(row_info)
    setShowModal(true)
  }
  function getSort(sortData:SortData){
    setSort(sortData)

  }
  function toggleModal(){
    setShowModal(!showModal)
  }

  const handleUpdatedData = (updates:Update) => {
    const updatedData = (data.length>0 ? data : content).map((el:Element)=>{
      if(el.id === updates.id){
        return updates.updateInfo
      }
      return el
    })
    setData(updatedData)
  }

  const handleRowDelete = (row_id:number) => {
    const deletedRow = (data.length>0 ? data : content).filter((el:Element)=>el.id !== row_id)
    setData(deletedRow)
  }

  useEffect(()=>{
    setDataSearch((prev:Object[]) =>({
      ...prev,
      dataSearch: search}))
  },[search])

  const searchFilter = (data:Array<Element>)=>{
    if(search.length === 0 || search === undefined){
      return data
    }
    else{
      return data.filter((el:Element) => el.title.toLowerCase().includes(search.toLowerCase()));
    }
  }

  const arraySorter = (data:Array<Element>) => {
    if(sort.direction === 'asc'){
      return data.sort((a:any,b:any) => (a[sort.colToSort] > b[sort.colToSort] ? 1 : -1))
    }
    else{
      return data.sort((a:any,b:any) => (a[sort.colToSort] > b[sort.colToSort] ? -1 : 1))
    }
  }
  return (
    <>
        <div id='table' className='w-9/12 mx-auto'>
            <TableHeader column_titles={column_titles} getSort={getSort}/>
            <TableData data={searchFilter(arraySorter(data.length > 0 ? data : content))} handleModal={handleModal}/>
        </div>
        {showModal && <UpdateModal
          row_info={modalInfo} 
          updateData={handleUpdatedData}
          deleteData={handleRowDelete}
          closeModal={toggleModal}
        />}
    </>
  )
}
