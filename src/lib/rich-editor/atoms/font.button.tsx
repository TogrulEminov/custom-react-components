import {type Editor, useEditorState} from "@tiptap/react";
import {BiMinus, BiPlus} from "react-icons/bi";
import ToolbarButton from "./toolbar.tsx";

interface BtnProps {
    editor: Editor
}

export default function FontSizeButton({editor}: BtnProps) {
    const {fontSize} = useEditorState({
        editor,
        selector: (ctx) => ({
            fontSize: ctx.editor.getAttributes('textStyle').fontSize,
        }),
    });

    const currentSize = fontSize ? parseInt(fontSize) : 16;

    const decrease = () => {
        const raw = editor.getAttributes('textStyle').fontSize;
        const current = raw ? parseInt(raw) : 16;
        const newSize = Math.max(8, current - 1);
        editor.chain().focus().setFontSize(`${newSize}px`).run();
    };

    const increase = () => {
        const raw = editor.getAttributes('textStyle').fontSize;
        const current = raw ? parseInt(raw) : 16;
        const newSize = Math.min(96, current + 1);
        editor.chain().focus().setFontSize(`${newSize}px`).run();
    };

    return (
        <div className="flex items-center gap-1">
            <ToolbarButton onClick={decrease} isActive={false} title="Fontu Azalt">
                <BiMinus size={20}/>
            </ToolbarButton>

            <span
                className="flex items-center justify-center w-10 h-9 text-sm font-semibold text-slate-600 bg-slate-50 rounded-md border border-slate-200 select-none">
                {currentSize}
            </span>

            <ToolbarButton onClick={increase} isActive={false} title="Fontu Artır">
                <BiPlus size={20}/>
            </ToolbarButton>
        </div>
    );
}