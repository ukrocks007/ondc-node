import request from "request";

async function executeRequest(opts: any, context: any, message?: any, error?: any, body?: any): Promise<any> {
    const baseBody: any = body || {
        "context": context,
        "message": message,
    };
    if(error) {
        body["error"] = error;
    }
    return new Promise((resolve, reject) => {
        var options: any = {
            ...opts,
            body: JSON.stringify(baseBody)

        };
        request(options, function (error: any, response: any) {
            if (error) reject(error);
            resolve(JSON.parse(response.body));
        });
    });
}

export default executeRequest;