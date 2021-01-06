import React from 'react'
import { ColumnDefinition } from '../types'
import DataTableBodyRow from './DataTableBodyRow'

type Props<TSource> = {
    columns: ColumnDefinition<TSource>[]
    emptyText?: string
    source: TSource[]
}

const DataTableBody = <TSource extends {}>({
    columns,
    emptyText,
    source,
}: Props<TSource>) => {
    const emptyContent = (
        <tr className="data-table__row">
            <td className="data-table__empty-content" colSpan={columns.length}>
                {emptyText || 'No Data'}
            </td>
        </tr>
    )

    const bodyContent =
        source.length === 0
            ? emptyContent
            : source.map((s, index) => (
                  <DataTableBodyRow
                      key={index}
                      columns={columns}
                      sourceEntry={s}
                  />
              ))

    return <tbody className="data-table__body">{bodyContent}</tbody>
}

export default DataTableBody
