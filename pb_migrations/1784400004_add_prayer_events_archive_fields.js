migrate((app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.add(new BoolField({ name: "isArchived" }));
  collection.fields.add(new DateField({ name: "archivedAt" }));
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.removeByName("isArchived");
  collection.fields.removeByName("archivedAt");
  app.save(collection);
});
