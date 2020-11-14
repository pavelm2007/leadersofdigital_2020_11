import React, {useState} from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


interface ICompetenceSelect {
    label?: string
    options: any[]
    defaultValue?: any[]
    isMulti?: boolean

    onChange(any): void
}

const animatedComponents = makeAnimated();

const CompetenceSelect: React.FunctionComponent<ICompetenceSelect> = (
    {
        options,
        label,
        isMulti = false,
        defaultValue,
        onChange
    }) => {
    const [selectedOptions, setSelectedOptions] = useState()
    const _onChange = (selectedOption) => {
        setSelectedOptions(selectedOption)
        let values
        if (Array.isArray(selectedOption)) {
            values = !!selectedOption ? selectedOption.map(i => i.value) : null
        } else if (selectedOption === null) {
            values = []
        } else if (typeof selectedOption == 'object') {
            console.log(selectedOption)
            values = [selectedOption.value]
        }

        onChange(values)
    }

    return (
        <div className={'competence-select'}>
            {
                !!label &&
                <div className={'competence-select__title u-mb-10 u-color-black u-fs-20 u-font-bold'}>{label}</div>
            }

            <Select
                autoBlur={true}
                closeMenuOnSelect={true}
                value={selectedOptions}
                components={animatedComponents}
                defaultValue={defaultValue}
                isMulti={isMulti}
                options={options}
                onChange={selectedOption => _onChange(selectedOption)}
            />
        </div>
    );
}

export default CompetenceSelect