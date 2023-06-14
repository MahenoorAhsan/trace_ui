import {React, useEffect, useState} from 'react'
import styles from './breadcrumb.module.scss';
import { useLocation } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';

export default function Breadcrumb() {
    const location = useLocation();
    const [paths, setPaths] = useState([]);
    useEffect(() => {
        let curPath = window.location.pathname.split('/');
        curPath = curPath.splice(1, 1);
        setPaths(curPath);
        console.log(paths);
    }, [location]);
  return (
    <div className={styles.breadcrumb_container}>
        <ul>
            <li>Home</li>
            {
                paths.map((path, index) => (
                    path.length > 1 ? <li key={index}><span><BiChevronRight/></span> {path}</li> :''   
                ))
            }
        </ul>
    </div>
  )
}
