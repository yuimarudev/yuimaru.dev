import format from "$lib/format";

const template = `<?xml version="1.0" encoding="UTF-8"?><svg width="224px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect id="Rectangle" x="0" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="7" y="22">0</tspan></text><rect id="Rectangle" x="32" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="39" y="22">{0}</tspan></text><rect id="Rectangle" x="64" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="71" y="22">{1}</tspan></text><rect id="Rectangle" x="96" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="103" y="22">{2}</tspan></text><rect id="Rectangle" x="128" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="135" y="22">{3}</tspan></text><rect id="Rectangle" x="160" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="167" y="22">{4}</tspan></text><rect id="Rectangle" x="192" y="0.5" width="29" height="29"></rect><text id="0" font-family="Courier New" font-size="24" font-weight="normal" fill="#0000FF"><tspan x="199" y="22">{5}</tspan></text></g></svg>`;
export async function GET({ platform }: { platform: App.Platform }) {
  let c = await platform.env?.KV.get("counter", "text");
  if (!c) {
    await platform.env?.KV.put("counter", "0");
    c = "0";
  }
  c = (parseInt(c) + 1).toString();
  await platform.env?.KV.put("counter", c);
  return new Response(format(template, ...c.padStart(6, "0")), {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"
    }
  });
}
