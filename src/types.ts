export type ONDCOptions = {
    host: string,
    apiKey?: string,
    bapId: string,
    bapUri: string,
    bppId: string,
    bppUri: string,
    encryptionPublicKey?: string,
    ttl?: string,
    country: string,
    city: string,
    domain?: string,
}

export type Contact = {
    phone?: string;
    email?: string;
    tags?: Tags;
};

/** @description Codification of domains supported by ONDC */
export type Domain = string;

/** @description Describes a country. */
export type Country = {
    /** @description Name of the country */
    name?: string;
    /** @description Country code as per ISO 3166 Alpha-3 code format */
    code?: string;
};

/** @description Describes a city */
export type City = {
    /** @description Name of the city */
    name?: string;
    /** @description Codification of city code will be using the std code of the city e.g. for Bengaluru, city code is 'std:080' */
    code?: string;
};

export type Action =
    | "search"
    | "select"
    | "init"
    | "confirm"
    | "update"
    | "status"
    | "track"
    | "cancel"
    | "rating"
    | "support"
    | "on_search"
    | "on_select"
    | "on_init"
    | "on_confirm"
    | "on_update"
    | "on_status"
    | "on_track"
    | "on_cancel"
    | "on_rating"
    | "on_support";

/** @description Describes a ONDC message context */
export type Context = {
    domain: Domain;
    country: string;
    city: string;
    /**
     * @description Defines the ONDC API call. Any actions other than the enumerated actions are not supported by ONDC Protocol
     * @enum {string}
     */
    action: Action;
    /** @description Version of ONDC core API specification being used */
    core_version: string;
    /**
     * Format: uri
     * @description Unique id of the Buyer App. By default it is the fully qualified domain name of the Buyer App
     */
    bap_id: string;
    /**
     * Format: uri
     * @description URI of the Seller App for accepting callbacks. Must have the same domain name as the bap_id
     */
    bap_uri: string;
    /**
     * Format: uri
     * @description Unique id of the Seller App. By default it is the fully qualified domain name of the Seller App
     */
    bpp_id?: string;
    /**
     * Format: uri
     * @description URI of the Seller App. Must have the same domain name as the bap_id
     */
    bpp_uri?: string;
    /** @description This is a unique value which persists across all API calls from search through confirm */
    transaction_id: string;
    /** @description This is a unique value which persists during a request / callback cycle */
    message_id: string;
    /**
     * Format: date-time
     * @description Time of request generation in RFC3339 format
     */
    timestamp: string;
    /** @description The encryption public key of the sender */
    key?: string;
    /** @description The duration in ISO8601 format after timestamp for which this message holds valid. */
    ttl?: string;
};

/** @description An object representing a scalar quantity. */
export type Scalar = {
    /** @enum {string} */
    type?: "CONSTANT" | "VARIABLE";
    value: number;
    estimated_value?: number;
    computed_value?: number;
    range?: {
        min?: number;
        max?: number;
    };
    unit: string;
};

/** @description Describes a schedule */
export type Schedule = {
    frequency?: Duration;
    holidays?: string[];
    times?: string[];
};

/** @description Describes duration as per ISO8601 format */
export type Duration = string;

/** @description Describes a state */
export type State = {
    descriptor?: Descriptor;
    /** Format: date-time */
    updated_at?: string;
    /** @description ID of entity which changed the state */
    updated_by?: string;
};

export type ItemQuantitySub = {
    count?: number;
    measure?: Scalar;
};

/** @description Describes count or amount of an item */
export type ItemQuantity = {
    allocated?: ItemQuantitySub;
    available?: ItemQuantitySub;
    maximum?: ItemQuantitySub;
    minimum?: ItemQuantitySub;
    selected?: ItemQuantitySub;
};

/** @description Describes a document which can be sent as a url */
export type Document = {
    /** Format: uri */
    url?: string;
    label?: string;
};

/** @description Describes an organization */
export type Organization = {
    name?: string;
    cred?: string;
};

/** @description Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations */
export type Time = {
    label?: string;
    /** Format: date-time */
    timestamp?: string;
    duration?: Duration;
    range?: {
        /** Format: date-time */
        start?: string;
        /** Format: date-time */
        end?: string;
    };
    /** @description comma separated values representing days of the week */
    days?: string;
    schedule?: Schedule;
};

