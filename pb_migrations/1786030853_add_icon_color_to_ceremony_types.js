migrate((app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");
  collection.fields.add(new TextField({ name: "iconColor", required: true, max: 20 }));
  app.save(collection);

  const existing = app.findRecordsByFilter("ceremony_types", "id != ''");
  for (const record of existing) {
    record.set("iconColor", "#c4973a");
    if (!record.get("iconKey")) {
      record.set("iconKey", "flame");
    }
    app.save(record);
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");
  collection.fields.removeByName("iconColor");
  app.save(collection);
});
