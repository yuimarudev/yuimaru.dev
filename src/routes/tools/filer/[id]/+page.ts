import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
  const res = await fetch(
    "https://yuimaru.dev/api/tools/filer?id=" + encodeURIComponent(params.id as string)
  );
  const data = (await res.json()) as any;
  if (res.ok) {
    return {
      id: params.id,
      status: true,
      type: data.type,
      data: data.data
    };
  } else {
    return {
      id: params.id,
      status: false
    };
  }
};
