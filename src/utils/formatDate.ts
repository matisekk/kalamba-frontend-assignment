import moment from "moment";

export function formatArticleDate(iso: string): string {
    return moment(iso).format("MMMM Do");
}