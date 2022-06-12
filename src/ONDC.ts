import { ONDCOptions, Context, Action } from "./types";
import executeRequest from './init';
import { v4 as uuidv4 } from 'uuid';

export default class ONDC {
    public host: string;
    public apiKey: string;
    public bapId: string;
    public bapUri: string;
    public bppId: string;
    public bppUri: string;
    public key?: string;
    public ttl?: string;
    public country: string;
    public city: string;
    constructor(opts: ONDCOptions) {
        this.host = opts.host;
        this.apiKey = opts.apiKey || '<API Key>';
        this.bapId = opts.bapId;
        this.bapUri = opts.bapUri;
        this.bppId = opts.bppId;
        this.bppUri = opts.bppUri;
        this.ttl = opts.ttl;
        this.country = opts.country;
        this.city = opts.city;
        this.key = opts.encryptionPublicKey;
    }

    async init(): Promise<any> {
        const options: any = this.getOptions();
        const context: Context = this.getContext("init");
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
    getContext(action: string): Context {
        return {
            "domain": "<string>",
            "action": action as Action,
            "country": this.country,
            "city": this.city,
            "core_version": "0.9.1",
            "transaction_id": uuidv4(),
            "message_id": uuidv4(),
            "bap_id": this.bapId,
            "bap_uri": this.bapUri,
            "bpp_id": this.bppId,
            "bpp_uri": this.bppUri,
            "timestamp": new Date().toISOString(),
            "key": this.key,
            "ttl": this.ttl,
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