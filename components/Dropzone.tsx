"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileItem = { id: string; file: File; preview: string };

export default function Dropzone({ multiple = true }: { multiple?: boolean }) {
  const [files, setFiles] = useState<FileItem[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mapped = acceptedFiles.map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => (multiple ? [...prev, ...mapped] : mapped));
  }, [multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className="rounded-md border border-dashed p-6 text-center cursor-pointer hover:bg-muted/40 transition-colors"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop files here, or click to select files</p>
        )}
      </div>
      {files.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {files.map((f) => (
            <div key={f.id} className="aspect-video w-full rounded-md overflow-hidden border">
              <img src={f.preview} alt={f.file.name} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


