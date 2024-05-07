import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.scss';


type ModalProps = {
    open: boolean;
    onClose: () => void;
    heading?: string;
    children: React.ReactNode;
}


const Modal = (props:ModalProps) => {
    const {open, onClose, children} = props;
    if (!open) return null;

    return (
        <div onClick={onClose} className={styles.modalOverlay}>
            <div className={styles.modal}>
                {props.heading&&<div className={styles.modalHeader}>
                    <h2>{props.heading}</h2>
                    <div className={styles.closeButton} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </div>}
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
