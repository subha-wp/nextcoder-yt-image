"use server";

import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY,
});

interface sendPromtProps {
  prompt: string;
  image_size: string;
  num_images?: number;
}

export async function sendPromt(formData: sendPromtProps) {
  const { prompt, image_size, num_images } = formData;

  try {
    const result: any = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt,
        image_size,
        num_inference_steps: 4,
        num_images,
        enable_safety_checker: true,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    const res = result.images;
    return res;
  } catch (err) {}
}
