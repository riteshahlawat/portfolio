import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import type { CSSProperties } from "react";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkSuperSub from "remark-supersub";
import Link from "next/link";
import ExpandableImage from "./expandable-image";
import { isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

// Code palette from the site's own tokens, not an imported editor theme.
const stacksCode: Record<string, CSSProperties> = {
    'pre[class*="language-"]': {
        background: "#141416",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: "8px",
        padding: "18px 20px",
        margin: "22px 0 0",
        overflowX: "auto",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "13px",
        lineHeight: "1.7",
        color: "#c6c3bb",
    },
    'code[class*="language-"]': {
        fontFamily: "var(--font-mono), monospace",
        color: "#c6c3bb",
    },
    comment: { color: "#57544e", fontStyle: "italic" },
    prolog: { color: "#57544e" },
    doctype: { color: "#57544e" },
    cdata: { color: "#57544e" },
    punctuation: { color: "#7a7770" },
    property: { color: "#a89bff" },
    tag: { color: "#a89bff" },
    boolean: { color: "#c9a55e" },
    number: { color: "#c9a55e" },
    constant: { color: "#c9a55e" },
    symbol: { color: "#c9a55e" },
    selector: { color: "#c4b5fd" },
    "attr-name": { color: "#c4b5fd" },
    string: { color: "#c9a55e" },
    char: { color: "#c9a55e" },
    builtin: { color: "#c4b5fd" },
    operator: { color: "#7a7770" },
    entity: { color: "#c4b5fd" },
    url: { color: "#8b7cf8" },
    variable: { color: "#e8e5dd" },
    atrule: { color: "#8b7cf8" },
    "attr-value": { color: "#c9a55e" },
    keyword: { color: "#8b7cf8" },
    function: { color: "#c4b5fd" },
    "class-name": { color: "#e8c87a" },
    regex: { color: "#c9a55e" },
    important: { color: "#e8c87a" },
};

function reactNodeToText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(reactNodeToText).join("");
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
        return reactNodeToText(node.props.children);
    }
    return "";
}

type PostMarkdownProps = {
    content: string;
    dropCap?: boolean;
    quoteAccent?: "purple" | "gold";
};

