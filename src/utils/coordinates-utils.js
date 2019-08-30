import { degreesToRadians } from './unit-utils';

const distanceBetween = (point1, point2) => {
    const latitude1 = degreesToRadians(point1.latitude);
    const latitude2 = degreesToRadians(point2.latitude);
    const longitude1 = degreesToRadians(point1.longitude);
    const longitude2 = degreesToRadians(point2.longitude);

    const cosAngle =
        Math.sin(latitude1) * Math.sin(latitude2) +
        Math.cos(latitude1) * Math.cos(latitude2) * Math.cos(longitude1 - longitude2);
    const angle = Math.acos(cosAngle);

    return angle * 6371;
};

const DmeCoordinates = {
    latitude: 55.410307,
    longitude: 37.902451
};

export const distanceToDme = (latitude, longitude) => distanceBetween({ latitude, longitude }, DmeCoordinates);
