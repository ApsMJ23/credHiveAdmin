import {TableProps, Row} from './DashboardTable.d';
import styles from './DashboardTable.module.scss';


const DashboardTable = (props: TableProps) => {
    const {headers, rows} = props;
    const renderRow = (row: Row) => {
        return (
            <>
                {Object.keys(row).map((key, i) => (
                    <td className={styles.TableCell} key={i}>
                        {row[key]}
                    </td>
                ))}
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
                {rows.map((row:Row, i:number) => (
                    <tr className={styles.TableRow} key={i}>
                        {renderRow(row)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable;