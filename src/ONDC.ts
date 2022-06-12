import { ONDCOptions } from "./types";
import _init from './init';

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
        const options: any = {
            'method': 'POST',
            'url': `${this.host}/search`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': this.apiKey
            },
        };
        return (await _init());
    }
}