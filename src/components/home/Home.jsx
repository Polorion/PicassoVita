import React, {useEffect, useState} from 'react';
import {useGetPostQuery} from "../../redux";
import S from './Home.module.scss'
import {List} from "./list/List";


const Home = () => {

    const [page, setPage] = useState(1)
    const [post, setPost] = useState([])
    const {data = [], isLoading} = useGetPostQuery(page)
    const addPost = (data) => {
        if (data.length > 0) {
            setPost(prevState => [...prevState, ...data])
        }
    }

    useEffect(() => {
        addPost(data)
    }, [data])

    const nextPage = () => {
        setPage(prevState => prevState + 1)
    }

    if (isLoading) return <h1 className={S.titile}>Loading...</h1>
    return (
        <div className={'App'}>
            <List post={post} nextPage={nextPage}/>
        </div>
    );
}

export default Home;