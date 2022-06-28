import * as Types from "./types";
import executeRequest from './util';
import { v4 as uuidv4 } from 'uuid';
import _sodium, { base64_variants } from "libsodium-wrappers";

export default class ONDC {
    public host: string;
    public apiKey: string;
    public privateKey: string;
    public bapId: string;
    public bapUri: string;
    public bppId: string;
    public bppUri: string;
    public key?: string;
    public ttl?: string;
    public country: string;
    public city: string;
    public domain?: string;
    public uniqueKey: string;
    public subscriberId: string;
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
        this.privateKey = opts.privateKey || "";
        this.uniqueKey = opts.uniqueKey || uuidv4();
        this.subscriberId = opts.subscriberId || "";
    }

    async search(intent: Types.Intent, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('search');
        const context: Types.Context = this.getContext("search", ctxOpts);
        const message = {
            "intent": intent
        }
        return (await executeRequest(options, context, message));
    }

    async select(order: Types.Order, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('select');
        const context: Types.Context = this.getContext("select", ctxOpts);
        const message = {
            order: order
        }
        return (await executeRequest(options, context, message));
    }

    async init(order: Types.Order, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('init');
        const context: Types.Context = this.getContext("init", ctxOpts);
        const message = {
            order: order
        }
        return (await executeRequest(options, context, message));
    }

    async confirm(order: Types.Order, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('confirm');
        const context: Types.Context = this.getContext("confirm", ctxOpts);
        const message = {
            order: order
        }
        return (await executeRequest(options, context, message));
    }

    async status(order_id: string, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('status');
        const context: Types.Context = this.getContext("status", ctxOpts);
        const message = {
            order_id: order_id
        }
        return (await executeRequest(options, context, message));
    }

    async track(order_id: string, callback_url?: string, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('track');
        const context: Types.Context = this.getContext("track", ctxOpts);
        const message = {
            order_id: order_id,
            callback_url: callback_url,
        }
        return (await executeRequest(options, context, message));
    }

    async cancel(order_id: string, cancellation_reason_id?: string, descriptor?: Types.Descriptor, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('cancel');
        const context: Types.Context = this.getContext("cancel", ctxOpts);
        const message = {
            order_id: order_id,
            cancellation_reason_id: cancellation_reason_id,
            descriptor: descriptor,
        }
        return (await executeRequest(options, context, message));
    }

    async update(update_target: string, order: Types.Order, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('update');
        const context: Types.Context = this.getContext("update", ctxOpts);
        const message = {
            update_target: update_target,
            order: order,
        }
        return (await executeRequest(options, context, message));
    }

    async rating(rating: Types.Rating, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('rating');
        const context: Types.Context = this.getContext("rating", ctxOpts);
        const message = rating;
        return (await executeRequest(options, context, message));
    }

    async support(ref_id?: string, ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('support');
        const context: Types.Context = this.getContext("support", ctxOpts);
        const message = {
            ref_id,
        };
        return (await executeRequest(options, context, message));
    }

    async on_search(catalog: Types.Catalog, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_search');
        const context: Types.Context = this.getContext("on_search", ctxOpts);
        const message = {
            catalog
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_select(message: Types.onSelectMessage, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_select');
        const context: Types.Context = this.getContext("on_select", ctxOpts);
        return (await executeRequest(options, context, message, error));
    }

    async on_init(message: Types.onInitMessage, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_init');
        const context: Types.Context = this.getContext("on_init", ctxOpts);
        return (await executeRequest(options, context, message, error));
    }

    async on_confirm(order: Types.Order, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_confirm');
        const context: Types.Context = this.getContext("on_confirm", ctxOpts);
        const message = {
            order: order
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_status(order: Types.Order, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_status');
        const context: Types.Context = this.getContext("on_status", ctxOpts);
        const message = {
            order,
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_track(tracking: Types.Tracking, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_track');
        const context: Types.Context = this.getContext("on_track", ctxOpts);
        const message = {
            tracking,
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_cancel(order: Types.Order, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_cancel');
        const context: Types.Context = this.getContext("on_cancel", ctxOpts);
        const message = {
            order,
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_update(order: Types.Order, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_update');
        const context: Types.Context = this.getContext("on_update", ctxOpts);
        const message = {
            order,
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_rating(rankingAck: Types.RatingAck, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_rating');
        const context: Types.Context = this.getContext("on_rating", ctxOpts);
        const message = {
            rankingAck,
        }
        return (await executeRequest(options, context, message, error));
    }

    async on_support(phone?: string, email?: string, uri?: string, ctxOpts?: any, error?: Error): Promise<any> {
        const options: any = this.getOptions('on_support');
        const context: Types.Context = this.getContext("on_support", ctxOpts);
        const message = {
            phone,
            email,
            uri,
        };
        return (await executeRequest(options, context, message, error));
    }

    async get_cancellation_reasons(ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('get_cancellation_reasons');
        const context: Types.Context = this.getContext("get_cancellation_reasons", ctxOpts);
        return (await executeRequest(options, context));
    }

    async cancellation_reasons(reasons?: Types.Option[], ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('cancellation_reasons');
        const context: Types.Context = this.getContext("cancellation_reasons", ctxOpts);
        const message = {
            cancellation_reasons: reasons
        };
        return (await executeRequest(options, context, message));
    }

    async get_return_reasons(ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('get_return_reasons');
        const context: Types.Context = this.getContext("get_return_reasons", ctxOpts);
        return (await executeRequest(options, context));
    }

    async return_reasons(return_reasons?: Types.Option[], ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('return_reasons');
        const context: Types.Context = this.getContext("return_reasons", ctxOpts);
        return (await executeRequest(options, context, undefined, undefined, {
            context,
            return_reasons,
        }));
    }

    async get_rating_categories(ctxOpts?: any): Promise<any> {
        const options: any = this.getOptions('get_rating_categories');
        const context: Types.Context = this.getContext("get_rating_categories", ctxOpts);
        return (await executeRequest(options, context));
    }

    getContext(action: string, ctxOpts: any = {}): Types.Context {
        return {
            "domain": ctxOpts.domain || this.domain || "domain",
            "action": ctxOpts.action || action as Types.Action,
            "country": ctxOpts.country || this.country,
            "city": ctxOpts.city || this.city,
            "core_version": ctxOpts.core_version || "0.9.1",
            "transaction_id": ctxOpts.transactionId || uuidv4(),
            "message_id": ctxOpts.messageId || uuidv4(),
            "bap_id": ctxOpts.bapId || this.bapId,
            "bap_uri": ctxOpts.bapUri || this.bapUri,
            "bpp_id": ctxOpts.bppId || this.bppId,
            "bpp_uri": ctxOpts.bppUri || this.bppUri,
            "timestamp": new Date().toISOString(),
            "key": ctxOpts.key || this.key,
            "ttl": ctxOpts.ttl || this.ttl,
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

    async createAuthorizationHeader(message: any) {
        const { signing_string, expires, created } = await this.createSigningString(JSON.stringify(message));
        const signature = await this.signMessage(signing_string, this.privateKey || "");
        const subscriber_id = this.subscriberId;
        const header = `Signature keyId="${subscriber_id}|${this.uniqueKey}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
        return header;
    }

    async createSigningString(message: string, created?: string, expires?: string) {
        //if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
        if (!created) created = Math.floor(new Date().getTime() / 1000 - (1 * 60)).toString(); //TO USE IN CASE OF TIME ISSUE
        if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString(); //Add required time to create expired
        //const digest = createBlakeHash('blake512').update(JSON.stringify(message)).digest("base64");
        //const digest = blake2.createHash('blake2b', { digestLength: 64 }).update(Buffer.from(message)).digest("base64");
        await _sodium.ready;
        const sodium = _sodium;
        const digest = sodium.crypto_generichash(64, sodium.from_string(message));
        const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL);
        const signing_string =
            `(created): ${created}
    (expires): ${expires}
    digest: BLAKE-512=${digest_base64}`
        console.log(signing_string);
        return { signing_string, expires, created }
    }

    async signMessage(signing_string: string, privateKey: string) {
        await _sodium.ready;
        const sodium = _sodium;
        const signedMessage = sodium.crypto_sign_detached(signing_string, sodium.from_base64(privateKey, base64_variants.ORIGINAL));
        return sodium.to_base64(signedMessage, base64_variants.ORIGINAL);
    }

    async verifyHeader (header: string, subscriber_details: Types.SubscriberDetail, rawBody: any) {
        try {
            const parts = this.split_auth_header(header);
            if (!parts || Object.keys(parts).length === 0) {
                throw (new Error("Header parsing failed"));
            }
            
            const public_key = subscriber_details.signing_public_key;
            const { signing_string } = await this.createSigningString(rawBody, parts['created'], parts['expires']);
            const verified = await this.verifyMessage(parts['signature'], signing_string, public_key);
            return verified;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async verifyMessage (signedString: string, signingString: string, publicKey: string) {
        try {
            await _sodium.ready;
            const sodium = _sodium;
            return sodium.crypto_sign_verify_detached(sodium.from_base64(signedString, base64_variants.ORIGINAL), signingString, sodium.from_base64(publicKey, base64_variants.ORIGINAL));
        } catch (error) {
            return false
        }
    }

    split_auth_header (auth_header: string) {
        const header = auth_header.replace('Signature ', '');
        let re = /\s*([^=]+)=([^,]+)[,]?/g;
        let m;
        let parts: any = {}
        while ((m = re.exec(header)) !== null) {
            if (m) {
                parts[m[1]] = this.remove_quotes(m[2]);
            }
        }
        return parts;
    }

    remove_quotes (value: string) {
        if (value.length >= 2 && value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') {
            value = value.substring(1, value.length - 1)
        }
        return value;
    }
}