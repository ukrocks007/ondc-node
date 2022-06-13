import * as Types from "./types";
import executeRequest from './util';
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
    public domain?: string;
    constructor(opts: Types.ONDCOptions) {
        this.host = opts.host;
        this.apiKey = opts.apiKey || '<API Key>';
        this.bapId = opts.bapId;
        this.bapUri = opts.bapUri;
        this.bppId = opts.bppId;
        this.bppUri = opts.bppUri;
        this.ttl = opts.ttl;
        this.country = opts.country;
        this.city = opts.city;
        this.domain = opts.domain;
        this.key = opts.encryptionPublicKey;
    }

    async init(order: Types.Order): Promise<any> {
        const options: any = this.getOptions('init');
        const context: Types.Context = this.getContext("init");
        const message = {
            "order": order
        }
        return (await executeRequest(options, context, message));
    }

    async search(intent: Types.Intent): Promise<any> {
        const options: any = this.getOptions('search');
        const context: Types.Context = this.getContext("search");
        const message = {
            "intent" : intent
        }
        return (await executeRequest(options, context, message));
    }

    getContext(action: string): Types.Context {
        return {
            "domain": this.domain || "domain",
            "action": action as Types.Action,
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
    getOptions(path: string): any {
        return {
            'method': 'POST',
            'url': `${this.host}/${path}`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.apiKey
            },
        };
    }
}