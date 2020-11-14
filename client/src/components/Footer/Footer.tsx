import React from "react";
import './Footer.css'

interface IFooter {
}

const Footer: React.FunctionComponent<IFooter> = () => {
    return (
        <footer className="footer footer__wrapper u-mt-150">
            <div className="container u-pt-30 u-pb-30">
                <div className={'row'}>
                    <div className={'col-6 text-left'}>
                        <span className="u-color-white ">© Dark Brotherhood 2020</span>
                    </div>
                    <div className={'col-6 text-right'}>
                        <span className="u-color-white ">Разработано в рамках хакатона Цифровой Прорыв</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;