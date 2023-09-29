import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import S from './List.module.scss'
import {Item} from "../item/Item";

export const List = ({post, nextPage}) => {
    const [start, setStart] = useState(0);
    const rowHeight = 90
    const visibleRows = 4
    const refObserver = useRef()
    const lastElement = useRef()

    const getTopHeight = () => {
        return rowHeight * start;
    }

    const getBottomHeight = () => {
        return rowHeight * (post.length - (start + visibleRows + 1));
    }

    const onScroll = (e) => {
        setStart(
            Math.floor(e.target.scrollTop / rowHeight)
        );
    }
    useEffect(() => {
        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                nextPage()
            }
        }

        refObserver.current = new IntersectionObserver(callback, {
            rootMargin: "400px",
            threshold: 1.0,
        });
        refObserver.current.observe(lastElement.current)
    }, [])

    return (
        <div style={{height: visibleRows * (rowHeight + 30), overflow: 'auto'}} onScroll={(e) => {
            onScroll(e)
        }}
             className={S.body}>
            <div style={{height: getTopHeight()}}></div>
            {post.slice(start, start + visibleRows + 1).map(el =>
                <Item heightPost={rowHeight} data={el}
                      key={start + el.title}/>)}
            <div ref={lastElement} style={{height: getBottomHeight(), opacity: 0}}>1</div>
        </div>
    );
};