import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './Account.css';
import imgBalanceGb from './media/package-gb.png';
import imgBalanceMinutes from './media/package-minutes.png';
import imgBalanceSms from './media/package-sms.png';

function Account(props) {
    if (!props.token) {
        //return <Redirect to={"/auth"}/>
    }

    let balanceGb = 9.9;
    let balanceMinutes = 450;
    let balanceSms = 49;
    let balance = 50;
    let balanceDate = "20.10.2019"

    return (
        <div className="page__container">
            <ul className="medium-text-12 account-menu">
                <li>Личные данные</li>
                <li>Мой тариф и услуги</li>
                <li>Безопасность и вход</li>
                <li>Детализация</li>
            </ul>
            <div className="user-card">
                <div className="user-data">
                    <h2 className="bold-text-20 uppercase-transform user-full-name">Садовский Георгий Александрович</h2>
                    <h2 claassName="bold-text-20 user-phone">+7 952 131 64 07</h2>
                </div>
                <div className="user-package-info">
                    <div className="package-balance">
                        <h5 className="regular-text-12 color-grey">Остаток по пакету</h5>
                        <div className="balance-parts medium-text-12">
                            <div className="balance-part">
                                <img src={imgBalanceGb}></img>
                                <div>{balanceGb} ГБ</div>
                            </div>
                            <div className="balance-part">
                                <img src={imgBalanceMinutes}/>
                                <div>{balanceMinutes} мин</div> 
                            </div>
                            <div className="balance-part">
                                <img src={imgBalanceSms}/>
                                <div>{balanceSms} sms</div>
                            </div>
                        </div>
                    </div>
                    <div className="balance-container">
                        <h5 className="regular-text-12 color-grey">Баланс на {balanceDate}</h5>
                        <div className="medium-text-12 balance">{balance} <span className="bold-text-20">₽</span></div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function MapStateToProps(store) {
    return {
        token: store.AuthReducer.token
    }
}

export default connect(MapStateToProps, null)(Account);