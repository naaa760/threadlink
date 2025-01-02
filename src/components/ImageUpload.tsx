"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  endpoint: keyof OurFileRouter;
  value: string;
  onChangeUrl: string;
}

export default function ImageUpload({
  endpoint,
  value,
  onChangeUrl,
}: ImageUploadProps) {
  if (value) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative aspect-video w-full">
          <Image
            src={value}
            alt="Upload"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() =>
            window.dispatchEvent(new CustomEvent(onChangeUrl, { detail: "" }))
          }
        >
          <TrashIcon className="h-4 w-4 mr-2" />
          Remove Image
        </Button>
      </div>
    );
  }

  return (
    <UploadButton<OurFileRouter, "postImage">
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        window.dispatchEvent(
          new CustomEvent(onChangeUrl, { detail: res?.[0].url })
        );
      }}
      onUploadError={(error: Error) => {
        console.log(`ERROR! ${error.message}`);
      }}
      className="ut-button:w-full ut-button:bg-primary ut-button:text-primary-foreground"
    />
  );
}