/** @description Describes how a single product/service will be rendered/fulfilled to the end customer */
export type Fulfillment = {
    /** @description Unique reference ID to the fulfillment of an order */
    id?: string;
    /** @description This describes the type of fulfillment */
    type?: string;
    provider_id?: string;
    rating?: number;
    state?: State;
    /**
     * @description Indicates whether the fulfillment allows tracking
     * @default false
     */
    tracking?: boolean;
    customer?: {
        person?: Person;
        contact?: Contact;
    };
    agent?: Agent;
    person?: Person;
    contact?: Contact;
    vehicle?: Vehicle;
    /** @description Details on the start of fulfillment */
    start?: {
        location?: Location;
        time?: Time;
        instructions?: Descriptor;
        contact?: Contact;
        person?: Person;
        authorization?: Authorization;
    };
    /** @description Details on the end of fulfillment */
    end?: {
        location?: Location;
        time?: Time;
        instructions?: Descriptor;
        contact?: Contact;
        person?: Person;
        authorization?: Authorization;
    };
    rateable?: Rateable;
    tags?: Tags;
};

/** @description Describes a billing event */
export type Billing = {
    /** @description Personal details of the customer needed for billing. */
    name: string;
    organization?: Organization;
    address?: Address;
    /** Format: email */
    email?: string;
    phone: string;
    time?: Time;
    tax_number?: string;
    /** Format: date-time */
    created_at?: string;
    /** Format: date-time */
    updated_at?: string;
};

/** @description Describes the details of an order */
export type Order = {
    /** @description Hash of order object without id */
    id?: string;
    state?: string;
    provider?: {
        id?: string;
        locations?: {
            id: string;
        }[];
    };
    items?: {
        id: string;
        quantity?: ItemQuantitySub;
    }[];
    add_ons?: {
        id: string;
    }[];
    offers?: {
        id: string;
    }[];
    documents?: Document[];
    billing?: Billing;
    fulfillment?: Fulfillment;
    quote?: Quotation;
    payment?: Payment;
    /** Format: date-time */
    created_at?: string;
    /** Format: date-time */
    updated_at?: string;
};

export type Image = string;

export type Descriptor = {
    name?: string;
    code?: string;
    symbol?: string;
    short_desc?: string;
    long_desc?: string;
    images?: Image[];
    /** Format: uri */
    audio?: string;
    /** Format: uri */
    "3d_render"?: string;
};

/** @description Describes the price of an item. Allows for domain extension. */
export type Price = {
    /** @description ISO 4217 alphabetic currency code e.g. 'INR' */
    currency?: string;
    value?: string;
    estimated_value?: string;
    computed_value?: string;
    listed_value?: string;
    offered_value?: string;
    minimum_value?: string;
    maximum_value?: string;
};

