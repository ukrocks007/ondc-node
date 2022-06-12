import { ONDCOptions } from "./types";
import executeRequest from './init';

export default class ONDC {
    public host: string;
    public apiKey: string;
    public bapId: string;
    public bapUri: string;
    public bppId: string;
    public bppUri: string;
    constructor(opts: ONDCOptions) {
        this.host = opts.host;
        this.apiKey = opts.apiKey || '<API Key>';
        this.bapId = opts.bapId;
        this.bapUri = opts.bapUri;
        this.bppId = opts.bppId;
        this.bppUri = opts.bppUri;
    }

    async init(): Promise<any> {
        const options: any = this.getOptions();
        const context = this.getContext();
        const message = {
            "order": {
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
            }
        }
        return (await executeRequest(options, context, message));
    }
    getContext(): any {
        return {
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
        };
    }
    getOptions(): any {
        return {
            'method': 'POST',
            'url': `${this.host}/init`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.apiKey
            },
        };
    }
}