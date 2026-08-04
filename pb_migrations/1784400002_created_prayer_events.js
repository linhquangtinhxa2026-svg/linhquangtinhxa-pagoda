migrate((app) => {
  const collection = new Collection({
    name: "prayer_events",
    type: "base",
    fields: [
      // slug referencing ceremony_types.value, or the reserved literal "unknown"
      // (see pb_hooks/ceremony_types.pb.js), or "" if never assigned
      { name: "type", type: "text", max: 100 },
      { name: "registrantName", type: "text", required: true, max: 200 },
      { name: "subjectName", type: "text", required: true, max: 200 },
      { name: "phone", type: "text", required: true, max: 30 },
      { name: "eventDate", type: "text", required: true, max: 20 },
      { name: "note", type: "text", max: 2000 },
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''",
  });

  collection.fields.add(new AutodateField({ name: "created", onCreate: true, onUpdate: false }));
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true, onUpdate: true }));

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("prayer_events");
  app.delete(collection);
});
