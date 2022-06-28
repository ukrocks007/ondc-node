# ondc-node

This library can be used to integrate [ONDC](http://ondc.org/) in JavaScript based applications.

Package is developed in TypeScript and will work with Node.Js & other JavaScript based stacks.

## Introduction 👋

ONDC stands for Open Network for Digital Commernce. 

ONDC is an Open Network which makes it easy for any buyer and seller to engage in a transactions.

![LOGO](https://ondc.org/image/logo.png)

### How to install? 👀

`npm i ondc-node --save`

## ☝️ Using to call APIs

### Initialization

```JS
const ondc = require('ondc-node');
const instance = new ondc.ONDC({
    host: "http://localhost:5000",
    bapId: "bap.com",
    bapUri: "https://bap.com/beckn",
    bppId: "bpp.com",
    bppUri: "https://bpp.com/beckn",
    country: "IND",
    city: "std:080",
    ttl: "P1M"
});
```

### Search an Item

```JS
const response = await instance.search({
        "item": {
            "descriptor": {
                "name": "ABC Aata"
            }
        },
        "fulfillment": {
            "end": {
                "location": {
                    "gps": "12.4535445,77.9283792"
                }
            }
        }
    })
```

## ✌️ Using as Express Middleware

```JS
const ONDC = require('ondc-node');
const express = require("express");

const app = express();
app.use(express.json());

app.use(ONDC.Middleware({"on_search": onSearchHandler, "init": initHandler}));
```

## 🤩 Effortless Authorization 🔐 with ONDC

You can use functions ```ondc.createAuthorizationHeader``` function to ```Authorization``` header.

```JS
    const ondc = require('ondc-node');
    // Private key & Public keys are must for Auth to work
    const instance = new ondc.ONDC({
        host: "http://localhost:5000",
        bapId: "bap.com",
        bapUri: "https://bap.com/beckn",
        bppId: "bpp.com",
        bppUri: "https://bpp.com/beckn",
        country: "IND",
        city: "std:080",
        ttl: "P1M",
        publicKey: "<Public Key>",
        privateKey: "<Private Key>",
        uniqueKey: "dev.test.ondc-node.com",
        subscriberId: "<Gateway Address>",
    });

    let body = {
        "item": {
            "descriptor": {
                "name": "ABC Aata"
            }
        },
        "fulfillment": {
            "end": {
                "location": {
                    "gps": "12.4535445,77.9283792"
                }
            }
        }
    };
    // apiKey is sent in Authorization Header
    ondc.apiKey = await ondc.createAuthorizationHeader(body);
    const response = await instance.search(body)
```

Next function is ```ondc.verifyHeader``` which is used to verify the ```Authorization``` header signature with senders Public Keys.

You can fetch the public key from Gateway using ```/lookup``` call.

```JS
    const publicKey = "<Public key of Sender>";

    // verifyHeader return true/false
    let output = await ondc.verifyHeader(req.header.Authorization, {
        signing_public_key: publicKey
    }, req.body);

    console.log(`output: ${output}`);
```

### Reference 📚

- [Auth Header - signing and verification](https://docs.google.com/document/d/1-xECuAHxzpfF8FEZw9iN3vT7D3i6yDDB1u2dEApAjPA/edit?usp=sharing)
- [Signing Beckn APIs in HTTP](https://docs.google.com/document/d/1Iw_x-6mtfoMh0KJwL4sqQYM0kD17MLxiMCUOZDBerBo/edit?usp=sharing)


## Functions Covered 🚀

| Async Function   |  Callback Function        | Other Function            |
|:----------------:|:-------------------------:|:-------------------------:| 
| search           |        on_search          | get_cancellation_reasons  |       
| select           |        on_select          | cancellation_reasons      |   
| init             |        on_init            | get_return_reasons        |     
| confirm          |        on_confirm         | return_reasons            | 
| status           |        on_status          | get_rating_categories     |      
| track            |        on_track           | rating_categories         |  
| cancel           |        on_cancel          | get_feedback_categories   |        
| update           |        on_update          | feedback_categories       |    
| rating           |        on_rating          | get_feedback_form         |  
| support          |        on_support         | feedback_form             |



## Content

- [Getting Started with ONDC](https://life-of-utkarsh.medium.com/getting-started-with-ondc-21b67de6353e)

- [Integrate ONDC with just a few lines of code](https://life-of-utkarsh.medium.com/integrate-ondc-with-just-a-few-lines-of-code-6bf25b622294)

- [ONDC Search Trends Analysis with Node Js & Beckn Protocol Server](https://life-of-utkarsh.medium.com/ondc-search-trends-analysis-with-node-js-beckn-protocol-server-54a7085712aa)