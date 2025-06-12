import { NextResponse } from 'next/server';

// Minimal middleware that allows all requests
export function middleware() {
  return NextResponse.next();
}

// Empty matcher to prevent middleware from running on any route
export const config = {
  matcher: [],
};

// Commenting out middleware for development
// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;
//   const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
//                     request.nextUrl.pathname.startsWith('/register');

//   if (!token && !isAuthPage) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (token && isAuthPage) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/login',
//     '/register',
//   ],
// }; 