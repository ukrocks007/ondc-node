import request from "request";

async function executeRequest(opts: any, context: any, message: any): Promise<any> {
    return new Promise((resolve, reject) => {
        var options: any = {
            ...opts,
            body: JSON.stringify({
                "context": context,
                "message": message
            })

        };
        request(options, function (error: any, response: any) {
            if (error) reject(error);
            resolve(JSON.parse(response.body));
        });
    });
}

export default executeRequest;