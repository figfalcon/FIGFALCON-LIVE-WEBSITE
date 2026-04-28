// Auto-synced with Supabase project: tangxgmhvtbvixlvaawh
// Run `npx supabase gen types typescript` to regenerate after schema changes

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          cover_image: string | null;
          author: string;
          tags: string[] | null;
          published: boolean;
          published_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["blog_posts"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
      case_studies: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          client_name: string;
          client_type: string | null;
          excerpt: string | null;
          content: string | null;
          cover_image: string | null;
          results: Json | null;
          video_url: string | null;
          published: boolean;
          featured: boolean;
          published_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["case_studies"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["case_studies"]["Insert"]>;
      };
      process_videos: {
        Row: {
          id: string;
          created_at: string;
          step: number;
          title: string;
          label: string;
          video_filename: string;
          thumbnail_filename: string;
          active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["process_videos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["process_videos"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ─── Convenience row types ─────────────────────────────────────────────────
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type CaseStudy = Database["public"]["Tables"]["case_studies"]["Row"];
export type ProcessVideo = Database["public"]["Tables"]["process_videos"]["Row"];
