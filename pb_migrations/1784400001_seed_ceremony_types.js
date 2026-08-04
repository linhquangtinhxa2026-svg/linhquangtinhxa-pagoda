migrate((app) => {
  const collection = app.findCollectionByNameOrId("ceremony_types");

  const seeds = [
    { label: "Cầu An", value: "cau_an", colorKey: "emerald" },
    { label: "Cầu Siêu", value: "cau_sieu", colorKey: "violet" },
  ];

  for (const seed of seeds) {
    try {
      app.findFirstRecordByFilter("ceremony_types", `value="${seed.value}"`);
    } catch {
      const record = new Record(collection);
      record.set("label", seed.label);
      record.set("value", seed.value);
      record.set("colorKey", seed.colorKey);
      app.save(record);
    }
  }
}, (app) => {
  console.log("Rollback: seed data not removed, clean up manually if needed");
});
