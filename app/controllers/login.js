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

  var loader = Titanium.Network.createHTTPClient()

  // Function called when the response data is available
  loader.onload = function(res) {
    Titanium.API.info('onload')
    Titanium.API.info('Status: ' + this.status)
    Titanium.API.info('ResponseText: ' + this.responseText)
    Titanium.API.info('ConnectionType: ' + this.connectionType)
    Titanium.API.info('Location: ' + this.location)

    endLoading()
    var token = this.responseText.token
    Ti.App.Properties.setString('token', token)
    Ti.App.Properties.setString('email', params.email)
    Alloy.createController('userBookmarks').getView().open();
  }

  // Function called when an error occurs, including a timeout
  loader.onerror = function(e) {
    Titanium.API.info('onerror')
    Titanium.API.info('JSON.stringify: ' + JSON.stringify(e))
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

  // Prepare and start the API call
  loader.open('POST', url)
  loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  loader.send(params)
  $.errorLabel.text = ''
  startLoading()
}

function startLoading() {
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
