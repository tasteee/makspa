/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cz833q5co5uoo26",
    "created": "2024-11-24 12:24:23.495Z",
    "updated": "2024-11-24 12:24:23.495Z",
    "name": "spaces",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "w8zetnjx",
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
        "id": "oufuh1vy",
        "name": "thumbnail",
        "type": "file",
        "required": false,
        "presentable": true,
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
      },
      {
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
      },
      {
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
      },
      {
        "system": false,
        "id": "gc6qfbn0",
        "name": "audio_clips",
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
          "maxSelect": 100,
          "maxSize": 5000000,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "aar8zdoz",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 32,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ndb4feue",
        "name": "is_public",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "wf6rxxuv",
        "name": "visits",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100000000,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "ea7rkezn",
        "name": "color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "etqcxvyk",
        "name": "background_mode",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "hdr",
            "color"
          ]
        }
      },
      {
        "system": false,
        "id": "xzz7gqtt",
        "name": "hdr",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ryo1bfwv",
        "name": "hdr_blur",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "7pxybbql",
        "name": "is_hdr_enabled",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "z0nfit9i",
        "name": "show_hdr_sky",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "e5asjzwr",
        "name": "background_color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ky0tsfjm",
        "name": "is_grid_visible",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "q0m5sg6k",
        "name": "grid_opacity",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "y9x4v1rz",
        "name": "grid_cell_line_color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "2eiy2qjc",
        "name": "grid_section_line_color",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "drloc4aj",
        "name": "grid_cell_size",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0.1,
          "max": 5,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "bx05rjaq",
        "name": "grid_section_size",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0.2,
          "max": 5,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "weg7znwh",
        "name": "grid_cell_line_thickness",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0.1,
          "max": 10,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "3mbkfwhx",
        "name": "grid_section_line_thickness",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0.1,
          "max": 10,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "ss5jqppp",
        "name": "grid_fade_amount",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "sd2mwast",
        "name": "grid_fade_distance",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "h9p24be6",
        "name": "is_floor_visible",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "jbsv6nwt",
        "name": "floor_color_1",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8imireww",
        "name": "floor_color_2",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "8easua3u",
        "name": "floor_opacity_1",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "hvdzdiyl",
        "name": "floor_opacity_2",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "y4mzzk8f",
        "name": "items",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 20000000
        }
      },
      {
        "system": false,
        "id": "wo3julnb",
        "name": "images",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [],
          "maxSelect": 100,
          "maxSize": 5000000,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "um4szhdr",
        "name": "size_x",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 256,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "waparabw",
        "name": "size_y",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 256,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "2zqouatv",
        "name": "size_z",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 256,
          "noDecimal": true
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cz833q5co5uoo26");

  return dao.deleteCollection(collection);
})
