import React from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import {inspect} from "util";


interface ICompetenceSelect {
    label?: string
    options: any[]
    defaultValue?: any[]
    isMulti?: boolean
}

const animatedComponents = makeAnimated();

const CompetenceSelect: React.FunctionComponent<ICompetenceSelect> = (
    {
        options,
        label,
        isMulti = false,
        defaultValue
    }) => {

    return (
        <div className={'competence-select'}>
            {
                !!label &&
                <div className={'competence-select__title u-mb-10 u-color-black u-fs-20 u-font-bold'}>{label}</div>
            }

            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={defaultValue}
                isMulti={isMulti}
                options={options}
            />
        </div>
    );
}

export default CompetenceSelect