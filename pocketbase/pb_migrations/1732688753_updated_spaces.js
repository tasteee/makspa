/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qf3gse8k",
    "name": "hdrIntensity",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 100,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26")

  // remove
  collection.schema.removeField("qf3gse8k")

  return dao.saveCollection(collection)
})
