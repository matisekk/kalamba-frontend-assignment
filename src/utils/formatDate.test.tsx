import { formatArticleDate } from "./formatDate";

describe("formatArticleDate", () => {
    it("formats article date as month and ordinal day", () => {
        expect(formatArticleDate("2026-05-10T12:00:00.000Z")).toBe("May 10th");
    });
});