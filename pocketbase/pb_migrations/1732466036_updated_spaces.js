/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // remove
  collection.schema.removeField("g33yfxat")

  // remove
  collection.schema.removeField("9tjdkiku")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g33yfxat",
    "name": "owner",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b1bo0j0ev8aairo",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9tjdkiku",
    "name": "artists",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b1bo0j0ev8aairo",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 100,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
