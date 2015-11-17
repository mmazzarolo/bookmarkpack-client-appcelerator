exports.definition = {
  config: {
    'URL': 'https://bookmarkpack-server.herokuapp.com/user/bookmarks',
    'debug': 1,
    // 'useStrictValidation': 1,
    'deleteAllOnFetch': true,

    'columns': {
      'id': 'text',
      'url': 'text',
      'name': 'text',
      'notes': 'text',
      'updated': 'text',
      'favicon': 'text'
    },

    'adapter': {
      'type': 'sqlrest',
      'collection_name': 'bookmarks',
      'idAttribute': 'id',
      'deletedAttribute': 'updated',
      'addModifedToUrl': true,
      'lastModifiedColumn': 'updated'
    },

    'headers': {
      'authorization': createToken
    }

  },
  extendModel: function(Model) {
    _.extend(Model.prototype, {})
    return Model
  },
  extendCollection: function(Collection) {
    _.extend(Collection.prototype, {})
    return Collection
  }
}

function createToken() {
  Titanium.API.info('createToken')
  var token = 'Bearer ' + Ti.App.Properties.getString('token')
  Titanium.API.info('Token: ' + token)
  return token
}
