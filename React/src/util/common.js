export const isValidDate = date => (isNaN(new Date(date)) ? false : true);

export const momentObjectOrStringToISODate = input => {
    if (!isValidDate(input)) return null;
    return input._isAMomentObject ?
        input.toISOString().substr(0, 10)
    :
        new Date(input).toISOString().substr(0, 10);
};

export const momentObjectOrStringToISODateTime = input => (
    input._isAMomentObject ?
        input.toISOString()
    :
        new Date(`${input} UTC`).toISOString()
);

export const setStateWithDate = (prop, time, returnValue = null) => {
    if (prop) {
        return time ?
            // datetime-local value must be in format yyyy-MM-ddThh:mm
            // Therefore cut off characters after 16 from ISO string
            momentObjectOrStringToISODateTime(prop).substr(0, 16)
        :
            momentObjectOrStringToISODate(prop);
    }

    return returnValue;
};
