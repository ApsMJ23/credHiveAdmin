import React from 'react';
import styles from './Loading.module.scss';

interface LoadingProps {
    message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingMessage}>{message}</div>
        </div>
    );
};

export default Loading;
