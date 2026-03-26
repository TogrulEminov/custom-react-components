import type { Editor } from "@tiptap/react";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { FiImage, FiUpload, FiLink } from "react-icons/fi";
import axios from "axios";
import ToolbarButton from "./toolbar.tsx";

interface Props {
  editor: Editor;
}

export default function ImageUpload({ editor }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("100%"); // Default ölçü
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/upload", formData);
      // Şəkli seçilmiş ölçü ilə əlavə edirik
      editor
        .chain()
        .focus()
        .setImage({
          src: data.url,
          width: Number(imageWidth),
        })
        .run();
      setIsOpen(false);
    } catch (err) {
      console.error("Yükləmə xətası:", err);
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  
  const handleLinkSubmit = useCallback(() => {
    if (imageUrl.trim()) {
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl.trim(),
          width: Number(imageWidth),
        })
        .run();
      setImageUrl("");
      setIsOpen(false);
    }
  }, [editor, imageUrl, imageWidth]);

  return (
    <div className="relative">
      <ToolbarButton
        isActive={isOpen}
        title="Şəkil əlavə et"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isLoading ? (
          <FiUpload size={18} className="animate-bounce" />
        ) : (
          <FiImage size={18} />
        )}
      </ToolbarButton>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 z-50 w-72 bg-white rounded-xl shadow-xl border border-slate-100 p-4">
            <p className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
              Şəkil Ayarları
            </p>

            {/* Ölçü Seçimi */}
            <div className="mb-4">
              <label className="text-xs text-slate-500 mb-1.5 block">
                Şəkil genişliyi:{" "}
                <span className="font-mono text-sky-500">{imageWidth}</span>
              </label>
              <div className="flex gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
                {["25%", "50%", "100%"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageWidth(size)}
                    className={`flex-1 py-1 text-[10px] font-medium rounded-md transition-all ${imageWidth === size ? "bg-white shadow-sm text-sky-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-50 my-3" />

            {/* Link Girişi */}
            <div className="relative mb-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL yapışdırın..."
                className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/40"
              />
              <button
                onClick={handleLinkSubmit}
                className="absolute right-2 top-1.5 p-1.5 text-sky-500"
              >
                <FiLink size={14} />
              </button>
            </div>

            <div className="relative flex items-center mb-3">
              <div className="grow border-t border-slate-100"></div>
              <span className="shrink mx-2 text-[10px] text-slate-300">
                VƏ YA
              </span>
              <div className="grow border-t border-slate-100"></div>
            </div>

            <button
              onClick={() => inputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 bg-sky-50 hover:bg-sky-100 text-sky-600 text-sm font-medium rounded-lg transition-all"
            >
              <FiUpload size={16} /> Kompüterdən
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </>
      )}
    </div>
  );
}
