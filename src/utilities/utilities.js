function isEmptyObject(obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return true;
}


/**
 * Determines whether proivded string is NULL or empty
 * @param {String} str  - String to check
 * @return {Boolean} - True if provided string is Null or empty, otherwise returns False
 */
function isStringNullOrEmpty(str) {
    return str == null // checks for both undefined and null as `undefined == null`
        ||
        (typeof str === "string"
            &&
            !/\S/.test(str)); // if string contains at least one char which is not white-space (e.g \n\t)
};

export { isEmptyObject, isStringNullOrEmpty };