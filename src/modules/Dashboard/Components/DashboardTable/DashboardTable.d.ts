export type TableProps = {
    headers: Array<Header>;
    rows: Array<Row>;
    setShowEditingModal: (value:boolean) => void;
    setShowViewModal: (value:boolean) => void;
}
export type Header = {
    name: string;
    key: string|number;
}
export type Row = {
    [key: string]: string|number
}