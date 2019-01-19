class SHTML {
    
    /**
     * Creates a list of divs.
     * @param {Number} num - The number of divs that will be created.
     * @param {function(Number, HTMLElement, Object)} func - The function to modify the div.
     * @param {Object|null} data - The data used at the function as the optional third parameter. 
     */
    static Divs(num, func = null, data = null) {

        var divs = [];
        for (let index = 0; index < num; index++) {
            var currDiv = document.createElement("div");

            if (func !== null) {
                func(index, currDiv, data);
            }

            divs.push(currDiv);
        }

        return divs;
    }
}