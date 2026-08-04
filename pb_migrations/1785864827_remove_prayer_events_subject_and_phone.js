migrate((app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.removeByName("subjectName");
  collection.fields.removeByName("phone");
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  collection.fields.add(new TextField({ name: "subjectName", max: 200 }));
  collection.fields.add(new TextField({ name: "phone", required: true, max: 30 }));
  app.save(collection);
});
