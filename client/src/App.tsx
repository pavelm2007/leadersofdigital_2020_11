import React, {useState, useEffect} from 'react';
import {ColHeader, PageHeader, SectionHeader} from "./components/Headers";
import './App.css'
import {trendDown, trendUp} from "./constants";
import {LineChart} from "./components/Charts";
import {CompetenceSelect} from "./components/Сompetencies";
import {fetchDynamicsProfession, fetchPopularityProfession} from './api';
import {ILineChartData, initLineChartData} from "./components/Charts/LineCharts/LineCharts";
import {getDynamicsProfessionData} from "./components/Charts/LineCharts/utils";
import TrendTable, {initTrendTableData, ITrendTableRow} from "./components/Tables/TrendTable/TrendTable";
import {getTrendTableData} from "./components/Tables/TrendTable/utils";

const competenceOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
]

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dynamicsProfession, setDynamicsProfession] = useState<ILineChartData[]>(initLineChartData);
    const [trendUpProfession, setTrendUpProfession] = useState<ITrendTableRow[]>(initTrendTableData);
    const [trendDownProfession, setTrendDownProfession] = useState<ITrendTableRow[]>(initTrendTableData);

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
    }, [])

    const upTrendTableItems = [
        {trend: trendUp, title: 'python', value: 93.5},
        {trend: trendUp, title: 'React', value: 93.5},
        {trend: trendUp, title: 'Vue', value: 93.5}
    ]
    const downTrendTableItems = [
        {trend: trendDown, title: 'python', value: 93.5},
        {trend: trendDown, title: 'React', value: 93.5},
        {trend: trendDown, title: 'Vue', value: 93.5}
    ]
    return (
        <React.Fragment>
            <PageHeader/>
            <section className={'u-mb-15'}>
                <SectionHeader title={'Прогноз изменения спроса на профессии в России'}/>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <div className={'u-mb-50'}/>
                        <LineChart data={dynamicsProfession}/>
                        <div className={'u-mb-50'}/>
                    </div>
                </div>
            </section>
            <section className={'u-mb-15'}>
                <SectionHeader title={'Данные за исследуемый период'}/>
                <div className={'u-mb-50'}/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-6'}>
                            <ColHeader title={'Наиболее популярные профессии'}/>
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

            <section className={'u-mb-15'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <SectionHeader title={'Ключевые компетенции'}/>
                        <div className={'col-12'}>
                            <CompetenceSelect
                                label={'Профессии'}
                                defaultValue={[competenceOptions[0], competenceOptions[1]]}
                                isMulti={true}
                                options={competenceOptions}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className={'u-mb-15'}>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <CompetenceSelect
                                label={'Регион'}
                                options={[
                                    {value: 'chocolate', label: 'Chocolate'},
                                    {value: 'strawberry', label: 'Strawberry'},
                                    {value: 'vanilla', label: 'Vanilla'}
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className={'u-mb-15'}>
                <SectionHeader title={'Сравнение результатов'}/>
            </section>
        </React.Fragment>

    );
}

export default App;
