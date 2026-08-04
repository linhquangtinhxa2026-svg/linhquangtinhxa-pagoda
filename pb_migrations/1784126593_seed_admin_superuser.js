migrate((app) => {
  const collection = app.findCollectionByNameOrId("_superusers");
  const record = new Record(collection);

  record.setEmail("linhquangtinhxa4060@gmail.com");
  record.setPassword("k@mingo4060");

  app.save(record);
}, (app) => {
  const record = app.findSuperuserByEmail("linhquangtinhxa4060@gmail.com");
  app.delete(record);
});
