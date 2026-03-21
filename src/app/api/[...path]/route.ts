/**
 * API proxy route — forwards all /api/* requests to Django backend.
 * Properly forwards Set-Cookie headers so session cookies work.
 */

const DJANGO_URL = process.env.API_BACKEND_URL || "http://localhost:8002";

async function proxyRequest(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname; // /api/auth/login/ etc.
  const search = url.search;
  const targetUrl = `${DJANGO_URL}${path}${search}`;

  // Forward the request
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    // Don't forward host header
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  });

  const fetchOptions: RequestInit = {
    method: request.method,
    headers,
    // @ts-expect-error - duplex is needed for streaming request bodies
    duplex: "half",
  };

  // Forward body for non-GET requests
  if (request.method !== "GET" && request.method !== "HEAD") {
    fetchOptions.body = await request.text();
  }

  const response = await fetch(targetUrl, fetchOptions);

  // Build response with all headers (including Set-Cookie)
  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    responseHeaders.append(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: Request) {
  return proxyRequest(request);
}

export async function POST(request: Request) {
  return proxyRequest(request);
}

export async function PUT(request: Request) {
  return proxyRequest(request);
}

export async function PATCH(request: Request) {
  return proxyRequest(request);
}

export async function DELETE(request: Request) {
  return proxyRequest(request);
}
