function login(e) {
  var email = ''
  var password = ''
  var url = 'https://bookmarkpack-server.herokuapp.com/auth/login'

  var loader = Titanium.Network.createHTTPClient()

  loader.onload = function(res) {
    Titanium.API.info('onload')
    Titanium.API.info('Status: ' + this.status)
    Titanium.API.info('ResponseText: ' + this.responseText)
    Titanium.API.info('connectionType: ' + this.connectionType)
    Titanium.API.info('location: ' + this.location)
    $.label.text = 'Connected! Your token is: ' + res.token
  }

  loader.onerror = function(e) {
    Titanium.API.info('onerror')
    Titanium.API.info('Error: ' + e.error)
  }

  var params = {
    'email': email,
    'password': password
  }

  loader.open('POST', url)
  loader.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  loader.send(params)
}


function closeKeyboard(e) {
  e.source.blur()
}

$.index.open()
