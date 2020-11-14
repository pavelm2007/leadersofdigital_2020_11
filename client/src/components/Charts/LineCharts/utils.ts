export const getDynamicsProfessionData = ({headers, items}) => {
    let result = new Array()
    const labelKey = headers.shift()
    items.forEach((item, index) => {
        let data = headers.map((headerKey: string) => ([headerKey, parseInt(item[headerKey])]))
        let label = item[labelKey]
        result.push({label: label, data: data})
    });
    return result
}