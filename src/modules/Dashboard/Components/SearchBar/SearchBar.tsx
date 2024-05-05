import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {FakeDataArray} from "../../../../data/FakeData.ts";
import styles from './SearchBar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useSearchParams} from "react-router-dom";

type SearchBarProps = {
    setData: Dispatch<SetStateAction<{
        companyName: string;
        informalName: string;
        recentEditor: string;
        updatedOn: string;
        previousChanges: number;
    }[]>>
}

const SearchBar = (props: SearchBarProps) => {
    const {setData} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const[params,setParams] = useSearchParams();
    useEffect(() => {
        if (searchTerm === '') {
            params.set('page','1')
            setParams(params)
        }
    }, [searchTerm]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        const filteredData = FakeDataArray.filter(item => {
                return item.companyName.toLowerCase().includes(term.toLowerCase());
            }
        );
        setData(filteredData.slice(0, 10));
    };

    return (
        <div className={styles.searchContianer}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className={styles.SearchBar}
                onChange={handleInputChange}
            />
            <div className={styles.searchIcon}>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
    );
}

export default SearchBar