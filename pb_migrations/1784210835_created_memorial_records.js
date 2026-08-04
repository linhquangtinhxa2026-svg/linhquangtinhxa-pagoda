migrate((app) => {
  const collection = new Collection({
    name: "memorial_records",
    type: "base",
    fields: [
      { name: "full_name", type: "text", required: true, max: 200 },
      { name: "age_at_death", type: "number", min: 0 },
      { name: "phone", type: "text", max: 30 },
      { name: "storage_location", type: "text", max: 200 },
      { name: "display_location", type: "text", max: 200 },
      { name: "private_info", type: "text", max: 2000 },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: [
      "CREATE INDEX idx_memorial_records_full_name ON memorial_records (full_name)"
    ]
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("memorial_records");
  app.delete(collection);
});
