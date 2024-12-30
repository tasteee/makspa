/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("b1bo0j0ev8aairo");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "b1bo0j0ev8aairo",
    "created": "2024-11-24 11:51:22.156Z",
    "updated": "2024-11-24 14:56:24.772Z",
    "name": "artists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "idhwmrei",
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
        "id": "kdwjfddf",
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
        "id": "shftaby6",
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
        "id": "ovvrg4du",
        "name": "is_online",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "tamab1wu",
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
      },
      {
        "system": false,
        "id": "r5lmpjoi",
        "name": "email",
        "type": "email",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
