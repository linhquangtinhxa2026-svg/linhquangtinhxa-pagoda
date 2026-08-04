migrate((app) => {
  const collection = new Collection({
    name: "ceremony_types",
    type: "base",
    fields: [
      { name: "label", type: "text", required: true, max: 200 },
      { name: "value", type: "text", required: true, max: 200 },
      {
        name: "colorKey",
        type: "select",
        required: true,
        maxSelect: 1,
        // keep in sync with CeremonyTypeColorKey in src/types/ceremonyType.ts
        values: ["emerald", "violet", "sky", "amber", "rose"],
      },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: ["CREATE UNIQUE INDEX idx_ceremony_types_value ON ceremony_types (value)"],
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");
  app.delete(collection);
});
