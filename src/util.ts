import request from "request";

async function executeRequest(opts: any, context: any, message?: any, error?: any, body?: any): Promise<any> {
    const baseBody: any = body || {
        "context": context,
        "message": message,
    };
    if (error) {
        body["error"] = error;
    }
    return new Promise((resolve, reject) => {
        var options: any = {
            ...opts,
            body: JSON.stringify(baseBody)

        };
        request(options, function (error: any, response: any) {
            if (error) reject(error);
            if (response) {
                if (response.body) {
                    try {
                        resolve(JSON.parse(response.body));
                    } catch (ex) {
                        reject("Invalid json in response body");
                    }
                }
            }
            reject("Invalid response or body");
        });
    });
}

export default executeRequest;