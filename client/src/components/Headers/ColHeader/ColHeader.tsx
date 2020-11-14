import React from "react";
import './ColHeader.css'

interface IColHeader {
    title: string
}

const ColHeader: React.FunctionComponent<IColHeader> = ({title}) => {
    return (
        <div className={'col-header__wrapper u-bg-green col-12 u-mt-15 u-mb-15'}>
            <p className={'col-header__title u-m-0 u-pt-15 u-pb-15 u-fs-18 u-color-white u-text-upper'}>
                {title}
            </p>
        </div>
    );
}

export default ColHeader;