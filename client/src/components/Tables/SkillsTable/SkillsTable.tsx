import React from "react";

export interface ISkillsTableRow {
    label: string
    values: string[]
}

export interface ISkillsTable {
    items: ISkillsTableRow[]
}

export const initSkillsTableData = new Array()

const SkillsTable: React.FunctionComponent<ISkillsTable> = ({items}) => {
    const renderRow = (item: any, key: number) => {
        return (
            <tr key={key}>
                <th>{item.label}</th>
                <td>{item.values.join(', ')}</td>
            </tr>
        )
    }

    return (
        <table className="table table-striped">
            <tbody>
            {items.map((item, i) => renderRow(item, i))}
            </tbody>
        </table>
    );
}

export default SkillsTable;