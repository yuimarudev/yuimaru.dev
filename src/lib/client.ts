export default (function () {
  return {
    get: async <T>(
      data?: T & { contentId?: string }
    ): Promise<If<T, Article, { contents: Article[] }>> => {
      return await fetch(
        `https://yuimaru.dev/api/articles/${data?.contentId ? data.contentId : "LIST"}`
      ).then(async (r) => await r.json());
    }
  };
})();

type If<C, T, F> = C extends true ? T : F;
