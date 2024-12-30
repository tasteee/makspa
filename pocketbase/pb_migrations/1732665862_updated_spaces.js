/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdp3xjlo",
    "name": "soundtrack",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "audio/mpeg",
        "audio/wav"
      ],
      "thumbs": [],
      "maxSelect": 10,
      "maxSize": 10000000,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdp3xjlo",
    "name": "soundtrack",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "audio/mpeg",
        "audio/wav"
      ],
      "thumbs": [],
      "maxSelect": 10,
      "maxSize": 1000000,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
