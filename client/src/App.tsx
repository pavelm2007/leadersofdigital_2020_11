import React, {useState, useEffect} from 'react';
import {ColHeader, PageHeader, SectionHeader} from "./components/Headers";
import './App.css'
import {trendDown, trendUp} from "./constants";
import {CompetenceSelect} from "./components/Сompetencies";
import {fetchDynamicsProfession, fetchPopularityProfession, fetchProfession, fetchSkills} from './api';
import {LineChart, ILineChartData, getDynamicsProfessionData} from "./components/Charts/";
import {SkillsTable, TrendTable, getTrendTableData, ITrendTableRow} from "./components/Tables";
import {Footer} from "./components/Footer";

const emptyList = new Array()

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dynamicsProfession, setDynamicsProfession] = useState<ILineChartData[]>(emptyList);
    const [dynamicsByCity, setDynamicsByCity] = useState<ILineChartData[]>(emptyList);
    const [professions, setProfessions] = useState<any[]>(emptyList);
    const [trendUpProfession, setTrendUpProfession] = useState<ITrendTableRow[]>(emptyList);
    const [trendDownProfession, setTrendDownProfession] = useState<ITrendTableRow[]>(emptyList);
    const [skills, setSkills] = useState<any[]>(emptyList)

    useEffect(() => {
        fetchDynamicsProfession()
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDynamicsProfession(getDynamicsProfessionData(result));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetchPopularityProfession(trendUp).then(
            (result) => {
                setIsLoaded(true)
                setTrendUpProfession(getTrendTableData({trend: trendUp, items: result}))
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
        fetchPopularityProfession(trendDown).then(
            (result) => {
                setIsLoaded(true)
                setTrendDownProfession(getTrendTableData({trend: trendDown, items: result}))
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
        fetchProfession(trendDown).then(
            (result) => {
                setIsLoaded(true)
                setProfessions(result)
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    const cityOptions = [
        {value: 'msk', label: 'Москва'},
        {value: 'spb', label: 'Санкт-Петербург'},
        {value: 'ekb', label: 'Екатеринбург'},
        {value: 'nsb', label: 'Новосибирск'},
        {value: 'krs', label: 'Краснодар'},
    ]

    const onProfessionChange = (items) => {
        if (!!items) {
            const query = items.map(item => `professions=${item}`).join('&')

            fetchSkills(query).then(
                (result) => {
                    setIsLoaded(true)
                    setSkills(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        } else {
            setSkills([])
        }
    };
    const onCitySelected = (item) => {
        if (!!item) {
            const query = `city=${item}`

            fetchDynamicsProfession(query).then(
                (result) => {
                    setIsLoaded(true)
                    setDynamicsByCity(getDynamicsProfessionData(result))
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        } else {
            setSkills([])
        }
    };

    return (
        <React.Fragment>
            <PageHeader/>
            <section className={'u-mb-15'}>
                <SectionHeader title={'Прогноз изменения спроса на профессии в России'}/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'u-mb-50'}/>
                            <LineChart data={dynamicsProfession}/>
                            <div className={'u-mb-50'}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'u-mb-15'}>
                <div className={'u-mb-50'}/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-6'}>
                            <ColHeader title={'Набирающие популярность профессии'}/>
                            <div className={'u-mb-30'}/>
                            <TrendTable key={trendUp} items={trendUpProfession}/>
                        </div>
                        <div className={'col-6'}>
                            <ColHeader title={'Уходящие профессии'}/>
                            <div className={'u-mb-30'}/>
                            <TrendTable key={trendDown} items={trendDownProfession}/>
                        </div>
                    </div>
                </div>
            </section>

            <section className={'u-mb-150'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <SectionHeader title={'Ключевые компетенции'}/>
                        <div className={'col-12 u-mb-30'}>
                            <CompetenceSelect
                                label={'Профессии'}
                                isMulti={true}
                                options={professions}
                                onChange={(v) => onProfessionChange(v)}
                            />
                        </div>
                        {!!skills && <div className={'col-12'}>
                            <SkillsTable items={skills}/>
                        </div>}

                    </div>
                </div>
            </section>
            <section className={'u-mb-15'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <CompetenceSelect
                                label={'Регион'}
                                options={cityOptions}
                                onChange={(v) => onCitySelected(v)}
                            />
                        </div>
                    </div>
                    {dynamicsByCity.length > 0 && <div className={'row'}>
                        <div className={'col-12'}>
                            <div className={'u-mb-50'}/>
                            <LineChart data={dynamicsByCity}/>
                            <div className={'u-mb-50'}/>
                        </div>
                    </div>}

                </div>
            </section>
            <Footer/>
        </React.Fragment>

    );
}

export default App;
