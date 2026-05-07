"use client";

import { useState } from "react";

type BannerImageFieldProps = {
  name: string;
  label: string;
  helper: string;
  currentName?: string;
  defaultValue?: string | null;
};

export function BannerImageField({
  name,
  label,
  helper,
  currentName,
  defaultValue = "",
}: BannerImageFieldProps) {
  const [preview, setPreview] = useState(defaultValue ?? "");

  return (
    <label className="grid gap-3 rounded-2xl border border-borderSoft bg-white p-4">
      <div>
        <span className="block text-sm font-black text-primaryDark">{label}</span>
        <span className="mt-1 block text-xs font-semibold text-textSecondary">
          {helper}
        </span>
      </div>

      {currentName && (
        <input type="hidden" name={currentName} value={defaultValue ?? ""} />
      )}

      <input
        name={name}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="input cursor-pointer"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (!file) {
            setPreview(defaultValue ?? "");
            return;
          }

          setPreview(URL.createObjectURL(file));
        }}
      />

      <div className="overflow-hidden rounded-xl border border-borderSoft bg-surface">
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="flex h-40 items-center justify-center text-sm font-bold text-textSecondary">
            Preview de imagen
          </div>
        )}
      </div>
    </label>
  );
}
