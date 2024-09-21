import Image from "next/image";
import ImageGenerator from "./components/ImageGenerator";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <p>Image Generator</p>

      <ImageGenerator />
    </div>
  );
}
