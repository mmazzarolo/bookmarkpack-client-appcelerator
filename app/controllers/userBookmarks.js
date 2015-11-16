Titanium.API.info('userBookmarks.js')

/**
 * Log out the user
 */
function logout(e) {
  Ti.App.Properties.removeProperty('token')
  Ti.App.Properties.removeProperty('email')
  Alloy.createController('login').getView().open();
}

$.label.text = 'You are logged in as ' + Ti.App.Properties.getString('email')
