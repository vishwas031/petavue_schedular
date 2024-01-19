export function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains information about the authenticated user
    console.log('Authenticated user:', req.user);
    return next(); // Move on to the next middleware or route handler
  } else {
    // Redirect or respond in some way for non-authenticated users
    res.redirect('/auth/google'); // Redirect to the login page, for example
  }
}