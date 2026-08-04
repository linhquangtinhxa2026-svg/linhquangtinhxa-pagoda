migrate((app) => {
  const collection = new Collection({
    name: "news_categories",
    type: "base",
    fields: [
      { name: "label", type: "text", required: true, max: 200 },
      { name: "value", type: "text", required: true, max: 200 },
      {
        name: "colorKey",
        type: "select",
        required: true,
        maxSelect: 1,
        // keep in sync with NewsCategory["colorKey"] in src/types/newsCategory.ts
        values: ["burgundy", "gold", "dark"],
      },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: ["CREATE UNIQUE INDEX idx_news_categories_value ON news_categories (value)"],
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news_categories");
  app.delete(collection);
});
