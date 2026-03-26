import type { Editor } from "@tiptap/react";
import { BiCode } from "react-icons/bi";
import ToolbarButton from "./toolbar.tsx";
import { useState } from "react";

interface BtnProps {
  editor: Editor;
}

// HTML → oxunaqlı source (hər tag ayrı sətirdə)
function htmlToSource(html: string): string {
  return html
    .replace(/></g, ">\n<")           // hər tag arasına yeni sətir
    .replace(/<\/p>/g, "</p>\n")      // </p> sonra boş sətir
    .replace(/<br\s*\/?>/g, "<br>\n") // <br> sonra yeni sətir
    .replace(/\n{3,}/g, "\n\n")       // 3+ boş sətiri 2-yə endir
    .trim();
}

// Source → editor üçün təmiz HTML
function sourceToHtml(source: string): string {
  return source
    .replace(/\n/g, "")   // bütün yeni sətirləri sil (editor öz strukturunu bilir)
    .trim();
}

export function CodeButton({ editor }: BtnProps) {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceEl, setSourceEl] = useState<HTMLTextAreaElement | null>(null);

  const toggleSource = () => {
    if (!isSourceMode) {
      const html = htmlToSource(editor.getHTML());
      setIsSourceMode(true);

      setTimeout(() => {
        const editorEl = document.querySelector(".ProseMirror")?.parentElement;
        if (!editorEl) return;

        const textarea = document.createElement("textarea");
        textarea.value = html;
        textarea.className =
          "w-full h-48 p-2 font-mono text-sm border border-gray-300 rounded bg-white resize-y";
        textarea.id = "html-source-view";
        editorEl.style.display = "none";
        editorEl.parentElement?.insertBefore(textarea, editorEl.nextSibling);
        setSourceEl(textarea);
      }, 0);
    } else {
      const html = sourceToHtml(sourceEl?.value ?? "");
      editor.commands.setContent(html);
      sourceEl?.remove();
      const editorEl = document.querySelector(".ProseMirror")?.parentElement;
      if (editorEl) editorEl.style.display = "";
      setIsSourceMode(false);
      setSourceEl(null);
    }
  };

  return (
    <ToolbarButton
      onClick={toggleSource}
      isActive={isSourceMode}
      title="HTML Source (Ctrl+Shift+H)"
    >
      <BiCode size={20} />
    </ToolbarButton>
  );
}