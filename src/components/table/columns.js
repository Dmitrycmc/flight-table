import { degreesToMMSS, feetToMeters, knotsToKph } from '../../utils/unit-utils';
import { distanceToDme } from '../../utils/coordinates-utils';

const degreesPresentation = value => {
    const { degrees, minutes, seconds } = degreesToMMSS(value);
    return `${degrees}°${minutes}′${seconds.toFixed(2)}″`;
};

export const columns = [
    {
        title: 'Id',
        width: 80,
        valueExtractor: data => data[0]
    },
    {
        title: 'Авиакомпания',
        width: 120,
        valueExtractor: data => data[18]
    },
    {
        title: 'Рейс',
        width: 80,
        valueExtractor: data => data[16]
    },
    {
        title: 'Откуда',
        width: 60,
        valueExtractor: data => data[11]
    },
    {
        title: 'Куда',
        width: 60,
        valueExtractor: data => data[12]
    },
    {
        title: 'Широта',
        width: 120,
        presentation: degreesPresentation,
        valueExtractor: data => data[1]
    },
    {
        title: 'Долгота',
        width: 120,
        presentation: degreesPresentation,
        valueExtractor: data => data[2]
    },
    {
        title: 'Курс',
        width: 50,
        presentation: degrees => `${degrees}°`,
        valueExtractor: data => data[3]
    },
    {
        title: 'Высота',
        width: 90,
        presentation: v => `${v} м`,
        valueExtractor: data => feetToMeters(data[4]).toFixed(0)
    },
    {
        title: 'Скорость',
        width: 120,
        presentation: v => `${v} км/ч`,
        valueExtractor: data => knotsToKph(data[5]).toFixed(3)
    },
    {
        title: 'Расстояние до аэропорта',
        width: 200,
        presentation: v => `${v} км`,
        valueExtractor: data => distanceToDme(data[1], data[2]).toFixed(3)
    }
];
