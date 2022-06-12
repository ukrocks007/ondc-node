const ONDC = require("../dist/index");

const ondc = new ONDC.default.ONDC({
    host: "http://localhost:5000",
    bapId: "bap.com",
    bapUri: "https://bap.com/beckn",
    bppId: "bpp.com",
    bppUri: "https://bpp.com/beckn",
});

const init = async () => {
    console.log(await ondc.init());
};

init();