export interface paths {
    "/search": {
        /** Search for services by intent */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer searches for products and services */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            intent?: Intent;
                        };
                    };
                };
            };
        };
    };
    "/select": {
        /** Select items from the catalog and build your order */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer selects one or more catalog items */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order: Order;
                        };
                    };
                };
            };
        };
    };
    "/init": {
        /** Initialize an order by providing billing and/or shipping details */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer initializes order checkout */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order: Order;
                        };
                    };
                };
            };
        };
    };
    "/confirm": {
        /** Initialize an order by providing billing and/or shipping details */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer confirms an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order: Order;
                        };
                    };
                };
            };
        };
    };
    "/status": {
        /** Fetch the latest order object */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer checks for status of order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order_id: string;
                        };
                    };
                };
            };
        };
    };
    "/track": {
        /** Track an active order */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer tracks fulfillment of an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order_id: string;
                            /** Format: uri */
                            callback_url?: string;
                        };
                    };
                };
            };
        };
    };
    "/cancel": {
        /** Cancel an order */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer cancels an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            order_id: string;
                            cancellation_reason_id?: string;
                            descriptor?: Descriptor;
                        };
                    };
                };
            };
        };
    };
    "/update": {
        /** Update an order */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer updates an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            /** @description Comma separated values of order objects being updated. For example: ```"update_target":"item,billing,fulfillment"``` */
                            update_target: string;
                            order: Order;
                        };
                    };
                };
            };
        };
    };
    "/rating": {
        /** Provide feedback on a service */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer rates for one or more rating categories */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: Rating;
                    };
                };
            };
        };
    };
    "/support": {
        /** Contact support */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Buyer searches for Support Contact details */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message: {
                            /** @description ID of the element for which support is needed */
                            ref_id?: string;
                        };
                    };
                };
            };
        };
    };
    "/on_search": {
        /** Send catalog */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message?: {
                                ack: Ack;
                            };
                            error?: Error;
                        } & {
                            context: unknown;
                        };
                    };
                };
            };
            /** Sellers provide their catalog in response to buyer search */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            catalog: Catalog;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_select": {
        /** Send draft order object with quoted price for selected items */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides quote for selected items */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: {
                                provider?: Provider;
                                provider_location?: Location;
                                items?: (Item & {
                                    quantity?: ItemQuantity;
                                })[];
                                add_ons?: AddOn[];
                                offers?: Offer[];
                                quote?: Quotation;
                            };
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_init": {
        /** Send order object with payment details updated */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides terms and conditions for an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: {
                                provider?: {
                                    id?: string;
                                };
                                provider_location?: {
                                    id?: string;
                                };
                                items?: {
                                    id?: string;
                                    quantity?: ItemQuantitySub;
                                }[];
                                add_ons?: {
                                    id?: string;
                                }[];
                                offers?: {
                                    id?: string;
                                }[];
                                billing?: Billing;
                                fulfillment?: Fulfillment;
                                quote?: Quotation;
                                payment?: Payment;
                            };
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_confirm": {
        /** Send active order object */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller confirms order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: Order;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_track": {
        /** Send tracking details of an active order */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides tracking details for an order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            tracking: Tracking;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_cancel": {
        /** Send cancellation request_id with reasons list in case of cancellation request. Else send cancelled order object */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides response to cancellation request */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: Order;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_update": {
        /** Returns updated service with updated runtime object */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides response to order update */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: Order;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_status": {
        /** Fetch the status of a Service */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides status information for order */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            order: Order;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_rating": {
        /** Provide feedback on a service */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides response to rating provided by buyer */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: RatingAck;
                        error?: Error;
                    };
                };
            };
        };
    };
    "/on_support": {
        /** Contact Support */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Seller provides Contact Support details */
            requestBody: {
                content: {
                    "application/json": {
                        context: Context;
                        message?: {
                            /** Format: phone */
                            phone?: string;
                            /** Format: email */
                            email?: string;
                            /** Format: uri */
                            uri?: string;
                        };
                        error?: Error;
                    };
                };
            };
        };
    };
    "/get_cancellation_reasons": {
        /** Get cancellation reasons from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Context header is sent as the request */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                    };
                };
            };
        };
    };
    "/cancellation_reasons": {
        /** Get cancellation reasons from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** List of cancellation reasons */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        message?: {
                            cancellation_reasons?: Option[];
                        };
                    };
                };
            };
        };
    };
    "/get_return_reasons": {
        /** Get return reasons from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Context header is sent as the request */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                    };
                };
            };
        };
    };
    "/return_reasons": {
        /** Get return reasons from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** List of return reasons */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        return_reasons?: Option[];
                    };
                };
            };
        };
    };
    "/get_rating_categories": {
        /** Get a list of categories that can be rated by the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Context header is sent as the request */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                    };
                };
            };
        };
    };
    "/rating_categories": {
        /** Get a list of categories that can be rated by the Buyer App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Array of categories which can be rated */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        rating_categories?: string[];
                    };
                };
            };
        };
    };
    "/get_feedback_categories": {
        /** Get a list of categories for which feedback can be given by the Buyer App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Context header is sent as the request */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                    };
                };
            };
        };
    };
    "/feedback_categories": {
        /** Get a list of categories for which feedback can be given by the Buyer App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Array of categories for which feedback can be given by the Buyer App */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        feedback_categories?: string[];
                    };
                };
            };
        };
    };
    "/get_feedback_form": {
        /** Request a feedback form from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** The rating value and category is sent by the Buyer App */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        message?: {
                            rating_value?: number;
                            rating_category?: string;
                        };
                    };
                };
            };
        };
    };
    "/feedback_form": {
        /** Get a feedback form from the Seller App */
        post: {
            responses: {
                /** Acknowledgement of message received */
                200: {
                    content: {
                        "application/json": {
                            message: {
                                ack: Ack;
                            };
                            error?: Error;
                        };
                    };
                };
            };
            /** Feedback form sent by the Buyer App */
            requestBody: {
                content: {
                    "application/json": {
                        context?: Context;
                        message?: Feedback;
                    };
                };
            };
        };
    };
}

