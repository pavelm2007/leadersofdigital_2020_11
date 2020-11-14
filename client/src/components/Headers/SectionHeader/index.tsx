import React from "react";
import './SectionHeader.css'

interface ISectionHeader {
    title: string
}

const SectionHeader: React.FunctionComponent<ISectionHeader> = ({title}) => {
    return (
        <div className={'container-fluid section__wrapper'}>
            <div className={'row'}>
                <div className={'container'}>
                    <div className={'col-12 u-mt-15 u-mb-15'}>
                        <p className={'section__title u-fs-22 u-color-green u-text-upper text-center'}>
                            {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionHeader;