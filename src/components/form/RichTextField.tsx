"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Heading2, ImagePlus, Italic, Link as LinkIcon, List, Loader2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Video } from "./tiptapVideoExtension";

type UploadedMedia = { url: string; type: "image" | "video" };

interface RichTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  onUploadMedia?: (file: File) => Promise<UploadedMedia>;
}

function InsertMediaButton({
  editor,
  onUploadMedia,
}: {
  editor: Editor | null;
  onUploadMedia: (file: File) => Promise<UploadedMedia>;
}) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      const { url, type } = await onUploadMedia(file);
      if (type === "video") {
        editor.chain().focus().setVideo({ src: url }).run();
      } else {
        editor.chain().focus().setImage({ src: url }).run();
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      type="button"
      title={t("news.insertMedia")}
      disabled={isUploading}
      className="size-8 rounded-lg flex items-center justify-center transition-colors text-muted-foreground hover:bg-muted disabled:opacity-50"
      onClick={() => inputRef.current?.click()}
    >
      {isUploading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <ImagePlus className="size-4" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </button>
  );
}

function Toolbar({
  editor,
  onUploadMedia,
}: {
  editor: Editor | null;
  onUploadMedia?: (file: File) => Promise<UploadedMedia>;
}) {
  if (!editor) return null;

  const buttonClass = (active: boolean) =>
    cn(
      "size-8 rounded-lg flex items-center justify-center transition-colors",
      active ? "bg-brand-gold/15 text-brand-gold" : "text-muted-foreground hover:bg-muted"
    );

  return (
    <div className="flex items-center gap-1 border-b border-border/60 bg-muted/5 px-2 py-1.5 rounded-t-xl">
      <button
        type="button"
        className={buttonClass(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </button>
      <button
        type="button"
        className={buttonClass(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </button>
      <button
        type="button"
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-4" />
      </button>
      <button
        type="button"
        className={buttonClass(editor.isActive("bulletList"))}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </button>
      <button
        type="button"
        className={buttonClass(editor.isActive("link"))}
        onClick={() => {
          const url = window.prompt("URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
      >
        <LinkIcon className="size-4" />
      </button>
      {onUploadMedia && <InsertMediaButton editor={editor} onUploadMedia={onUploadMedia} />}
    </div>
  );
}

export function RichTextField<T extends FieldValues>({
  control,
  name,
  label,
  className,
  onUploadMedia,
}: RichTextFieldProps<T>) {
  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <RichTextFieldInner
          value={field.value ?? ""}
          onChange={field.onChange}
          label={label}
          error={fieldState.error?.message}
          className={className}
          onUploadMedia={onUploadMedia}
          t={t}
        />
      )}
    />
  );
}

function RichTextFieldInner({
  value,
  onChange,
  label,
  error,
  className,
  onUploadMedia,
  t,
}: {
  value: string;
  onChange: (html: string) => void;
  label: string;
  error?: string;
  className?: string;
  onUploadMedia?: (file: File) => Promise<UploadedMedia>;
  t: (key: string) => string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4" } }),
      Video,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[220px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // useEditor only uses `content` for the initial mount — when `value` changes
  // externally (e.g. react-hook-form's reset() after an async edit-mode load
  // finishes after the editor already mounted), the editor doesn't pick it up
  // on its own, so we push it in manually here.
  useEffect(() => {
    if (!editor) return;
    if (value === editor.getHTML()) return;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [value, editor]);

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-bold text-foreground/80 tracking-tight">{label}</Label>
      <div className="rounded-xl border border-border/60 bg-muted/5 overflow-hidden">
        <Toolbar editor={editor} onUploadMedia={onUploadMedia} />
        {editor && <EditorContent editor={editor} />}
      </div>
      {error && <p className="text-xs text-red-600">{t(error)}</p>}
    </div>
  );
}
