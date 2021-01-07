import React from 'react'
import { ColumnDefinition } from '../types'

type Props<TSource> = {
    column: ColumnDefinition<TSource>
    sourceEntry: TSource
}

const DataTableBodyCell = <TSource extends {}>({
    column,
    sourceEntry,
}: Props<TSource>) => {
    const element = column.accessor(sourceEntry)

    return (
        <td className="data-table__cell data-table__cell--body">{element}</td>
    )
}

export default DataTableBodyCell
