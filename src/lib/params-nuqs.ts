import { parseAsInteger , parseAsString } from "nuqs/server";
import { pagination } from "./constants";


export const workFlowParams = {
    page : parseAsInteger.withDefault(pagination.DEFAULT_PAGE).withOptions({clearOnDefault : true}),
    search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
    pageSize : parseAsInteger.withDefault(pagination.DEFAULT_PAGE_SIZE).withOptions({clearOnDefault : true}),
}