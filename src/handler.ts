import { TokenProvider } from "./token";
import { Backend } from "./backend";

const validActionNames = new Set(["manifests", "blobs", "tags", "referrers"]);

const DEFAULT_BACKEND_HOST: string = "https://registry-1.docker.io";

export async function handleRequest(request: Request): Promise<Response> {
  const reqURL = new URL(request.url);
  const pathname = rewritePath(reqURL.pathname);
  const tokenProvider = new TokenProvider();
  const backend = new Backend(DEFAULT_BACKEND_HOST, tokenProvider);
  return backend.proxy(pathname, { headers: request.headers });
}

function rewritePath(pathname: string): string {
  const pathArr = pathname.split("/");

  // /v2/repo/manifests/xxx -> /v2/library/repo/manifests/xxx
  // /v2/repo/blobs/xxx -> /v2/library/repo/blobs/xxx
  if (pathArr.length === 5 && validActionNames.has(pathArr[3])) {
    return [pathArr[0], pathArr[1], "library", pathArr[2], pathArr[3], pathArr[4]].join("/");
  }

  return pathname;
}
