"use client"

import "@uploadthing/react/styles.css";

import Image from "next/image";
import { X } from "lucide-react";

import { UploadDropzone } from "@/utils/uploadthing";

interface FileUploadProps {
    endpoint: "serverImage" | "messageFile"
    value: string;
    onChange: (url?: string) => void;
};

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image 
                    alt="image-upload"
                    src={value}
                    fill
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="absolute bg-rose-500 text-white top-0 right-0 rounded-full p-1 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return ( 
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error, "FILE UPLOAD ERROR");
            }}
        />
    );
}