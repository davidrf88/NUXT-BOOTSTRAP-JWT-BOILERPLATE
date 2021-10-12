export default async function adminMiddleware (context) {
  // If the user is not authenticated
  if (!context.store.getters['auth/IsAdmin']) {
    console.log('admin mw','no user');
    return context.redirect('/login')
  }
  

}