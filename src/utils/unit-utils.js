export const degreesToMMSS = degrees => {
    const fullDegrees = Math.floor(degrees);
    const minutes = (degrees * 60) % 60;
    const fullMinutes = Math.floor(minutes);
    const seconds = (minutes * 60) % 60;

    return { degrees: fullDegrees, minutes: fullMinutes, seconds };
};

export const feetToMeters = feet => feet / 3.28084;

export const knotsToKph = knots => knots * 1.852;

export const degreesToRadians = degrees => (degrees / 180) * Math.PI;
