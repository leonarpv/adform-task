import React from 'react'
import { ColumnDefinition } from '../types'
import DataTableBodyCell from './DataTableBodyCell'

type Props<TSource> = {
    columns: ColumnDefinition<TSource>[]
    sourceEntry: TSource
}

const DataTableBodyRow = <TSource extends {}>({
    columns,
    sourceEntry,
}: Props<TSource>) => {
    const cells = columns.map((c, index) => (
        <DataTableBodyCell key={index} column={c} sourceEntry={sourceEntry} />
    ))

    return <tr className="data-table__row">{cells}</tr>
}

export default DataTableBodyRow
