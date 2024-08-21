import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import Image from "next/image";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import remarkSuperSub from "remark-supersub";

import { cn, headerTextToId } from "@/lib/utils";
import Link from "next/link";
import BlogHeading from "./blog/blog-heading";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[
                remarkGfm,
                [remarkEmoji, { emoticon: false }],
                remarkSuperSub,
            ]}
            components={{
                img: ({ node: _node, src, alt, ...props }) => {
                    if (typeof src === "string") {
                        return (
                            <Image
                                className="mx-auto my-4"
                                alt={alt ?? "markdown image"}
                                {...props}
                                width={920}
                                height={640}
                                src={src}
                            />
                        );
                    } else {
                        return null;
                    }
                },
                code: ({ className, children, ...rest }) => {
                    const languages = /language-(\w+)/.exec(className ?? "");
                    const language = languages ? languages[1] : null;

                    return language ? (
                        <SyntaxHighlighter
                            style={oneDark}
                            language={language}
                            PreTag="div"
                            wrapLines={false}
                            useInlineStyles={true}
                        >
                            {children as string}
                        </SyntaxHighlighter>
                    ) : (
                        <code
                            className="rounded bg-zinc-850 px-1.5 py-1 text-zinc-50 before:content-[''] after:content-none"
                            {...rest}
                        >
                            {children}
                        </code>
                    );
                },
                h1: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );
                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h1
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mb-4 text-3xl font-bold text-zinc-50",
                                )}
                                {...rest}
                            >
                                {children}
                            </h1>
                        </BlogHeading>
                    );
                },

                h2: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );

                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h2
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mb-4 text-2xl font-bold text-zinc-50",
                                )}
                                {...rest}
                            >
                                {children}
                            </h2>
                        </BlogHeading>
                    );
                },
                h3: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );
                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h3
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mt-4 text-xl font-bold text-zinc-50 first:mt-0",
                                )}
                                {...rest}
                            >
                                {children}
                            </h3>
                        </BlogHeading>
                    );
                },
                h4: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );
                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h4
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mb-3 text-lg font-bold text-zinc-50",
                                )}
                                {...rest}
                            >
                                {children}
                            </h4>
                        </BlogHeading>
                    );
                },
                h5: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );
                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h5
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mb-3 font-bold text-zinc-50",
                                )}
                                {...rest}
                            >
                                {children}
                            </h5>
                        </BlogHeading>
                    );
                },
                h6: ({ children, className, ...rest }) => {
                    const headerComponentId = headerTextToId(
                        children?.toString(),
                    );
                    return (
                        <BlogHeading headerComponentId={headerComponentId}>
                            <h6
                                id={headerComponentId}
                                className={cn(
                                    className,
                                    "mb-2 font-bold text-zinc-50",
                                )}
                                {...rest}
                            >
                                {children}
                            </h6>
                        </BlogHeading>
                    );
                },
                hr: ({ className, ...rest }) => {
                    return (
                        <hr
                            className={cn(
                                className,
                                " mt-1 border-zinc-700 py-2",
                            )}
                            {...rest}
                        />
                    );
                },
                a: ({ href, className, children, ...rest }) => {
                    return (
                        <Link
                            href={href ?? ""}
                            target={
                                href?.startsWith("http") ? "_blank" : undefined
                            }
                            className={cn(
                                className,
                                "text-purple-600 transition-colors duration-200 hover:text-purple-400",
                            )}
                            {...rest}
                        >
                            {children}
                        </Link>
                    );
                },
                li: (props) => {
                    const { children, className, ...rest } = props;
                    return (
                        <li className={cn(className, "ml-4")} {...rest}>
                            {children}
                        </li>
                    );
                },
                ol: ({ children, className, ...rest }) => {
                    return (
                        <ol
                            className={cn(
                                className,
                                "mb-6 ml-5 mt-2 list-decimal [&>*]:ml-8",
                            )}
                            {...rest}
                        >
                            {children}
                        </ol>
                    );
                },
                ul: ({ children, className, ...rest }) => {
                    return (
                        <ul
                            className={cn(
                                className,
                                "mb-6 ml-5 mt-2 list-none [&>*]:before:mr-1 [&>*]:before:content-['-'] ",
                            )}
                            {...rest}
                        >
                            {children}
                        </ul>
                    );
                },
                blockquote: ({ children, className, ...rest }) => {
                    return (
                        <blockquote
                            className={cn(
                                className,
                                "my-4 border-s-4 border-zinc-600 bg-zinc-850 p-4",
                            )}
                            {...rest}
                        >
                            {children}
                        </blockquote>
                    );
                },
                p: ({ children, className, ...rest }) => {
                    return (
                        <p className={cn(className, "my-5")} {...rest}>
                            {children}
                        </p>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
