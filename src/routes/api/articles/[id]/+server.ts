async function apiRequest({
  apiKey,
  domain,
  endpoint,
  contentId
}: {
  apiKey: string;
  domain: string;
  endpoint: string;
  contentId?: string;
}): Promise<Object | string> {
  return await fetch(
    `https://${domain}.microcms.io/api/v1/${endpoint}${contentId ? "/" + contentId : ""}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey
      }
    }
  ).then(async (r) => await r.json());
}

export async function GET({ params, platform }: { params: Record<string, string>; platform: any }) {
  let isList = params.id === "LIST";

  let res = await apiRequest({
    apiKey: platform.env.MICROCMS_API_KEY,
    domain: platform.env.DOMAIN,
    endpoint: "articles",
    contentId: isList ? void 0 : params.id
  });

  return new Response(JSON.stringify(res), {
    status: res instanceof String ? 400 : 200,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