/** @description Describes a tag. This is a simple key-value store which is used to contain extended metadata */
export type Tags = { [key: string]: string };

/** @description Describes a person. */
export type Person = {
    name?: string;
    image?: Image;
    /** Format: date */
    dob?: string;
    /** @description Gender of something, typically a Person, but possibly also fictional characters, animals, etc. While Male and Female may be used, text strings are also acceptable for people who do not identify as a binary gender */
    gender?: string;
    cred?: string;
    tags?: Tags;
};

export type Ack = {
    /** @description Describes the ACK response */
    /**
     * @description Describe the status of the ACK response. If schema validation passes, status is ACK else it is NACK
     * @enum {string}
     */
    status: "ACK" | "NACK";
};
export type AddOn = {
    /** @description Describes an add-on */
    /** @description ID of the add-on. This follows the syntax {item.id}/add-on/{add-on unique id} for item specific add-on OR */
    id?: string;
    descriptor?: Descriptor;
    price?: Price;
};
/** @description Describes an address */
export type Address = {
    /** @description Door / Shop number of the address */
    door?: string;
    /** @description Name of address if applicable. Example, shop name */
    name?: string;
    /** @description Name of the building or block */
    building?: string;
    /** @description Street name or number */
    street?: string;
    /** @description Name of the locality, apartments */
    locality?: string;
    /** @description Name or number of the ward if applicable */
    ward?: string;
    /** @description City name */
    city?: string;
    /** @description State name */
    state?: string;
    /** @description Country name */
    country?: string;
    /** @description Area code. This can be Pincode, ZIP code or any equivalent */
    area_code?: string;
};
/** @description Describes an order executor */
export type Agent = Person &
    Contact & {
        rateable?: Rateable;
    };
/** @description Describes an authorization mechanism */
export type Authorization = {
    /** @description Type of authorization mechanism used */
    type?: string;
    /** @description Token used for authorization */
    token?: string;
    /**
     * Format: date-time
     * @description Timestamp in RFC3339 format from which token is valid
     */
    valid_from?: string;
    /**
     * Format: date-time
     * @description Timestamp in RFC3339 format until which token is valid
     */
    valid_to?: string;
    /** @description Status of the token */
    status?: string;
};

/** @description Describes the ACK response */
export type Cancellation = {
    /** @enum {string} */
    type?: "full" | "partial";
    ref_id?: string;
    policies?: Policy[];
    /** Format: date-time */
    time?: string;
    cancelled_by?: string;
    reasons?: Option;
    selected_reason?: {
        id?: string;
    };
    additional_description?: Descriptor;
};
/** @description Describes a Seller App catalog */
export type Catalog = {
    "bpp/descriptor"?: Descriptor;
    "bpp/categories"?: Category[];
    "bpp/fulfillments"?: Fulfillment[];
    "bpp/payments"?: Payment[];
    "bpp/offers"?: Offer[];
    "bpp/providers"?: Provider[];
    /**
     * Format: date-time
     * @description Time after which catalog has to be refreshed
     */
    exp?: string;
};
/** @description Describes a category */
export type Category = {
    /** @description Unique id of the category */
    id?: string;
    parent_category_id?: string;
    descriptor?: Descriptor;
    time?: Time;
    tags?: Tags;
};
/** @description Describes a circular area on the map */
export type Circle = {
    gps: Gps;
    radius: Scalar;
};




/** @description Describes a decimal value */
export type DecimalValue = string;
/** @description Describes the description of a real-world object. */

/** @description Describes the dimensions of a real-world object */
export type Dimensions = {
    length?: Scalar;
    breadth?: Scalar;
    height?: Scalar;
};