export default function PostMarkdown({
    content,
    dropCap = true,
    quoteAccent = "purple",
}: PostMarkdownProps) {
    const quoteBorder =
        quoteAccent === "gold"
            ? "rgba(201,165,94,.5)"
            : "rgba(139,124,248,.5)";

    return (
        <div
            className={cn(
                "post-body font-book text-[17.5px] leading-[1.75] text-[#c6c3bb]",
                dropCap && "post-dropcap",
            )}
        >
            <ReactMarkdown
                remarkPlugins={[
                    remarkGfm,
                    [remarkEmoji, { emoticon: false }],
                    remarkSuperSub,
                ]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="mt-11 mb-3 font-serif text-[26px] leading-[1.3] font-normal text-[#f2efe8] italic first:mt-0">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="mt-9 mb-[10px] font-mono text-[17px] font-medium lowercase tracking-[.04em] text-[#8b7cf8] first:mt-0">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="mt-8 mb-2 font-serif text-[20px] leading-[1.35] font-normal text-[#e8e5dd] italic">
                            {children}
                        </h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="mt-7 mb-[6px] font-mono text-[15px] font-normal lowercase tracking-[.05em] text-[#a5a29a]">
                            {children}
                        </h4>
                    ),
                    h5: ({ children }) => (
                        <h5 className="mt-6 mb-1 text-[15.5px] font-semibold text-[#e8e5dd]">
                            {children}
                        </h5>
                    ),
                    h6: ({ children }) => (
                        <h6 className="mt-6 mb-1 font-mono text-[12.5px] font-medium tracking-[.14em] text-[#7a7770] uppercase">
                            {children}
                        </h6>
                    ),
                    p: ({ children }) => (
                        <p className="mt-[22px] mb-0 [text-wrap:pretty] first:mt-0">
                            {children}
                        </p>
                    ),
                    em: ({ children }) => <em>{children}</em>,
                    strong: ({ children }) => (
                        <strong className="font-semibold text-[#e8e5dd]">
                            {children}
                        </strong>
                    ),
                    blockquote: ({ children }) => {
                        const text = reactNodeToText(children);
                        const isBerserk = text
                            .toLowerCase()
                            .includes("berserk");
                        return (
                            <blockquote
                                className={cn(
                                    "my-[18px] border-l-2 py-1 pr-0 pl-[22px] font-serif font-normal text-[#d6d3cd] italic",
                                    isBerserk
                                        ? "text-[20px] leading-[1.6]"
                                        : "text-[18px] leading-[1.65]",
                                )}
                                style={{
                                    borderColor: isBerserk
                                        ? "#8b7cf8"
                                        : quoteBorder,
                                }}
                            >
                                {children}
                            </blockquote>
                        );
                    },
                    a: ({ href = "", children }) => {
                        if (href === "/el-dorado") {
                            return (
                                <Link
                                    href={href}
                                    title="?"
                                    className="eldorado-link no-underline"
                                >
                                    {children}
                                </Link>
                            );
                        }
                        if (href === "/here") {
                            return (
                                <Link
                                    href={href}
                                    title="?"
                                    className="border-b border-dashed border-[rgba(139,124,248,.5)] text-[#d6d3cd] no-underline"
                                >
                                    {children}
                                </Link>
                            );
                        }
                        return (
                            <Link
                                href={href}
                                target={
                                    href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                className="text-[#8b7cf8] transition-colors duration-200 hover:text-[#a89bff]"
                            >
                                {children}
                            </Link>
                        );
                    },
                    img: ({ src, alt }) =>
                        typeof src === "string" ? (
                            <span className="my-6 block max-w-[560px]">
                                <ExpandableImage
                                    src={src}
                                    alt={alt ?? "post image"}
                                    width={920}
                                    height={640}
                                    className="block h-auto w-full rounded-[8px]"
                                />
                            </span>
                        ) : null,
                    code: ({ className, children, ...rest }) => {
                        const languages = /language-(\w+)/.exec(
                            className ?? "",
                        );
                        const language = languages ? languages[1] : null;

                        return language ? (
                            <SyntaxHighlighter
                                style={stacksCode}
                                language={language}
                                PreTag="div"
                                wrapLines={false}
                                useInlineStyles={true}
                            >
                                {children as string}
                            </SyntaxHighlighter>
                        ) : (
                            <code
                                className="rounded-[4px] bg-[#1c1c1f] px-[6px] py-[2px] font-mono text-[13px] text-[#c4b5fd] before:content-none after:content-none"
                                {...rest}
                            >
                                {children}
                            </code>
                        );
                    },
                    ul: ({ children }) => (
                        <ul className="mt-[22px] mb-0 flex list-none flex-col gap-[10px] pl-1 [&>li]:before:mr-2 [&>li]:before:text-[#57544e] [&>li]:before:content-['—']">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="mt-[22px] mb-0 ml-5 list-decimal marker:text-[#57544e]">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-[1.7]">{children}</li>
                    ),
                    hr: () => (
                        <hr className="my-8 border-[rgba(255,255,255,.07)]" />
                    ),
                    table: ({ children }) => (
                        <div className="mt-[22px] overflow-x-auto">
                            <table className="w-full border-collapse text-[14px]">
                                {children}
                            </table>
                        </div>
                    ),
                    th: ({ children }) => (
                        <th className="border-b border-[rgba(255,255,255,.14)] px-3 py-2 text-left font-mono text-[11px] font-medium tracking-[.08em] text-[#7a7770] uppercase">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border-b border-[rgba(255,255,255,.06)] px-3 py-2 align-top">
                            {children}
                        </td>
                    ),
                    sup: ({ children }) => (
                        <sup className="ml-[1px] font-mono text-[11px] [&_a]:text-[#8b7cf8] [&_a]:no-underline hover:[&_a]:text-[#a89bff]">
                            {children}
                        </sup>
                    ),
                    section: (props) => {
                        // GFM footnotes: restyle as end-notes, drop the
                        // default "Footnotes" heading and back-arrows.
                        if ("data-footnotes" in props) {
                            return (
                                <section className="mt-12 border-t border-[rgba(255,255,255,.07)] pt-5 [&_.sr-only]:hidden [&_a[data-footnote-backref]]:hidden [&_li]:mt-1 [&_li::marker]:text-[#57544e] [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_p]:font-mono [&_p]:text-[12px] [&_p]:leading-[1.7] [&_p]:text-[#7a7770]">
                                    <p className="m-0 mb-3 font-mono text-[10px] tracking-[.2em] text-[#57544e]">
                                        NOTES
                                    </p>
                                    {props.children}
                                </section>
                            );
                        }
                        return <section>{props.children}</section>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
