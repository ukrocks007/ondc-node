import request from "request";

async function init(): Promise<any> {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'POST',
            'url': 'http://localhost:5000/search',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': '<API Key>'
            },
            body: JSON.stringify({
                "context": {
                    "domain": "<string>",
                    "action": "<string>",
                    "country": "<string>",
                    "city": "<string>",
                    "core_version": "<string>",
                    "transaction_id": "<string>",
                    "message_id": "<string>",
                    "bap_id": "bap.com",
                    "bap_uri": "https://bap.com/beckn",
                    "bpp_id": "bpp.com",
                    "bpp_uri": "https://bpp.com/beckn",
                    "timestamp": "<dateTime>",
                    "key": "<string>",
                    "ttl": "<string>"
                },
                "message": {
                    "intent": {
                        "category": {
                            "descriptor": {
                                "name": "Groceries"
                            }
                        },
                        "fulfillment": {
                            "end": {
                                "location": {
                                    "gps": "12.4535445,77.9283792"
                                }
                            }
                        }
                    }
                }
            })

        };
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(response.body);
        });
    });
}

export default init;