/** @description Describes an error object */
export type Error = {
    /** @enum {string} */
    type:
    | "CONTEXT-ERROR"
    | "CORE-ERROR"
    | "DOMAIN-ERROR"
    | "POLICY-ERROR"
    | "JSON-SCHEMA-ERROR";
    /** @description ONDC specific error code. For full list of error codes, refer to docs/drafts/Error Codes.md of this repo */
    code: string;
    /** @description Path to json schema generating the error. Used only during json schema validation errors */
    path?: string;
    /** @description Human readable message describing the error */
    message?: string;
};
/** @description Feedback for a service */
export type Feedback = {
    feedback_form?: FeedbackForm;
    feedback_url?: FeedbackUrl;
};
/** @description Describes a feedback form that a Seller App can send to get feedback from the Buyer App */
export type FeedbackForm = FeedbackFormElement[];
/** @description An element in the feedback form. It can be question or an answer to the question. */
export type FeedbackFormElement = {
    id?: string;
    parent_id?: string;
    /** @description Specifies the question to which the answer options will be contained in the child FeedbackFormElements */
    question?: string;
    /** @description Specifies an answer option to which the question will be in the FeedbackFormElement specified in parent_id */
    answer?: string;
    /**
     * @description Specifies how the answer option should be rendered.
     * @enum {string}
     */
    answer_type?: "radio" | "checkbox" | "text";
};
/** @description Describes how a feedback URL will be sent by the Seller App */
export type FeedbackUrl = {
    /**
     * Format: uri
     * @description feedback URL sent by the Seller App
     */
    url?: string;
    /** @enum {string} */
    tl_method?: "http/get" | "http/post";
    params?: {
        /** @description This value will be placed in the the $feedback_id url param in case of http/get and in the requestBody http/post requests */
        feedback_id: string;
    } & { [key: string]: string };
};

/** @description Describes a gps coordinate */
export type Gps = string;
/** @description Intent of a user. Used for searching for services */
export type Intent = {
    descriptor?: Descriptor;
    provider?: Provider;
    fulfillment?: Fulfillment;
    payment?: Payment;
    category?: Category;
    offer?: Offer;
    item?: Item;
    tags?: Tags;
};

/** @description Describes a product or a service offered to the end consumer by the provider. */
export type Item = {
    /**
     * Format: #/components/schemas/Item/properties/id
     * @description This is the most unique identifier of a service item. An example of an Item ID could be the SKU of a product.
     */
    id?: string;
    parent_item_id?: string;
    descriptor?: Descriptor;
    price?: Price;
    category_id?: string;
    fulfillment_id?: string;
    rating?: number;
    location_id?: string;
    time?: Time;
    rateable?: Rateable;
    matched?: boolean;
    related?: boolean;
    recommended?: boolean;
    tags?: Tags;
};
/** @description indicates language code. ONDC supports language codes as per ISO 639.2 standard */
export type Language = {
    code?: string;
};
/** @description Describes the location of a runtime object. */
export type Location = {
    id?: string;
    descriptor?: Descriptor;
    gps?: Gps;
    address?: Address;
    station_code?: string;
    city?: City;
    country?: Country;
    circle?: Circle;
    polygon?: string;
    "3dspace"?: string;
    time?: Time;
};
/** @description Describes the name of a person in format: ./{given_name}/{honorific_prefix}/{first_name}/{middle_name}/{last_name}/{honorific_suffix} */
export type Name = string;
/** @description Describes an offer */
export type Offer = {
    id?: string;
    descriptor?: Descriptor;
    location_ids?: string[];
    category_ids?: string[];
    item_ids?: string[];
    time?: Time;
};
/** @description Describes the agent of a service */
export type Operator = Person & {
    experience?: {
        label?: string;
        value?: string;
        unit?: string;
    };
};
/** @description Describes a selectable option */
export type Option = {
    id?: string;
    descriptor?: Descriptor;
};


/** @description Describes a page in a search result */
export type Page = {
    id?: string;
    next_id?: string;
};
/** @description Describes a payment */
export type Payment = {
    /**
     * Format: uri
     * @description A payment uri to be called by the Buyer App. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If ```tl_method``` = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory. And example url would be : https://www.example.com/pay?txid=$transaction_id&amount=$amount&vpa=upiid&payee=shopez&billno=1234
     */
    uri?: string;
    /** @enum {string} */
    tl_method?: "http/get" | "http/post" | "payto" | "upi";
    params?: {
        /** @description This value will be placed in the the $transaction_id url param in case of http/get and in the requestBody http/post requests */
        transaction_id?: string;
        transaction_status?: string;
        amount?: string;
        currency: string;
    } & { [key: string]: string };
    /** @enum {string} */
    type?:
    | "ON-ORDER"
    | "PRE-FULFILLMENT"
    | "ON-FULFILLMENT"
    | "POST-FULFILLMENT";
    /** @enum {string} */
    status?: "PAID" | "NOT-PAID";
    time?: Time;
    /** @enum {string} */
    collected_by?: "BAP" | "BPP";
};

