module.exports = (d) => {
    const formatDatePart = (part) => {
        return part < 10 ? `0${part}` : part;
    };

    return (
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
        " " +
        [
            formatDatePart(d.getHours()),
            formatDatePart(d.getMinutes()),
            formatDatePart(d.getSeconds()),
        ].join(":")
    );
};
