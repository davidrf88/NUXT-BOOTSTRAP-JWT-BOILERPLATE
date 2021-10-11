export default async function authMiddleware (context) {
  // If the user is not authenticated
  console.log( "middleware valuues", context.store.getters["auth/IsAuthenticated"])
  if (!context.store.state.auth.user) {
    return context.redirect('/login')
  }
}