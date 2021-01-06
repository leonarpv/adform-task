import { ReactNode } from 'react'

export type ColumnDefinition<TSource extends {}> = {
    accessor: (source: TSource) => ReactNode
    title: string
}
