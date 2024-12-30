/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  collection.deleteRule = ""
  collection.indexes = [
    "CREATE INDEX `index_spaces_owner` ON `spaces` (`owner`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rzoi3cio",
    "name": "owner",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "l90o3jbl9t53fxq",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wkh8g1p6",
    "name": "artists",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "l90o3jbl9t53fxq",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 100,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  collection.deleteRule = null
  collection.indexes = []

  // remove
  collection.schema.removeField("rzoi3cio")

  // remove
  collection.schema.removeField("wkh8g1p6")

  return dao.saveCollection(collection)
})
