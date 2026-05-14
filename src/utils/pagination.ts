export function getPageCount(total: number, pageSize: number) {
    return Math.max(1, Math.ceil(total / pageSize));
}

export function getCurrentPage(offset: number, pageSize: number) {
    return Math.floor(offset / pageSize) + 1;
}

export function getOffsetForPage(page: number, pageSize: number) {
    return (page - 1) * pageSize;
}

