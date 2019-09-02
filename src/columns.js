import { degreesToMMSS, feetToMeters, knotsToKph } from './utils/unit-utils';
import { distanceToDme } from './utils/coordinates-utils';

const coordinatePresentation = value => {
    const { degrees, minutes, seconds } = degreesToMMSS(value);
    return `${degrees}°${minutes}′ ${seconds.toFixed(1)}″`;
};

const anglePresentation = degrees => `${degrees}°`;

const distancePresentation = v => `${v.toFixed(3)} км`;

const speedPresentation = v => `${v.toFixed(3)} км/ч`;

const heightPresentation = v => `${v.toFixed(0)} м`;

export default [
    /*{
        title: 'Id',
        width: 80,
        valueExtractor: data => data[0]
    },
    {
        title: 'Авиакомпания',
        width: 130,
        valueExtractor: data => data[18]
    },*/
    {
        title: 'Рейс',
        width: 80,
        link: v => `https://www.flightradar24.com/${v}`,
        valueExtractor: data => data[16]
    },
    {
        title: 'Откуда',
        width: 80,
        valueExtractor: data => data[11]
    },
    {
        title: 'Куда',
        width: 80,
        valueExtractor: data => data[12]
    },
    {
        title: 'Широта',
        width: 130,
        presentation: coordinatePresentation,
        valueExtractor: data => data[1]
    },
    {
        title: 'Долгота',
        width: 130,
        presentation: coordinatePresentation,
        valueExtractor: data => data[2]
    },
    {
        title: 'Курс',
        width: 60,
        presentation: anglePresentation,
        valueExtractor: data => data[3]
    },
    {
        title: 'Высота',
        width: 90,
        presentation: heightPresentation,
        valueExtractor: data => feetToMeters(data[4])
    },
    {
        title: 'Скорость',
        width: 120,
        presentation: speedPresentation,
        valueExtractor: data => knotsToKph(data[5])
    },
    {
        title: 'До DME',
        width: 230,
        presentation: distancePresentation,
        valueExtractor: data => distanceToDme(data[1], data[2])
    }
];
