Titanium.API.info('index.js')

/**
 * Is the user authenticated?
 */
function isAuthenticated() {
  var auth = Ti.App.Properties.hasProperty('token')
  Titanium.API.info('isAuthenticated? ' + auth)
  return auth
}

if (isAuthenticated()) {
  Alloy.createController('userBookmarks').getView().open()
} else {
  Alloy.createController('login').getView().open()
}
