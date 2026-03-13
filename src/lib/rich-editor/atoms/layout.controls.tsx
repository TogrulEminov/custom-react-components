import type {Editor} from "@tiptap/react";
import ToolbarButton from "./toolbar.tsx";
import {MdOutlineHorizontalRule} from "react-icons/md";
import {TbBlockquote} from "react-icons/tb";

interface Props {
    editor: Editor
}

export function HorizontalRuleButton({editor}: Props) {
    return (
        <ToolbarButton title={'Insert Horizontal Line'} isActive={false} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <MdOutlineHorizontalRule/>
        </ToolbarButton>
    );
}

export function BlockquoteButton({editor}: Props) {
    return (
        <ToolbarButton title={'Toggle blockquote'} isActive={false} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <TbBlockquote/>
        </ToolbarButton>
    );
}
