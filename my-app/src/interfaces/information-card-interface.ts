export interface InformationCardInterface{
    "info": Info[];
    "link":string;
}

export interface Info {
    "key": string;
    "value":string;
    "showKey":boolean;
    "variant": "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined;
}

export default InformationCardInterface;
