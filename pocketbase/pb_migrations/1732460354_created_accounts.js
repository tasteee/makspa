/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "l90o3jbl9t53fxq",
    "created": "2024-11-24 14:59:14.479Z",
    "updated": "2024-11-24 14:59:14.479Z",
    "name": "accounts",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lxbellkk",
        "name": "avatar",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 1000000,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "uiiuj1gi",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 32,
          "pattern": "^[a-zA-Z0-9$_][a-zA-Z0-9$_-]{2,31}$"
        }
      },
      {
        "system": false,
        "id": "1stkijtf",
        "name": "about",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qciqtnxt",
        "name": "is_online",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "fesczvjk",
        "name": "auth_id",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 32,
          "max": 32,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": [],
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l90o3jbl9t53fxq");

  return dao.deleteCollection(collection);
})
