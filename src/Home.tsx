import React, { useEffect, useState } from 'react'
import TableStructure from './components/TableStructure';
import SearchBar from './components/SearchBar';

export default function Home() {
    const [posts, setPosts] = useState([])
    const columns = ['id', 'user id', 'title', 'body']
    const [parentSearch, setParentSearch] = useState('')

    useEffect(()=>{
        const url = 'https://jsonplaceholder.typicode.com/posts'
        fetch(url)
        .then(res=>res.json())
        .then((posts)=>{
            setPosts(posts)
        })
    }, [])
    
    const handleSearch = (data:string) => {
        setParentSearch(data);
      };

    return (
        <>
        <div className='flex w-9/12 mx-auto justify-between mt-8 mb-4'>
            <div id='title' className='text-4xl font-semibold uppercase text-zinc-200 rounded-md ms-10'>Sortable Table</div>
            <SearchBar getSearch={handleSearch}/>
        </div>
            <TableStructure column_titles={columns} content={posts} search={parentSearch}/>
        </>
    )
}
