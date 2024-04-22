export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();
  const counseling = useCounseling();
  const appointment = useAppointment();
  const token = useCookie("token").value;

  if (token) {
    await auth.getUser();
  }

  const authenticatedPaths = [
    "/dashboard",
    "/auth/profile",
    "/chat",
    "/",
    "/appointment",
    "/history",
    "/counseling",
    "/teacher",
    "/student",
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

  if (auth.isAuth_data) {
    if (auth.user_data.role === "teacher" && to.path === "/dashboard") {
      await appointment.getData(undefined, undefined, [
        {
          key: "category",
          val: "offline",
        },
      ]);
    }

    if (auth.user_data.role === "student") {
      if (to.path === "/appointment") {
        await appointment.getData(undefined, undefined, [
          {
            key: "category",
            val: to.path === "/counseling" ? "online" : "offline",
          },
        ]);
      }

      if (to.path === "/dashboard") {
        await appointment.getData(undefined, undefined, [
          {
            key: "category",
            val: "offline",
          },
        ]);
      }
    }
  }

  if (auth.isAuth_data && to.path === "/auth/login") {
    return navigateTo("/dashboard");
  }

  if (to.path === "/") {
    return navigateTo("/dashboard");
  }
});
