import Image from "next/image";
import thumbnail from "../../public/assets/image.webp"

export default async function Home() {
  return (
    <div className="bg-slate-300 dark:bg-slate-800">

      <section className="flex justify-center w-full min-h-screen mx-auto ">

        <div className="flex flex-col items-center pt-24 space-y-8">

          <Image alt="Thumbnail" width={350} height={300} src={thumbnail} className="object-cover rounded-md" />

          <h1 className="max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-center">
            The platform that allows you to get easy feedback on your thumbnails by the community
          </h1>

          <p className="max-w-2xl text-xl font-bold leading-tight text-center">
            Upload your thumbnails variations and send links to your friends to help you hone in your design skills.
          </p>

        </div>

      </section>

    </div>
  );
}
