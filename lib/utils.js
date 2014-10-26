module.exports = {
    /**
     *
     * @param obj
     * @returns {boolean} if object is null, an empty string, an empty array, or an empty object
     */
    isEmpty: function (obj) {
        return (
            (null === obj)
            || ("" === obj)
            || (0 === obj.length)
            || (0 === Object.keys(obj).length)
            );
    }
};
