export type TableProps = {
    headers: Array<Header>;
    rows: Array<Row>;
}
export type Header = {
    name: string;
    key: string|number;
}
export type Row = {
    [key: string]: string|number
}