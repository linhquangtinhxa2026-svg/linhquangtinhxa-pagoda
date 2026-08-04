migrate((app) => {
  const collection = new Collection({
    name: "media",
    type: "base",
    fields: [
      {
        name: "file",
        type: "file",
        required: true,
        maxSelect: 1,
        maxSize: 52428800, // 50 MB
        mimeTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/gif",
          "video/mp4",
          "video/webm",
          "video/quicktime",
        ],
        thumbs: ["400x400"],
        protected: false,
      },
      {
        name: "type",
        type: "select",
        required: true,
        maxSelect: 1,
        values: ["image", "video"],
      },
      { name: "extension", type: "text", required: true, max: 20 },
      { name: "folder", type: "text", required: true, max: 200 },
      { name: "altText", type: "text", max: 300 },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
    indexes: ["CREATE INDEX idx_media_folder ON media (folder)"],
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("media");
  app.delete(collection);
});
