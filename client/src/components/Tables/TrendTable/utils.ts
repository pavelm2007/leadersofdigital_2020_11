import {trendDown, trendUp} from "../../../constants";

export const getTrendTableData = ({trend, items}) => {
    const directionTrend = trend === trendUp ? trendUp : trendDown
    const result = new Array()
    items.forEach((item, index) => {
        result.push({trend: directionTrend, title: item.label, value: item.value})
    });
    return result
}