export default async function (context) {
  // If the user is not authenticated
  console.log( "middleware valuues", context.store.state)
  if (!context.store.state.auth.user) {
    return context.redirect('/login')
  }
}