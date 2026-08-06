migrate((app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");
  collection.fields.add(new SelectField({
    name: "iconKey",
    required: true,
    maxSelect: 1,
    // keep in sync with CEREMONY_TYPE_ICON_OPTIONS in src/lib/ceremonyTypeIcons.ts
    values: ["flame", "flower", "heart", "sun", "moon", "star", "book", "users", "prayer", "bell"],
  }));
  collection.fields.add(new BoolField({ name: "important" }));
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");
  collection.fields.removeByName("iconKey");
  collection.fields.removeByName("important");
  app.save(collection);
});
