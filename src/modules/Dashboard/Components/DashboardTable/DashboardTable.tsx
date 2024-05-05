import {TableProps, Row} from './DashboardTable.d';
import styles from './DashboardTable.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";


const DashboardTable = (props: TableProps) => {
    const {headers, rows} = props;
    const [isFlagged, setIsFlagged] = useState<{[key:number]:boolean}>({});
    useEffect(() => {
        // We can write the logic for flagged entries here when the api is integrated
        setIsFlagged(Object.fromEntries(rows.map((_,i)=>[i,false])));
    }, [rows]);

    const renderRow = (row: Row,index:number) => {
        return (
            <>
                {Object.keys(row).map((key, i) => (
                    <td style={isFlagged[index]?{background:'rgb(255, 230, 230)'}:{}} className={i==0?styles.FrozenCell:styles.TableCell} key={i}>
                        <span className={styles.CellText}>
                        {i===0&&(isFlagged[index] ? (
                            <FontAwesomeIcon style={{cursor:'pointer'}} fontVariant={'regular'} onClick={()=>setIsFlagged({...isFlagged,[index]:false})} icon={faFlag} color={'red'}/>
                        ) : (
                            <FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>setIsFlagged({...isFlagged,[index]:true})} icon={faFlag} color={'gray'}/>
                        ))}
                            {row[key]}
                        </span>
                    </td>
                ))}
                <td style={isFlagged[index]?{background:'rgb(255, 230, 230)'}:{}} className={styles.TableCell}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </td>
            </>
        )
    }
    return (
        <div className={styles.TableContainer}>
            <table className={styles.Table}>
                <thead className={styles.TableHeaders}>
                <tr className={styles.TableHeader}>
                    {headers.map((header, i) => (
                        <th
                            className={
                                i === 0
                                    ? styles.FrozenCell
                                    : styles.HeaderCell
                            }
                            key={i}
                        >
                            {header.name}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className={styles.TableBody}>
                {rows.map((row: Row, i: number) => (
                    <tr className={styles.TableRow} key={i}>
                        {renderRow(row,i)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable;