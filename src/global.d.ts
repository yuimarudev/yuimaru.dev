type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
};

/// <reference types="@sveltejs/adapter-cloudflare" />
declare namespace App {
  interface Platform {
    env: {
      KV: KVNamespace;
      filer: R2Bucket
    };
  }
}
