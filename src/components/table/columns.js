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

const degreesToRadians = degrees => degrees / 180 * Math.PI;

const distanceBetween = (point1, point2) => {
    const latitude1 = degreesToRadians(point1.latitude);
    const latitude2 = degreesToRadians(point2.latitude);
    const longitude1 = degreesToRadians(point1.longitude);
    const longitude2 = degreesToRadians(point2.longitude);

    const cosAngle = Math.sin(latitude1) * Math.sin(latitude2) + Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitude1 - longitude2);
    const angle = Math.acos(cosAngle);

    return angle * 6371;
};

const DmeCoordinates = {
    latitude: 55.4103, longitude: 37.9025
};

const distanceToDme = (latitude, longitude) => distanceBetween({latitude, longitude}, DmeCoordinates);

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
    },
];
