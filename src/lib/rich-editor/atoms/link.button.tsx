import {useCallback, useState, useRef, useEffect} from "react";
import type {Editor} from "@tiptap/react";
import ToolbarButton from "./toolbar.tsx";
import {FaLink, FaPhone, FaEnvelope, FaExternalLinkAlt, FaUnlink} from "react-icons/fa";
import {MdAnchor} from "react-icons/md";

interface Props {
    editor: Editor;
}

type LinkType = "url" | "email" | "phone" | "anchor";

const LINK_TYPES: {type: LinkType; label: string; icon: React.ReactNode; placeholder: string}[] = [
    {type: "url",    label: "Web",    icon: <FaExternalLinkAlt size={12}/>, placeholder: "https://example.com"},
    {type: "email",  label: "Email",  icon: <FaEnvelope size={12}/>,        placeholder: "info@example.com"},
    {type: "phone",  label: "Telefon",icon: <FaPhone size={12}/>,           placeholder: "+994501234567"},
    {type: "anchor", label: "Anchor", icon: <MdAnchor size={12}/>,          placeholder: "#section-id"},
];

const buildHref = (type: LinkType, value: string): string => {
    const v = value.trim();
    if (!v) return "";
    switch (type) {
        case "email":  return v.startsWith("mailto:") ? v : `mailto:${v}`;
        case "phone":  return v.startsWith("tel:")    ? v : `tel:${v}`;
        case "anchor": return v.startsWith("#")       ? v : `#${v}`;
        default:       return v.startsWith("http")    ? v : `https://${v}`;
    }
};

export default function LinkButton({editor}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [linkType, setLinkType] = useState<LinkType>("url");
    const [value, setValue] = useState("");
    const [openInNewTab, setOpenInNewTab] = useState(true);
    const panelRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Populate from existing link
    useEffect(() => {
        if (isOpen) {
            const attrs = editor.getAttributes('link');
            if (attrs.href) {
                const href: string = attrs.href;
                if (href.startsWith("mailto:")) {
                    setLinkType("email");
                    setValue(href.replace("mailto:", ""));
                } else if (href.startsWith("tel:")) {
                    setLinkType("phone");
                    setValue(href.replace("tel:", ""));
                } else if (href.startsWith("#")) {
                    setLinkType("anchor");
                    setValue(href);
                } else {
                    setLinkType("url");
                    setValue(href);
                }
                setOpenInNewTab(attrs.target === "_blank");
            } else {
                setValue("");
                setLinkType("url");
                setOpenInNewTab(true);
            }
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen, editor]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen]);

    const applyLink = useCallback(() => {
        const href = buildHref(linkType, value);
        if (!href) return;

        const isExternal = linkType === "url";

        editor.chain().focus().extendMarkRange('link').setLink({
            href,
            target: (isExternal && openInNewTab) ? "_blank" : null,
            rel: isExternal ? "noopener noreferrer" : null,
        }).run();

        setIsOpen(false);
        setValue("");
    }, [editor, linkType, value, openInNewTab]);

    const removeLink = useCallback(() => {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        setIsOpen(false);
    }, [editor]);

    const currentType = LINK_TYPES.find(t => t.type === linkType)!;

    return (
        <div className="relative" ref={panelRef}>
            <ToolbarButton
                title="Link (Ctrl+K)"
                onClick={() => setIsOpen(prev => !prev)}
                isActive={editor.isActive('link') || isOpen}
            >
                <FaLink size={15}/>
            </ToolbarButton>

            {isOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">

                    {/* Type tabs */}
                    <div className="flex gap-1 mb-3 p-1 bg-slate-100 rounded-lg">
                        {LINK_TYPES.map(({type, label, icon}) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => { setLinkType(type); setValue(""); }}
                                className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer
                                    ${linkType === type
                                    ? 'bg-white text-sky-700 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {icon}
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="mb-3">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                            {currentType.label}
                        </label>
                        <input
                            ref={inputRef}
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyLink()}
                            placeholder={currentType.placeholder}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300/40 focus:border-sky-400 transition-all"
                        />
                    </div>

                    {/* New tab toggle - only for url */}
                    {linkType === "url" && (
                        <label className="flex items-center gap-2 mb-4 cursor-pointer select-none">
                            <div
                                onClick={() => setOpenInNewTab(p => !p)}
                                className={`w-8 h-4 rounded-full transition-colors duration-200 flex items-center px-0.5
                                    ${openInNewTab ? 'bg-sky-400' : 'bg-slate-200'}`}
                            >
                                <div className={`w-3 h-3 bg-white rounded-full shadow transition-transform duration-200
                                    ${openInNewTab ? 'translate-x-4' : 'translate-x-0'}`}
                                />
                            </div>
                            <span className="text-xs text-slate-500">Yeni tabda aç</span>
                            <span className="ml-auto text-xs text-slate-400">rel="noopener noreferrer"</span>
                        </label>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={applyLink}
                            disabled={!value.trim()}
                            className="flex-1 py-2 px-4 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer text-white text-sm font-medium rounded-lg transition-all"
                        >
                            Tətbiq et
                        </button>

                        {editor.isActive('link') && (
                            <button
                                type="button"
                                onClick={removeLink}
                                className="cursor-pointer py-2 px-3 text-rose-400 hover:bg-rose-50 hover:text-rose-600 text-sm font-medium rounded-lg transition-all"
                                title="Linki sil"
                            >
                                <FaUnlink size={14}/>
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer py-2 px-4 text-slate-500 hover:bg-slate-100 text-sm font-medium rounded-lg transition-all"
                        >
                            Ləğv et
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}