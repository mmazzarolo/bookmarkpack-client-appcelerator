// exports.definition = {
//   config: {
//     "columns": {
//       "id": "INTEGER PRIMARY KEY",
//       "title": "text",
//       "modified": "text"
//     },
//     "URL": "https://http://bookmarkpack.herokuapp.com/user/bookmarks",
//     "debug": 1, //debug mode enabled
//     "useStrictValidation": 1, // validates each item if all columns are present
//     "adapter": {
//       "type": "sqlrest",
//       "collection_name": "bookmarks",
//       "idAttribute": "id",
//       "deletedAttribute": "updated",

//       // optimise the amount of data transfer from remote server to app
//       "addModifedToUrl": true,
//       "lastModifiedColumn": "modified"
//     },

//     //optional
//     "headers": { //your custom headers
//       "Accept": "application/vnd.stackmob+json; version=0",
//       "X-StackMob-API-Key": "your-stackmob-key"
//     },

//     // delete all models on fetch
//     "deleteAllOnFetch": true
//   },
//   extendModel: function(Model) {
//     _.extend(Model.prototype, {});
//     return Model;
//   },
//   extendCollection: function(Collection) {
//     _.extend(Collection.prototype, {});
//     return Collection;
//   }
// }
