"use client";

import React, { useState, useTransition } from "react";
import { sendPromt } from "../actions/serverActions";
import Image from "next/image";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      return;
    }
    const formData = {
      prompt,
      image_size: "portrait_4_3",
      num_images: 2,
    };
    startTransition(async () => {
      try {
        const res = await sendPromt(formData);
        if (!res || res.length === 0) {
          throw new Error("Image not coming from server");
        }
        setImageUrls(res);
      } catch (err) {
        console.error(err);
        setError("Failed to generate Images");
      }
    });
  };

  return (
    <>
      <div className="flex">
        <input
          className="w-full p-1 border rounded-md outline-none rounded-r-none"
          placeholder="What do you want to create?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className={`bg-black text-white ${
            isPending ? "cursor-not-allowed opacity-50" : ""
          } rounded-l-none w-36`}
          disabled={isPending}
        >
          {isPending ? "Generating..." : "Generate Image"}
        </button>
      </div>
      <div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {isPending && <p>Loading...</p>}
        <div className="grid grid-cols-4 gap-2 mt-5">
          {imageUrls.length > 0 && (
            <>
              {imageUrls.map((image: any, idx) => (
                <div key={idx} className="mt-4">
                  <Image
                    src={image.url}
                    width={500}
                    height={500}
                    className="rounded-md shadow-md"
                    alt={`Generated image ${idx + 1}`}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
