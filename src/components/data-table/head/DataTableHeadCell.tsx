import React from 'react'
import { ColumnDefinition } from '../types'

type Props<TSource> = {
    column: ColumnDefinition<TSource>
}

const DataTableHeadCell = <TSource extends {}>({ column }: Props<TSource>) => {
    const { title } = column

    return <th className="data-table__cell data-table__cell--head">{title}</th>
}

export default DataTableHeadCell
