migrate((app) => {
  const collection = app.findCollectionByNameOrId("memorial_records");
  collection.fields.add(new TextField({ name: "search_index", max: 500 }));
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("memorial_records");
  collection.fields.removeByName("search_index");
  app.save(collection);
});
