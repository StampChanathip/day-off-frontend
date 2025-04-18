import { NextRequest, NextResponse } from "next/server";
import { RouteItem } from "./shared/types/routeItemType";
import { ROLE } from "./shared/constants/common";
import { envConfig } from "./configs/configs";
import { getRoleByToken } from "./shared/utils/roleUtils";
import { cookies } from "next/headers";
import { cookieStoreKey } from "./shared/constants/cookieStoreKey";

const routes: RouteItem[] = [
  {
    path: "/homepage",
    roles: [ROLE.GUEST, ROLE.USER, ROLE.ADMIN],
  },
  {
    path: "/login",
    roles: [ROLE.GUEST],
  },
  {
    path: "/register",
    roles: [ROLE.GUEST],
  },
];

export async function middleware(request: NextRequest) {
  const matchPath = (path: string, pathname: string): boolean => {
    const pathToRegex = path.replace(/:[^\s/]+/g, "([^/]+)");
    const regex = new RegExp(`^${pathToRegex}$`);
    return regex.test(pathname);
  };

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieStoreKey.accessToken)?.value;
  const role = getRoleByToken(token) ?? ROLE.GUEST;

  const subpath = envConfig.SUB_DIR || "";
  const fallbackPath = `${subpath}/homepage`;

  const path = request.nextUrl.pathname;

  const pathMatched = routes.find((route) => matchPath(route.path, path));

  const allow = pathMatched?.roles?.includes(role as string) ?? false;

  if (!allow) {
    if (path === fallbackPath) {
      return NextResponse.next();
    }

    const route = routes.find((route) => route.roles?.includes(role as string));
    if (route) {
      return NextResponse.redirect(
        new URL(`${subpath}${route.path}`, request.url)
      );
    }

    return NextResponse.redirect(new URL(fallbackPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
