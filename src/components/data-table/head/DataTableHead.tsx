import React from 'react'
import DataTableHeadCell from './DataTableHeadCell'
import { ColumnDefinition } from '../types'

type Props<TSource> = {
    columns: ColumnDefinition<TSource>[]
}

const DataTableHead = <TSource extends {}>({ columns }: Props<TSource>) => {
    const cells = columns.map((c, index) => (
        <DataTableHeadCell column={c} key={index} />
    ))

    return (
        <thead className="data-table__head">
            <tr className="data-table__row">{cells}</tr>
        </thead>
    )
}

export default DataTableHead
