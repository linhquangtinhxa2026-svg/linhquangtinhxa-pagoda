migrate((app) => {
  const collection = app.findCollectionByNameOrId("memorial_records");
  const phone = collection.fields.getByName("phone");
  phone.max = 100;
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("memorial_records");
  const phone = collection.fields.getByName("phone");
  phone.max = 30;
  app.save(collection);
});
