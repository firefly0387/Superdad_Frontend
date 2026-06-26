import { Play } from "lucide-react";
import { useEffect, useState } from "react";

type InstagramPost = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: string;
};

export default function InstagramSection() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    console.log(
      "Instagram Token:",
      import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN,
    );
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_url,thumbnail_url,permalink,media_type&access_token=${import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN}`,
        );

        const data = await response.json();

        if (data.data) {
          setPosts(data.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch Instagram posts", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (!posts.length) return null;

  return (
    <section className="w-full bg-[#f5e7db] py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm tracking-[0.28em] uppercase text-[#b28f7b] font-medium mb-3">
            Follow our journey
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold text-[#2f2a27] tracking-tight">
            Let&apos;s Connect on Instagram
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-[1.35rem] bg-white shadow-sm"
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={post.thumbnail_url || post.media_url}
                  alt="Instagram post"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />

              {(post.media_type === "VIDEO" ||
                post.media_type === "CAROUSEL_ALBUM") && (
                <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <Play className="w-4 h-4 fill-current text-[#2f2a27] ml-0.5" />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
