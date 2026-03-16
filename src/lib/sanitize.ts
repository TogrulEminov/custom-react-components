import sanitizeHtmlPackage from "sanitize-html";

export function sanitizeHtml(dirty?: string | undefined): string {
    // if (typeof window !== "undefined" ) return "";
    if (!dirty?.trim()) return "";

    return sanitizeHtmlPackage(dirty, {
        allowedTags: [
            "b",
            "i",
            "em",
            "strong",
            "a",
            "p",
            "br",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "iframe", "div",
            "blockquote",
        ],
        allowedAttributes: {
            a: ["href", "target", "rel"],
            img: ["src", "alt", "title", "width", "height"],
            iframe: ["src", "width", "height", "frameborder", "allowfullscreen", "allow"],
            div: ["data-youtube-video", "class"],
        },
        allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
        transformTags: {
            a: (tagName, attribs) => {
                // Ensure external links have proper attributes
                if (attribs.href?.startsWith("http")) {
                    return {
                        tagName: "a",
                        attribs: {
                            ...attribs,
                            target: "_blank",
                            rel: "noopener noreferrer",
                        },
                    };
                }
                return {tagName, attribs};
            },
        },
    });
}

export function clearPhoneRegex(phone: string) {
    if (!phone) {
        return "";
    }

    return phone.replace(/[^\d]/g, "");
}

export function stripHtmlTags(html: string): string {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
}
