import ToolbarButton from "./toolbar.tsx";
import React from "react";
import {Modal} from "antd";
import type {Editor} from "@tiptap/react";
import {sanitizeHtml} from "../../sanitize.ts";
import {FaEye} from "react-icons/fa";

interface Props {
    editor: Editor,
    value?: string,
}

export default function PreviewBtn({editor, value}: Props) {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }
    const handleClose = () => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
    }


    if (!editor) return null;
    return (
        <>
            <ToolbarButton title={"Preview"} onClick={handleClick} isActive={isOpen}>
                <FaEye/>
            </ToolbarButton>
            {value?.trim() &&
                <Modal footer={[]} open={isOpen} onCancel={handleClose}>
                    <article dangerouslySetInnerHTML={{__html: sanitizeHtml(value)}}/>
                </Modal>
            }
        </>
    );
} 