export default async function authMiddleware (context) {
  // If the user is not authenticated
  if (!context.store.state.auth.user) {
    return context.redirect('/login')
  }
}