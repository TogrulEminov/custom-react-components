import type {Editor} from "@tiptap/react";
import type {ChangeEvent} from "react";
import {useRef, useState} from "react";
import {FiImage, FiUpload} from "react-icons/fi";
import axios from "axios";
import ToolbarButton from "./toolbar.tsx";

interface Props {
    editor: Editor;
}

export default function ImageUpload({editor}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setIsLoading(true);
            const {data} = await axios.post("/api/upload", formData);
            editor.chain().focus().setImage({src: data.url}).run();
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setIsLoading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
            />
            <ToolbarButton
                isActive={false}
                title="Şəkil yüklə"
                onClick={() => inputRef.current?.click()}
            >
                {isLoading ? <FiUpload size={18} className="animate-bounce"/> : <FiImage size={18}/>}
            </ToolbarButton>
        </>
    );
}