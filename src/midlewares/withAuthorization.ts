import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuthorization(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (request: NextRequest, next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    if (requireAuth.some((path) => pathname.startsWith(path))) {
      const token = await getToken({
        req: request, 
        secret: "123", 
      });
      // console.log(token);
      if (!token) {
        // const url = new URL(`http://192.168.8.109:3000/api/auth/signin`);
        const url = new URL(`/api/auth/signin`, request.url);
        // const callbackUrl="http://192.168.8.109:3000/api/auth/signin"
        // url.searchParams.set("callbackUrl ", encodeURI(callbackUrl));
        url.searchParams.set("callbackUrl ", encodeURI(request.url));
        return NextResponse.redirect(url);
      }
    //   if (token.role !== "admin") {
    //     const url = new URL(`/403`, request.url);
    //     return NextResponse.rewrite(url);
    //   }
    }
  
    return middleware(request, next);
  };
}
