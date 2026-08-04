migrate((app) => {
  const categories = app.findCollectionByNameOrId("news_categories");

  const collection = new Collection({
    name: "news",
    type: "base",
    fields: [
      { name: "title", type: "text", required: true, max: 300 },
      { name: "slug", type: "text", required: true, max: 300 },
      { name: "description", type: "text", required: true, max: 500 },
      { name: "content", type: "editor", required: true },
      // resolved PocketBase file URL (or a static /images/... path for seeded rows) —
      // not a relation, matches the requirement to store the URL string returned by
      // the "media" collection after upload
      { name: "coverImageUrl", type: "text", required: true },
      // array of { url: string, type: "image" | "video" }
      { name: "gallery", type: "json" },
      {
        name: "category",
        type: "relation",
        required: true,
        collectionId: categories.id,
        maxSelect: 1,
        cascadeDelete: false,
      },
      { name: "isPublished", type: "bool" },
      { name: "publishedAt", type: "date" },
    ],
    // public visitors only ever see published rows; authenticated admins (via the
    // "users" collection) see drafts too — superusers bypass rules entirely anyway
    listRule: "isPublished = true || @request.auth.id != ''",
    viewRule: "isPublished = true || @request.auth.id != ''",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: [
      "CREATE UNIQUE INDEX idx_news_slug ON news (slug)",
      "CREATE INDEX idx_news_published ON news (isPublished, publishedAt)",
    ],
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  app.delete(collection);
});
