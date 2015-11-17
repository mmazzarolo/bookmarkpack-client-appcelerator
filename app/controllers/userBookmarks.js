Titanium.API.info('userBookmarks.js')

/**
 * Release memory on window closed (needed for data binding)
 */
$.window.addEventListener('close', function(){
    $.destroy()
})

/**
 * Log out the user
 */
function logout(e) {
  Ti.App.Properties.removeProperty('token')
  Ti.App.Properties.removeProperty('email')
  Alloy.createController('login').getView().open()
}

/**
 * Transform the received HTTP model in valid JSON
 */
function transformer(model) {
  $.activityIndicator.hide()

  var bookmark = model.toJSON()
  bookmark.faviconImgUrl = 'https://www.google.com/s2/favicons?domain=' + bookmark.url

  Titanium.API.log('name: ' + bookmark.name)

  return bookmark
}

/**
 * Open the URL on bookmark click
 */
function onBookmarkClick(e){
  var bookmark = bookmarks.get(e.itemId).toJSON()
  Titanium.Platform.openURL(bookmark.url)
}

/**
 * Loads the bookmarks
 */
$.loggedLabel.text = 'You are logged in as ' + Ti.App.Properties.getString('email')
var bookmarks = Alloy.Collections.bookmarks
bookmarks.fetch()
$.activityIndicator.show()




