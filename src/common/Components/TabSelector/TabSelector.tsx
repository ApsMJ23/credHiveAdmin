import { useState } from 'react';
import styles from './TabSelector.module.scss'; // Import SCSS module for styling

const TabSelector = ({ tabs }:{tabs:{title:string,navigation:string}[]}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabClick = (index:number) => {
        setSelectedTab(index);
    };

    return (
        <div className={styles['tab-selector']}>
            <div className={styles['tab-buttons']}>
                {tabs.map((tab, index:number) => (
                    <div
                        key={index}
                        className={index === selectedTab ? styles.active : ''}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabSelector;
