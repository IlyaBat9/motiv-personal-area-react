import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import './Account.css';
import imgBalanceGb from './media/package-gb.png';
import imgBalanceMinutes from './media/package-minutes.png';
import imgBalanceSms from './media/package-sms.png';
import tariffImage from './media/tariffImage.png';
import Header from '../Header/Header';
import APK from './media/app-debug.apk'

function Account(props) {
    if (props.token === undefined) {
        return <Redirect to={"/auth"}/>
    }

    let balanceGb = 9.9;
    let balanceMinutes = 450;
    let balanceSms = 49;
    let balance = 50;
    let currentDate = "20.10.2019";
    let nextPaymentDate = "25.10.2019";
    let region = "Свердловская область";
    let tariff = "Самый классный тариф!";
    let tariffPromo = "Всё бесплатно";
    let services = [
        { id: 1, title: "Звонки", description: "Общайтесь с родными совершенно бесплатно! Абонентская плата за звонки внутри сети - 0 рублей", checked: true },
        { id: 2, title: "Интернет", description: "Безлимитный интернет за 0 рублей в месяц", checked: false },
        { id: 3, title: "СМС", description: "10000000 СМС в подарок", checked: true },
        { id: 4, title: "Музыка", description: "Мелодия для ваших ушек со скидкой в 100%", checked: true }
    ];

    let servicesDom = services.map(service =>
        <div className="service">
            <div className="service-text">
                <p className="medium-text-24 m-0">{service.title}</p>
                <p className="medium-text-12 color-grey">{service.description}</p>
            </div>
            <input
                type="checkbox"
                id={"switch" + service.id}
                className="service-switch"
                defaultChecked={service.checked}
            />
            <label for={"switch" + service.id} className="service-switch-label"></label>

        </div>
    );

    return (
        <React.Fragment>
            <Header />
            <div className="page__container">
                <ul className="medium-text-20 account-menu">
                    <li>Личные данные</li>
                    <li>Мой тариф и услуги</li>
                    <li>Безопасность и вход</li>
                    <li>Детализация</li>
                </ul>
                <div className="data-account-container">
                    <div className="account-data">
                        <div className="card user-card">
                            <p className="bold-text-20 uppercase-transform m-0 user-full-name">Садовский Георгий Александрович</p>
                            <p className="bold-text-38 m-0 user-phone">+7 952 131 64 07</p>
                            <div className="balance-container">
                                <p className="regular-text-12 m-0 color-grey">Баланс на {currentDate}</p>
                                <div className="medium-text-12 balance">{balance} <span className="balance-valute">₽</span></div>
                                <p className="regular-text-12 m-0 color-grey" m-0>Рекомендуем пополнить счет до {nextPaymentDate}</p>
                            </div>
                        </div>
                        <div className="card package-card">
                            <p className="regular-text-12 m-0 color-grey">Остаток по пакету</p>
                            <div className="balance-parts medium-text-12">
                                <div className="balance-part">
                                    <img src={imgBalanceGb}></img>
                                    <div>{balanceGb} ГБ</div>
                                </div>
                                <div className="balance-part">
                                    <img src={imgBalanceMinutes} />
                                    <div>{balanceMinutes} мин</div>
                                </div>
                                <div className="balance-part">
                                    <img src={imgBalanceSms} />
                                    <div>{balanceSms} sms</div>
                                </div>
                            </div>
                            <div className="state-rectangle regular-text-12 state-rectangle-1">9.9 из 10 ГБ</div>
                            <div className="state-rectangle regular-text-12 state-rectangle-2">450 из 500 мин</div>
                            <div className="state-rectangle regular-text-12 state-rectangle-3">49 из 50 sms</div>
                        </div>
                        <div className="region">
                            <p className="regular-text-12">Домашний регион</p>
                            <p className="bold-text-20 m-0">{region}</p>
                        </div>
                    </div>
                    <div className="tariff-and-services">
                        <div className="tariff">
                            <p className="regular-text-12">Активный тариф</p>
                            <div className="card tariff-card">
                                <p className="medium-text-24 m-0">{tariff}</p>
                                <img src={tariffImage} className="tariff-image" />
                                <p className="medium-text-12 color-grey m-0 tariff-promo">{tariffPromo}</p>
                            </div>
                        </div>
                        <div className="services">
                            <p className="regular-text-12">Подключенные услуги</p>
                            <div className="card services-card">
                                <div className="scrolling">
                                    {servicesDom}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sequrity">
                        <div className="card sequrity-card">
                            <p className="medium-text-24">Настройки безопасности</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="card details-card">
                            <p className="medium-text-24">Детализация</p>
                        </div>
                    </div>
                    <div className="region">
                        <a href={APK}>Мобильный личный кабинет</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

function MapStateToProps(store) {
    return {
        token: store.AuthReducer.token
    }
}

export default connect(MapStateToProps, null)(Account);