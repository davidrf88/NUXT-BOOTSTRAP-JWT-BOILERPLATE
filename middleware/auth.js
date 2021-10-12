export default async function authMiddleware (context) {
  // If the user is not authenticated
  if (!context.store.getters['auth/IsAuthenticated']) {
 
    return context.redirect('/login')
  }
}