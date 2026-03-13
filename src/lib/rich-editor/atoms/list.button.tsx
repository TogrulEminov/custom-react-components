import {type Editor} from "@tiptap/react";
import {GrOrderedList, GrUnorderedList} from "react-icons/gr";
import ToolbarButton from "./toolbar.tsx";

interface BtnProps {
    editor: Editor | null
}
export function UnorderedList({editor}: BtnProps) {
    if (!editor) return null;
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Bullet List"
        >
            <GrUnorderedList size={20}/>
        </ToolbarButton>
    );
}

export function NumberedList({editor}: BtnProps) {
    if (!editor) return null;
    return (
        <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Numbered List"
        >
            <GrOrderedList size={20}/>
        </ToolbarButton>
    );
}