/** @description Describes a policy. Allows for domain extension. */
export type Policy = {
    id?: string;
    descriptor?: Descriptor;
    parent_policy_id?: string;
    time?: Time;
};
/** @description Describes a service provider. This can be a restaurant, a hospital, a Store etc */
export type Provider = {
    /** @description Id of the provider */
    id?: string;
    descriptor?: Descriptor;
    /** @description Category Id of the provider */
    category_id?: string;
    rating?: number;
    time?: Time;
    categories?: Category[];
    fulfillments?: Fulfillment[];
    payments?: Payment[];
    locations?: (Location & {
        rateable?: Rateable;
    })[];
    offers?: Offer[];
    items?: Item[];
    /**
     * Format: date-time
     * @description Time after which catalog has to be refreshed
     */
    exp?: string;
    rateable?: Rateable;
    tags?: Tags;
};
/** @description Describes a quote */
export type Quotation = {
    price?: Price;
    breakup?: {
        title?: string;
        price?: Price;
    }[];
    ttl?: Duration;
};
/** @description If the entity can be rated or not */
export type Rateable = boolean;
/** @description Describes the rating of a person or an object. */
export type Rating = {
    /** @description Category of the object being rated */
    rating_category?: string;
    /** @description Id of the object being rated */
    id?: string;
    /** @description Rating value given to the object */
    value?: number;
    feedback_form?: FeedbackForm;
    feedback_id?: string;
};
export type RatingAck = {
    /** @description If feedback has been recorded or not */
    feedback_ack?: boolean;
    /** @description If rating has been recorded or not */
    rating_ack?: boolean;
};



/** @description Any entity which wants to authenticate itself on a network. This can be a Buyer App, Seller App or Gateway. */
export type Subscriber = {
    /** @description Registered domain name of the subscriber. Must have a valid SSL certificate issued by a Certificate Authority of the operating region */
    subscriber_id?: string;
    /** @enum {string} */
    type?: "bap" | "bpp" | "bg";
    /** @description Callback URL of the subscriber. The Registry will call this URL's on_subscribe API to validate the subscriber\'s credentials */
    cb_url?: string;
    domain?: Domain;
    city?: string;
    country?: string;
    /** @description Signing Public key of the subscriber. <br/><br/>Any subscriber platform (Buyer App, Seller App, Gateway) who wants to transact on the network must digitally sign the ```requestBody``` using the corresponding private key of this public key and send it in the transport layer header. In case of ```HTTP``` it is the ```Authorization``` header. <br><br/>The ```Authorization``` will be used to validate the signature of a Buyer App or Seller App.<br/><br/>Furthermore, if an API call is being proxied or multicast by a ONDC Gateway, the Gateway must use it\'s signing key to digitally sign the ```requestBody``` using the corresponding private key of this public key and send it in the ```X-Gateway-Authorization``` header. */
    signing_public_key?: string;
    /** @description Encryption public key of the Buyer App. Any Seller App must encrypt the ```requestBody.message``` value of the ```on_search``` API using this public key. */
    encryption_public_key?: string;
    /** @enum {string} */
    status?:
    | "INITIATED"
    | "UNDER_SUBSCRIPTION"
    | "SUBSCRIBED"
    | "INVALID_SSL"
    | "UNSUBSCRIBED";
    /**
     * Format: date-time
     * @description Timestamp when a subscriber was added to the registry with status = INITIATED
     */
    created?: string;
    /** Format: date-time */
    updated?: string;
    /**
     * Format: date-time
     * @description Expiry timestamp in UTC derived from the ```lease_time``` of the subscriber
     */
    expires?: string;
};
/** @description Customer support */
export type Support = {
    /** @enum {string} */
    type?: "order" | "billing" | "fulfillment";
    ref_id?: string;
    channels?: Tags;
};

/** @description Describes tracking data object during live tracking of an order */
export type TrackingData = Gps;
/** @description Describes the tracking info of an object */
export type Tracking = {
    /** Format: uri */
    url?: string;
    /** @enum {string} */
    status?: "active" | "inactive";
};
/** @description Describes the properties of a vehicle used in a mobility service */
export type Vehicle = {
    category?: string;
    capacity?: number;
    make?: string;
    model?: string;
    size?: string;
    variant?: string;
    color?: string;
    energy_type?: string;
    registration?: string;
};
