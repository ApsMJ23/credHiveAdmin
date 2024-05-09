import {FakeDataArray, FakeDataHeaders} from "../../data/FakeData.ts";
import {useEffect, useState} from "react";
import styles from './Dashboard.module.scss';
import DashboardTable from "./Components/DashboardTable/DashboardTable.tsx";
import {useSearchParams} from "react-router-dom";
import TabSelector from "../../common/Components/TabSelector/TabSelector.tsx";
import {TabData} from "../../data/TabData.ts";
import SearchBar from "./Components/SearchBar/SearchBar.tsx";
import Modal from "../../common/Components/Modal/Modal.tsx";
import CompanyEditForm from "./Components/CompanyEditForm/CompanyEditForm.tsx";
import CompanyViewForm from "./Components/CompanyViewForm/CompanyViewForm.tsx";

const Dashboard = () => {
    const [dashBoardData, setDashBoardData] = useState<{
        companyName: string;
    informalName: string;
    recentEditor: string;
    updatedOn: string;
    previousChanges: number;
    }[]|null>(null);
    const [showEditingModal, setShowEditingModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [params, setParams] = useSearchParams();

    const fetchData = async (pageNo: number, maxCount: number) => {
        // fetch data from api
        let data = FakeDataArray;
        if (pageNo * maxCount > data.length) {
            data = data.slice((pageNo - 1) * maxCount, data.length);
        } else {
            data = data.slice((pageNo - 1) * maxCount, pageNo * maxCount);
        }
        setDashBoardData(data);
    }
    useEffect(() => {
        if (params.has('page')) {
            setPageNo(Number(params.get('page')))
            fetchData(Number(params.get('page')), 10)
        } else {
            fetchData(1, 10);
        }
    }, [params]);

    const changePageNo = (type: string) => {
        switch (type) {
            case 'prev':
                if (pageNo > 1) {
                    setPageNo(prevPageNo => prevPageNo - 1);
                    params.set('page', `${pageNo - 1}`);
                    setParams(params);
                }
                break;
            case 'next':
                if (pageNo < FakeDataArray.length / 10) {
                    setPageNo(prevPageNo => prevPageNo + 1);
                    params.set('page', `${pageNo + 1}`);
                    setParams(params);
                }
                break;
            default:
                break;
        }
    }


    return (
        <div className={styles.DashboardWrapper}>
            <SearchBar setData={setDashBoardData}/>
            <h1>Companies List</h1>
            <TabSelector tabs={TabData}/>
            <div className={styles.DashboardContainer}>
                {dashBoardData&&<div className={styles.TableContainer}>
                    <DashboardTable setShowViewModal={setShowViewModal} setShowEditingModal={setShowEditingModal} headers={FakeDataHeaders}
                                    rows={dashBoardData}/>
                </div>}
                <div data-testid='pagination' className={styles.DashboardTableFooter}>
                    <div>Page {pageNo} of {FakeDataArray.length / 10}</div>
                    <div className={styles.ButtonContainer}>
                        <button onClick={() => changePageNo('prev')} style={{width: '5rem'}}>Previous</button>
                        <button onClick={() => changePageNo('next')} style={{width: '5rem'}}>Next</button>
                    </div>
                </div>
            </div>
            <Modal open={showEditingModal} onClose={() => setShowEditingModal(false)}>
                <CompanyEditForm setShowEditingModal={setShowEditingModal}/>
            </Modal>
            <Modal open={showViewModal} onClose={()=>setShowViewModal(false)}>
                <CompanyViewForm setShowViewModal={setShowViewModal}/>
            </Modal>
        </div>
    )
}

export default Dashboard;