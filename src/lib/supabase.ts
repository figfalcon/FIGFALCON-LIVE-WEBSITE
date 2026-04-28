import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. Check your .env.local file.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ─── Storage public URL helper ─────────────────────────────────────────────
export const getStorageUrl = (bucket: string, path: string): string =>
  `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;

// ─── Media bucket helpers ──────────────────────────────────────────────────
export const MEDIA_BUCKET = "media";

export const getVideoUrl = (filename: string) =>
  getStorageUrl(MEDIA_BUCKET, `videos/${filename}`);

export const getThumbnailUrl = (filename: string) =>
  getStorageUrl(MEDIA_BUCKET, `thumbnails/${filename}`);

// ─── Pre-built URLs for the 3 process videos ──────────────────────────────
export const PROCESS_VIDEOS = {
  step1: {
    src: getVideoUrl("step1-raw.mp4"),
    poster: getThumbnailUrl("step1-raw.jpg"),
    title: "Raw Recording",
    label: "Step 1 — You Record Once",
  },
  step2: {
    src: getVideoUrl("step2-clone.mp4"),
    poster: getThumbnailUrl("step2-clone.jpg"),
    title: "AI Clone Output",
    label: "Step 2 — We Build Your AI Clone",
  },
  step3: {
    src: getVideoUrl("step3-final.mp4"),
    poster: getThumbnailUrl("step3-final.jpg"),
    title: "Final Polished Reel",
    label: "Step 3 — Ready to Post",
  },
} as const;
