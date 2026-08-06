const COLOR_KEY_TO_HEX = {
  burgundy: { backgroundColor: "#8b3a2e", textColor: "#ffffff" },
  gold: { backgroundColor: "#c4973a", textColor: "#1c0a0a" },
  dark: { backgroundColor: "#1c0a0a", textColor: "#c4973a" },
};

migrate((app) => {
  const collection = app.findCollectionByNameOrId("news_categories");

  const existing = app.findRecordsByFilter("news_categories", "id != ''");
  const oldColorKeys = {};
  for (const record of existing) {
    oldColorKeys[record.id] = record.get("colorKey");
  }

  collection.fields.add(new TextField({ name: "backgroundColor", required: true, max: 20 }));
  collection.fields.add(new TextField({ name: "textColor", required: true, max: 20 }));
  collection.fields.add(new NumberField({ name: "order", required: true }));
  app.save(collection);

  const refreshed = app.findRecordsByFilter("news_categories", "id != ''");
  const sorted = [...refreshed].sort((a, b) => a.get("label").localeCompare(b.get("label")));
  sorted.forEach((record, index) => {
    const hex = COLOR_KEY_TO_HEX[oldColorKeys[record.id]] || COLOR_KEY_TO_HEX.dark;
    record.set("backgroundColor", hex.backgroundColor);
    record.set("textColor", hex.textColor);
    record.set("order", index + 1);
    app.save(record);
  });

  collection.indexes = collection.indexes.filter(
    (idx) => !idx.includes("idx_news_categories_value")
  );
  collection.fields.removeByName("value");
  collection.fields.removeByName("colorKey");
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news_categories");
  collection.fields.add(new TextField({ name: "value", required: true, max: 200 }));
  collection.fields.add(new SelectField({
    name: "colorKey",
    required: true,
    maxSelect: 1,
    values: ["burgundy", "gold", "dark"],
  }));
  collection.fields.removeByName("backgroundColor");
  collection.fields.removeByName("textColor");
  collection.fields.removeByName("order");
  app.save(collection);
});
