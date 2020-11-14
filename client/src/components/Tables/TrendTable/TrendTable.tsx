import React from "react";
import DownTrendIcon from './icons/DownTrendIcon.svg'
import UpTrendIcon from './icons/UpTrendIcon.svg'
import {trendDown, trendUp} from "../../../constants";

import './TrendTable.css'

export interface ITrendTableRow {
    trend: string
    title: string
    value: number
}

export interface ITrendTable {
    items: ITrendTableRow[]
}

export const initTrendTableData = new Array()

const TrendTable: React.FunctionComponent<ITrendTable> = ({items}) => {
    const getTrendIcon = (trend: string) => {
        if (trend === trendUp) {
            return UpTrendIcon
        } else if (trend === trendDown) {
            return DownTrendIcon
        }
    }
    const renderRow = (item: any, key: number) => {
        return (
            <tr key={key}>
                <th><img src={getTrendIcon(item.trend)} alt=''/></th>
                <td className={'trend-table__title'}>{item.title}</td>
                <td>{item.value}</td>
            </tr>
        )
    }

    return (
        <table className="table table-striped trend-table">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>Специальность</th>
                <th>Изменение, %</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, i) => renderRow(item, i))}
            </tbody>
        </table>
    );
}

export default TrendTable;