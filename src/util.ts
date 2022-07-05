import fetch from 'node-fetch';
import _sodium, { base64_variants } from "libsodium-wrappers";

async function executeRequest(opts: any, context: any, message?: any, error?: any, body?: any): Promise<any> {
    const baseBody: any = body || {
        "context": context,
        "message": message,
    };
    if (error) {
        body["error"] = error;
    }
    var options: any = {
        ...opts,
        body: JSON.stringify(baseBody)

    };
    const response = await fetch(options.url, {
        method: options.method,
        body: options.body,
        headers: options.headers
    });
    try {
        const data = await response.json();
        return data;
    } catch (ex) {
        throw new Error("Invalid json in response body");
    }
}

async function createSigningString(message: string, created?: string, expires?: string) {
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

async function signMessage(signing_string: string, privateKey: string) {
    await _sodium.ready;
    const sodium = _sodium;
    const signedMessage = sodium.crypto_sign_detached(signing_string, sodium.from_base64(privateKey, base64_variants.ORIGINAL));
    return sodium.to_base64(signedMessage, base64_variants.ORIGINAL);
}


async function verifyMessage(signedString: string, signingString: string, publicKey: string) {
    try {
        await _sodium.ready;
        const sodium = _sodium;
        return sodium.crypto_sign_verify_detached(sodium.from_base64(signedString, base64_variants.ORIGINAL), signingString, sodium.from_base64(publicKey, base64_variants.ORIGINAL));
    } catch (error) {
        return false
    }
}

function split_auth_header(auth_header: string) {
    const header = auth_header.replace('Signature ', '');
    let re = /\s*([^=]+)=([^,]+)[,]?/g;
    let m;
    let parts: any = {}
    while ((m = re.exec(header)) !== null) {
        if (m) {
            parts[m[1]] = remove_quotes(m[2]);
        }
    }
    return parts;
}

function remove_quotes(value: string) {
    if (value.length >= 2 && value.charAt(0) == '"' && value.charAt(value.length - 1) == '"') {
        value = value.substring(1, value.length - 1)
    }
    return value;
}

export default {
    executeRequest,
    createSigningString,
    signMessage,
    verifyMessage,
    split_auth_header,
};