migrate((app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.getByName("registrantName").required = false;
  collection.fields.getByName("subjectName").required = false;
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.getByName("registrantName").required = true;
  collection.fields.getByName("subjectName").required = true;
  app.save(collection);
});
