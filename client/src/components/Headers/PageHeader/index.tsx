import React from "react";
import './PageHeader.css'

interface IHeader {

}

const Header: React.FunctionComponent<IHeader> = () => {
    return (
        <div className={'container-fluid header__wrapper u-mb-100'}>
            <div className={'row'}>
                <div className={'container'}>
                    <div className={'col-12 u-mt-150 u-mb-150'}>
                        <p className={'header__title text-center'}>
                            топ-10 специальностей в сфере IT, <br/>
                            на которые будет спрос в ближайшие 2-3 года
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;