import styles from "../CompanyEditForm/CompanyEditForm.module.scss";
import {ModalData} from "../../../../data/FakeData.ts";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";


const CompanyViewForm = ({setShowViewModal}:{setShowViewModal:(value:boolean)=>void}) => {
    const [params,setParams] = useSearchParams();
    const [emails, setEmails] = useState<{ empId: number; id: number; email: string; type: string; }[]>([]);

    useEffect(() => {
        fetchCompanyDetails(params.get('id') ?? '')
    }, [params]);

    const fetchCompanyDetails = (id: string) => {
        // fetch company details from api
        setEmails(ModalData.emails?.[Number(id)] ?? []);
    }
    return(
        <>
            <div onClick={(e) => e.stopPropagation()}>
                <h3>Company View Form</h3>
                {emails?.map((email, i) => {
                    return (
                        <div className={styles.EmailContainer} key={i}>
                            <label htmlFor={`${email.id}`} className={styles.EmailLabel}>{email.type}</label>
                            <input disabled id={`${email.id}`} className={styles.EmailInput} type="email" value={email.email}
                                   onChange={(e) => setEmails([...emails.slice(0, i), {
                                       ...email,
                                       email: e.target.value
                                   }, ...emails.slice(i + 1)])}/>
                        </div>
                    )
                })}
            </div>
            <button onClick={() => {
                params.delete('id');
                setParams(params);
                setShowViewModal(false)
            }} className={styles.CancelButton}>
                Cancel
            </button>
        </>
    )
}

export default CompanyViewForm;