migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("category");
  field.required = false;
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("category");
  field.required = true;
  app.save(collection);
});
