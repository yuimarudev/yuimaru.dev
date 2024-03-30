import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { article } from "~/lib/d1.server";
import { __throw } from "~/lib/utils";

export async function loader({ context, params }: LoaderFunctionArgs) {
  const data =
    (await article(context.cloudflare.env.D1, params.id ?? "none")) ??
    __throw(new Error("article not found"));

  return new ImageResponse(
    <div
      style={{
        fontSize: 50,
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "relative",
      }}
    >
      <h2
        style={{
          width: "100%",
          color: "white",
          fontSize: 60,
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {data.title}
      </h2>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          bottom: 0,
          paddingLeft: 30,
          paddingRight: 30,
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: 40,
          }}
        >
          {Intl.DateTimeFormat("ja-jp", {
            dateStyle: "long",
            timeStyle: "long",
          }).format(new Date(data.publishedDate))}
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: 40,
            }}
          >
            yuimaru のブログ
          </h2>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 600,
    },
  );
}
