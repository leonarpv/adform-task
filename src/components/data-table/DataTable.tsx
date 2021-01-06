import React from 'react'
import DataTableHead from './head/DataTableHead'
import { ColumnDefinition } from './types'
import DataTableBody from './body/DataTableBody'
import './dateTable.scss'

type Props<TSource> = {
    columns: ColumnDefinition<TSource>[]
    emptyText?: string
    source: TSource[]
}

const DataTable = <TSource extends {}>({
    columns,
    emptyText,
    source,
}: Props<TSource>) => {
    return (
        <table className="data-table">
            <DataTableHead columns={columns} />
            <DataTableBody
                columns={columns}
                emptyText={emptyText}
                source={source}
            />
        </table>
    )
}

export default DataTable
