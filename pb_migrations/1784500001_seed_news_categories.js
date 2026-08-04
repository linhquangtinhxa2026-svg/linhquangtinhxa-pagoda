migrate((app) => {
  const collection = app.findCollectionByNameOrId("news_categories");

  const seeds = [
    { label: "Sự Kiện", value: "su-kien", colorKey: "burgundy" },
    { label: "Hoạt Động", value: "hoat-dong", colorKey: "gold" },
    { label: "Thông Báo", value: "thong-bao", colorKey: "dark" },
  ];

  for (const seed of seeds) {
    try {
      app.findFirstRecordByFilter("news_categories", `value="${seed.value}"`);
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
