const degreesToMMSS = degrees => {
    const fullDegrees = Math.floor(degrees);
    const minutes = (degrees * 60) % 60;
    const fullMinutes = Math.floor(minutes);
    const seconds = (minutes * 60) % 60;

    return { degrees: fullDegrees, minutes: fullMinutes, seconds };
};

const degreesPresentation = value => {
    const { degrees, minutes, seconds } = degreesToMMSS(value);
    return `${degrees}°${minutes}′${seconds.toFixed(2)}″`;
};

const feetToMeters = feet => feet / 3.28084;

const knotsToKph = knots => knots * 1.852;

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
];
