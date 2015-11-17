Titanium.API.info('login.js')

/**
 * Start the authentication process
 */
function login(e) {
  var url = 'https://bookmarkpack-server.herokuapp.com/auth/login'

  // Get email and password from the user form
  var email = $.emailTextField.value
  var password = $.passwordTextField.value

  var params = {
    'email': email,
    'password': password
  }

  // Prepare and start the API call
  var loader = Titanium.Network.createHTTPClient()
  loader.onload = onLoginComplete
  loader.onerror = onLoginError
  loader.open('POST', url)
  loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  loader.send(params)

  // Show the loading spinner
  startLoading()
}


// Function called when the response data is available
function onLoginComplete(res) {
  Titanium.API.info('onLoginComplete')
  Titanium.API.info('Status: ' + this.status)
  Titanium.API.info('ResponseText: ' + this.responseText)
  Titanium.API.info('ConnectionType: ' + this.connectionType)
  Titanium.API.info('Location: ' + this.location)

  endLoading()
  var responseJson = JSON.parse(this.responseText)
  var token = responseJson.token
  Ti.App.Properties.setString('token', token)
  Ti.App.Properties.setString('email', $.emailTextField.value)
  Alloy.createController('userBookmarks').getView().open();
}

// Function called when an error occurs, including a timeout
function onLoginError(e) {
  Titanium.API.info('onLoginError')
  Titanium.API.info('Error: ' + e.error)
  Titanium.API.info('ResponseText: ' + this.responseText)
  Titanium.API.info('ConnectionType: ' + this.connectionType)
  Titanium.API.info('Location: ' + this.location)

  endLoading()
  Ti.App.Properties.removeProperty('token')
  Ti.App.Properties.removeProperty('email')
  var responseJson = JSON.parse(this.responseText)
  if (this.status == 422) {
    var errors = responseJson.errors
    for (var i = 0; i < errors.length; i++) {
      err = errors[i]
      $.errorLabel.text = $.errorLabel.text + '\n' + err.message
    }
  } else {
    $.errorLabel.text = responseJson.message
  }
}

function startLoading() {
  $.errorLabel.text = ''
  $.activityIndicator.show()
  $.emailTextField.setEnabled(false)
  $.passwordTextField.setEnabled(false)
}

function endLoading() {
  $.activityIndicator.hide()
  $.emailTextField.setEnabled(true)
  $.passwordTextField.setEnabled(true)
}

function closeKeyboard(e) {
  e.source.blur()
}
