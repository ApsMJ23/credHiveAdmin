import {ChangeEvent, useState, DragEvent} from 'react';
import {toast} from "react-toastify";
import './FileInputContainer.scss';

function FileInputContainer() {
    const [dragging, setDragging] = useState<boolean>(false);

    const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if(!e.dataTransfer) {
            toast.error('No files found')
            return
        }
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files: File[]): void => {
        files.forEach(file => {
            console.log(file.name);
            toast.success(`File ${file.name} has been uploaded`)
            // Do something with the file, like upload it to a server or process it
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }
    };

    return (
        <div className={`file-drop-area${dragging ? ' dragging' : ''}`}
             onDrop={handleDrop}
             onDragOver={handleDragOver}
             onDragEnter={handleDragEnter}
             onDragLeave={handleDragLeave}>
            <label style={{cursor:'pointer'}} htmlFor="fileInput" className="file-label">
                <span
                    className="file-msg">{dragging ? 'Drop files here' : 'Drag & drop files here or click to select'}</span>
                <input type="file" id="fileInput" className="file-input" multiple onChange={handleInputChange}/>
            </label>
        </div>
    );
}

export default FileInputContainer;
