const ONDC = require("../dist/index");

const ondc = new ONDC.default.ONDC({
    host: "http://localhost:5000"
});

const init = async () => {
    console.log(await ondc.init());
};

init();