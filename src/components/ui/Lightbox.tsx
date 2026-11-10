"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type LightboxProps = {
  src: string;
  alt: string;
  children: React.ReactNode;
};

export function Lightbox({ src, alt, children }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Agrandir l'image : ${alt}`}
        className="absolute inset-0 cursor-zoom-in"
      >
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClose={() => setIsOpen(false)}
        onClick={() => dialogRef.current?.close()}
        className="m-0 size-full max-h-none max-w-none cursor-zoom-out bg-ink/95 p-4 text-star"
      >
        {isOpen && (
          <div className="relative size-full">
            <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        )}
        <button
          type="button"
          aria-label="Fermer"
          className="absolute top-4 right-4 rounded-full bg-raised p-2"
        >
          <X aria-hidden />
        </button>
      </dialog>
    </>
  );
}
