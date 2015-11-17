Titanium.API.info('index.js')

/**
 * Is the user authenticated?
 */
function isAuthenticated() {
  var hasEmail = Ti.App.Properties.hasProperty('email')
  var hasToken = Ti.App.Properties.hasProperty('token')
  Titanium.API.info('isAuthenticated? ' + hasEmail && hasToken)

  var email = Ti.App.Properties.getString('email')
  var token = Ti.App.Properties.getString('token')
  Titanium.API.info('Email: ' + email)
  Titanium.API.info('Token: ' + token)

  return hasEmail && hasToken
}

/**
 * If the user is not authenticated show the login screen
 */
if (isAuthenticated()) {
  Alloy.createController('userBookmarks').getView().open()
} else {
  Alloy.createController('login').getView().open()
}
