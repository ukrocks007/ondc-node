# ondc-node

This library can be used to integrate [ONDC](http://ondc.org/) in JavaScript based applications.

## Introduction

![LOGO](https://ondc.org/image/logo.png)

### How to install?

`npm i ondc-node --save`

### Initialization

```
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

```
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

## Functions Covered

- search
- select
- init
- confirm
- status
- track
- cancel
- update
- rating
- support
- on_search
- on_select
- on_init
- on_confirm
- on_track
- on_cancel
- on_update
- on_status
- on_rating
- on_support
- get_cancellation_reasons
- cancellation_reasons
- get_return_reasons
- return_reasons
- get_rating_categories
- rating_categories
- get_feedback_categories
- feedback_categories
- get_feedback_form
- feedback_form
