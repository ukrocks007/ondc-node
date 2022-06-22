import { Router, RouterOptions, Request, Response, NextFunction } from "express";

const apis = [
    "search",
    "select",
    "init",
    "confirm",
    "status",
    "track",
    "cancel",
    "update",
    "rating",
    "support",
    "on_search",
    "on_select",
    "on_init",
    "on_confirm",
    "on_track",
    "on_cancel",
    "on_update",
    "on_status",
    "on_rating",
    "on_support",
    "get_cancellation_reasons",
    "cancellation_reasons",
    "get_return_reasons",
    "return_reasons",
    "get_rating_categories",
    "rating_categories",
    "get_feedback_categories",
    "feedback_categories",
    "get_feedback_form",
    "feedback_form"
];

function defaultHandler(path: string) {
    return (req: Request, res: Response, next: NextFunction): void => {
        console.log(`Received Reuqest for /${path}`);
        res.status(200).send();
        next();
    };
}

export default function (handlers: any = {}, routerOptions?: RouterOptions): Router {
    const router = Router(routerOptions);
    apis.map(path => { router.post(`/${path}`, handlers[path] || defaultHandler(path)) });
    return router;
}