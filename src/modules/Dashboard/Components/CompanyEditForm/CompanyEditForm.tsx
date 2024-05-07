import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ModalData} from "../../../../data/FakeData.ts";
import styles from './CompanyEditForm.module.scss';
import {toast} from "react-toastify";
import {EXISTING_DOC, NEW_DOC} from "../../../../constants/CommonConstants.ts";
import FileInputContainer from "../../../../common/Components/FileInputContainer/FileInputContainer.tsx";
import {validateEmails} from "../../../../utils/utility.ts";

type CompanyEditFormProps = {
    setShowEditingModal: (value: boolean) => void;
}

const CompanyEditForm = (props: CompanyEditFormProps) => {
    const {setShowEditingModal} = props;
    const [params, setParams] = useSearchParams();
    const [showDocuments, setShowDocuments] = useState('');
    const [emails, setEmails] = useState<{ empId: number; id: number; email: string; type: string; }[]>([]);
    useEffect(() => {
        fetchCompanyDetails(params.get('id') ?? '')
    }, [params]);



    const handleClick = () => {
        // handle the click event
        if (!validateEmails(emails)) {
            toast.error('Invalid Email Address');
            return;
        }
        console.log(emails);
        toast.success('Field Edited Successfully, Please Check Console for data');
        params.delete('id');
        setParams(params);
        setShowEditingModal(false);
    }

    const fetchCompanyDetails = (id: string) => {
        // fetch company details from api
        setEmails(ModalData.emails?.[Number(id)] ?? []);
    }
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <h3>Company Edit Form</h3>
            {emails?.map((email, i) => {
                return (
                    <div className={styles.EmailContainer} key={i}>
                        <label htmlFor={`${email.id}`} className={styles.EmailLabel}>{email.type}</label>
                        <input id={`${email.id}`} className={styles.EmailInput} type="email" value={email.email}
                               onChange={(e) => setEmails([...emails.slice(0, i), {
                                   ...email,
                                   email: e.target.value
                               }, ...emails.slice(i + 1)])}/>
                    </div>
                )
            })}
            <div className={styles.EmailContainer}>
                <label style={{margin: '0.5rem 0'}} className={styles.EmailLabel}>Supporting Documents</label>
                <div style={showDocuments===EXISTING_DOC ? {maxHeight: '10rem',background:'#f5f5fa'} : {maxHeight: '1.5rem'}}
                     className={styles.ExistingDocumentsContainer}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type={'checkbox'} value={showDocuments===EXISTING_DOC ? 'on' : 'off'}
                               onChange={() => setShowDocuments(showDocuments===EXISTING_DOC?'':EXISTING_DOC)}/>
                        <label htmlFor={'documents'}>Select from Existing Documents</label>
                    </div>
                    {showDocuments===EXISTING_DOC && ModalData.supportingDocuments?.[Number(params.get('id'))]?.map((document, i) => {
                        return (
                            <div className={styles.ExistingFilelist}>
                                <div key={i} className={styles.DocumentContainer}>
                                    <input type={'checkbox'} value={document.name} id={document.name}/>
                                    <label htmlFor={document.name}>{document.name}</label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div style={{marginTop:'1rem'}} className={styles.EmailContainer}>
                <div style={showDocuments===NEW_DOC ? {maxHeight: '10rem',background:'#f5f5fa'} : {maxHeight: '1.5rem'}}
                     className={styles.ExistingDocumentsContainer}>
                    <div>
                        <input type={'checkbox'} value={showDocuments===NEW_DOC ? 'on' : 'off'}
                               onChange={() => setShowDocuments(showDocuments===NEW_DOC?'':NEW_DOC)}/>
                        <label htmlFor={'documents'}>Upload New Documents</label>
                        {
                            showDocuments===NEW_DOC && (
                                <FileInputContainer/>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className={styles.ButtonContainer}>
                <button onClick={() => {
                    params.delete('id');
                    setParams(params);
                    setShowEditingModal(false)
                }} className={styles.CancelButton}>
                    Cancel
                </button>
                <button onClick={() => handleClick()} className={styles.SaveButton}>Edit Field</button>
            </div>
        </div>
    )
}

export default CompanyEditForm;