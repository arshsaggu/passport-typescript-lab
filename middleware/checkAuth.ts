/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login?error=Please log in to access this page");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

export const ensureAdmin = (req: any, res: any, next: any) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next()
  }
  res.status(403).send("Access denied. Admins only.")
}