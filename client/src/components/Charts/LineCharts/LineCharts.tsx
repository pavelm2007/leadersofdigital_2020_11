import React from "react";
import {Chart} from "react-charts";
import './LineCharts.css'

export interface ILineChartDataItem {
    primary: string,
    secondary: number
}

export interface ILineChartData {
    data: ILineChartDataItem[]
    label: string
}

export const initLineChartData = new Array()

interface ILineChart {
    data: ILineChartData[]
}

const LineChart: React.FunctionComponent<ILineChart> = ({data}) => {
    const series = React.useMemo(
        () => ({
            showPoints: true
        }),
        []
    )
    const axes = React.useMemo(
        () => [
            {primary: true, type: 'ordinal', position: 'bottom'},
            {type: 'linear', position: 'left'}
        ],
        []
    )

    const chartData = {
        data,
        grouping: 'primary',
        dataType: 'ordinal',
    }


    return (
        <div className={'container'}>
            <div style={{width: '100%', height: '350px'}}>
                <Chart {...chartData} series={series} axes={axes} tooltip/>
            </div>
        </div>
    );
}

export default LineChart;