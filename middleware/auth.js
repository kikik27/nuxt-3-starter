export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();
  const token = useCookie("token").value;

  if (token) {
    await auth.getUser();
  }

  const authenticatedPaths = [
    "/dashboard",
    "/"
  ];
  const adminPaths = ["/teacher", "/student"];

  const requiresAuth = authenticatedPaths.includes(to.path);
  const requiresAdmin = adminPaths.includes(to.path);

  if (!auth.isAuth_data && requiresAuth) {
    return navigateTo("/auth/login");
  }

  if (requiresAdmin && auth.isAuth_data && auth.user_data.role !== "admin") {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (auth.isAuth_data && to.path === "/auth/login") {
    return navigateTo("/dashboard");
  }

  if (to.path === "/") {
    return navigateTo("/dashboard");
  }
});
