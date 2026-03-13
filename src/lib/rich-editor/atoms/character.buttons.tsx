import type {Editor} from "@tiptap/react";
import {BiBold, BiItalic, BiStrikethrough, BiUnderline} from "react-icons/bi";
import ToolbarButton from "./toolbar.tsx";

interface BtnProps {
    editor: Editor
}


export function BoldButton({editor}: BtnProps) {
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
        >
            <BiBold size={20}/>
        </ToolbarButton>
    );
}

export function ItalicButton({editor}: BtnProps) {
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
        >
            <BiItalic size={20}/>
        </ToolbarButton>
    );
}

export function UnderlineButton({editor}: BtnProps) {
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
        >
            <BiUnderline size={20}/>
        </ToolbarButton>
    );
}

export function StrikeButton({editor}: BtnProps) {
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Strikethrough"
        >
            <BiStrikethrough size={20}/>
        </ToolbarButton>
    );
}
