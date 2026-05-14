import { render, screen } from "@testing-library/react";

import AuthorAvatar from "./AuthorAvatar";

describe("AuthorAvatar", () => {
    it("uses an inline SVG placeholder when src is empty", () => {
        render(<AuthorAvatar src="" className="custom-avatar-class" alt="Author avatar" />);

        const img = screen.getByRole("img", { name: "Author avatar" });

        expect(img).toHaveAttribute("src", expect.stringContaining("data:image/svg+xml"));
        expect(img).toHaveClass("custom-avatar-class");
    });

    it("uses the provided src when it is a non-empty string", () => {
        render(
            <AuthorAvatar
                src="https://example.com/a.png"
                alt="Author avatar"
            />
        );

        const img = screen.getByRole("img", { name: "Author avatar" });

        expect(img).toHaveAttribute("src", "https://example.com/a.png");
    });
});