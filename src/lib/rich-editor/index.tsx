import {useEditor, EditorContent,} from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import "./style.css"
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import FontSize from "@tiptap/extension-text-style/font-size";
import {TextStyle} from '@tiptap/extension-text-style'
import Underline from "@tiptap/extension-underline";
import {BoldButton, ItalicButton, StrikeButton, UnderlineButton} from "./atoms/character.buttons.tsx";
import {NumberedList, UnorderedList} from "./atoms/list.button.tsx";
import FontSizeButton from "./atoms/font.button.tsx";
import HeadingButton from "./atoms/heading.button.tsx";
import Heading from "@tiptap/extension-heading";
import {BlockquoteButton, HorizontalRuleButton} from "./atoms/layout.controls.tsx";
import Blockquote from "@tiptap/extension-blockquote";
import Youtube from "@tiptap/extension-youtube";
import MediaControls from "./atoms/media.controls.tsx";
import Image from '@tiptap/extension-image'
import ImageUpload from "./atoms/image.upload.tsx";
import Link from "@tiptap/extension-link";
import LinkButton from "./atoms/link.button.tsx";
import {Markdown} from '@tiptap/markdown'
import React from "react";
import {sanitizeHtml} from "../sanitize.ts";

export default function RichEditor() {
    const [html, setHtml] = React.useState('');
    const editor = useEditor({
        extensions: [
            Markdown,
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                    HTMLAttributes: {
                        class: 'custom-bullet-list',
                    },
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                    HTMLAttributes: {
                        class: 'custom-ordered-list',
                    },
                },
            }),
            Youtube.configure({
                controls: true,
                modestBranding: true,
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: 'custom-heading',
                },
                levels: [1, 2, 3],
            }),
            Underline,
            FontSize, TextStyle,
            HorizontalRule,
            Blockquote,
            Image,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https', 'mailto', 'tel'],
                isAllowedUri: (url, ctx) => {
                    try {
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
                        const protocol = parsedUrl.protocol.replace(':', '');
                        if (protocol === 'mailto' || protocol === 'tel') {
                            return true;
                        }
                        if (url.startsWith('#')) {
                            return true;
                        }
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false;
                        }
                        const disallowedProtocols = ['ftp', 'file'];
                        if (disallowedProtocols.includes(protocol)) {
                            return false;
                        }
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme));
                        if (!allowedProtocols.includes(protocol)) {
                            return false;
                        }
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
                        if (disallowedDomains.includes(parsedUrl.hostname)) {
                            return false;
                        }
                        return true;
                    } catch {
                        return url.startsWith('#');
                    }
                },
                shouldAutoLink: url => {
                    try {
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
                        return !disallowedDomains.includes(parsedUrl.hostname);
                    } catch {
                        return false;
                    }
                },
            }),
        ],
        onUpdate: ({editor}) => {
            setHtml(editor.getHTML());
        },
        contentType: "markdown",
    });
    if (!editor) return null;

    return <div className={"grid grid-cols-2 items-stretch gap-4"}>

        <div
            className="max-w-full mx-auto w-full min-w-50 h-auto bg-gray-100 border border-gray-400 rounded-sm p-2">
            <div className="bg-gray-50 p-2">
                <div className={"flex items-center gap-2"}>
                    <div className={"flex w-fit items-center pr-2 mr-2 border-r border-gray-200"}>
                        <BoldButton editor={editor}/>
                        <ItalicButton editor={editor}/>
                        <UnderlineButton editor={editor}/>
                        <StrikeButton editor={editor}/>
                    </div>
                    <div className={"flex w-fit items-center pr-2 border-r border-gray-200"}>
                        <UnorderedList editor={editor}/>
                        <NumberedList editor={editor}/>
                    </div>

                    <div className={"flex w-fit items-center pr-2 border-r border-gray-200"}>
                        <FontSizeButton editor={editor}/>
                    </div>
                    <div className={"flex w-fit items-center pr-2 border-r border-gray-200"}>
                        <HeadingButton editor={editor}/>
                    </div>

                    <div className={"flex w-fit items-center pr-2 border-r border-gray-200"}>
                        <HorizontalRuleButton editor={editor}/>
                        <BlockquoteButton editor={editor}/>
                    </div>

                    <div className={"flex w-fit items-center pr-2 border-r border-gray-200"}>
                        <MediaControls editor={editor}/>
                        <ImageUpload editor={editor}/>
                        <LinkButton editor={editor}/>

                    </div>
                </div>
            </div>
            <EditorContent editor={editor}/>

        </div>

        <div className={"bg-white border h-100% border-gray-200 p-2"}
             dangerouslySetInnerHTML={{__html: sanitizeHtml(html)}}/>
    </div>;
}
