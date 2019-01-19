function Div(data) {

    function dess() {
        return 5;
    }

    var div = document.createElement("div");
    if (data.class !== undefined) div.classList.add(data.class);
    if (data.id !== undefined) div.id = data.id;

    return div;
}