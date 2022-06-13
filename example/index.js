const ONDC = require("../dist/index");

const ondc = new ONDC.default.ONDC({
    host: "http://localhost:5000",
    bapId: "bap.com",
    bapUri: "https://bap.com/beckn",
    bppId: "bpp.com",
    bppUri: "https://bpp.com/beckn",
    country: "IND",
    city: "std:080",
    ttl: "P1M"
});

const init = async () => {
    console.log(await ondc.init({
        "provider": {
            "id": "453678",
            "locations": [
                {
                    "id": "el"
                }
            ]
        },
        "items": [
            {
                "id": "G-0007",
                "quantity": {
                    "count": 1
                }
            },
            {
                "id": "G-0007-1",
                "quantity": {
                    "count": 2
                }
            }
        ],
        "billing": {
            "name": "Nirmal",
            "phone": "9876543210",
            "address": {
                "door": "Landmark",
                "building": "Test Building",
                "street": "Test Address",
                "city": "Bengaluru",
                "state": "Karnataka",
                "country": "IND",
                "area_code": "560078"
            },
            "email": "customer@test.com"
        },
        "fulfillment": {
            "type": "HOME-DELIVERY",
            "tracking": true,
            "end": {
                "location": {
                    "gps": "12.9063433,77.5856825",
                    "address": {
                        "door": "Landmark",
                        "building": "Test Building",
                        "street": "Test Address",
                        "city": "Bengaluru",
                        "state": "Karnataka",
                        "country": "IND",
                        "area_code": "560078"
                    }
                },
                "contact": {
                    "phone": "9876543210",
                    "email": "customer@test.com"
                }
            }
        }
    }));
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
};

init();