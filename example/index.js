const ONDC = require("../dist/index");

const ondc = new ONDC.default.ONDC({
    host: "http://localhost:5000",
    bapId: "bap.com",
    bapUri: "https://bap.com/beckn",
    bppId: "bpp.com",
    bppUri: "https://bpp.com/beckn",
    country: "IND",
    city: "std:080",
    ttl: "P1M",
    publicKey: "",
    privateKey: "",
    uniqueKey: "dev.test.ondc-node.com",
    subscriberId: "<Gateway Address>",
});

const init = async () => {
    console.log(await ondc.search({
        "item": {
            "descriptor": {
                "name": "ABC Aata"
            }
        },
        "fulfillment": {
            "end": {
                "location": {
                    "gps": "12.4535445,77.9283792"
                }
            }
        }
    }));
    let body = {
        "item": {
            "descriptor": {
                "name": "ABC Aata"
            }
        },
        "fulfillment": {
            "end": {
                "location": {
                    "gps": "12.4535445,77.9283792"
                }
            }
        }
    };
    ondc.apiKey = await ondc.createAuthorizationHeader(body)
    console.log(`Header: ${ondc.apiKey}`);

    let output = await ondc.verifyHeader(ondc.apiKey, {
        signing_public_key: ""
    }, body)
    console.log(`output: ${output}`);
};

init();