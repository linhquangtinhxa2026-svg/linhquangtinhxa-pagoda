# PocketBase Migration Rules (v0.23+)

## Rule: Always Use Version-Specific Syntax (0.23+)

When creating PocketBase migrations, you MUST follow the patterns defined in the [PocketBase JS Migrations Documentation](https://pocketbase.io/docs/js-migrations/).

### Step 1: Migration Structure
Migrations use the `migrate(up, down)` function. The argument passed to these functions is the `app` (or `db`) object, which provides access to the database and collection management.

### Step 2: Creating a Superuser
In PocketBase 0.23+, admins are now "superusers" stored in the `_superusers` collection. Use `Record` and `app.findCollectionByNameOrId` to manage them.

```javascript
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_superusers");
  const record = new Record(collection);

  record.setEmail("admin@example.com");
  record.setPassword("your_strong_password");

  app.save(record);
}, (app) => {
  const record = app.findSuperuserByEmail("admin@example.com");
  app.delete(record);
});
```

### Step 3: Creating Collections

#### Method A: Using `new Collection` and `app.save` (Best for incremental changes)
```javascript
migrate((app) => {
  const collection = new Collection({
    name: "example",
    type: "base",
    fields: [
      { name: "title", type: "text", required: true },
      { name: "active", type: "bool" }
    ],
    listRule: "",
    viewRule: "",
    createRule: "@request.auth.id != ''",
    updateRule: "@request.auth.id != ''",
    deleteRule: "@request.auth.id != ''"
  });

  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("example");
  app.delete(collection);
});
```

#### Method B: Using `app.importCollections` (Best for initial schema or snapshots)
This method is more robust for managing relationships as it can handle ID auto-generation and cross-references more easily.

```javascript
migrate((app) => {
  const collections = [
    {
      name: "categories",
      type: "base",
      fields: [
        { name: "name", type: "text", required: true }
      ]
    },
    {
      name: "products",
      type: "base",
      fields: [
        { name: "title", type: "text", required: true },
        { 
          name: "category_id", 
          type: "relation", 
          collectionId: "categories", // Can use name here with importCollections
          maxSelect: 1 
        }
      ]
    }
  ];

  return app.importCollections(collections, false);
}, (app) => {
  return null;
});
```

## Available Field Types (0.23+)

| Type | Structure |
| :--- | :--- |
| **Text** | `{ "name": "title", "type": "text", "required": true, "max": 200 }` |
| **Number** | `{ "name": "price", "type": "number", "min": 0 }` |
| **Bool** | `{ "name": "is_active", "type": "bool" }` |
| **Date** | `{ "name": "date", "type": "date" }` |
| **Email** | `{ "name": "email", "type": "email" }` |
| **URL** | `{ "name": "link", "type": "url" }` |
| **JSON** | `{ "name": "config", "type": "json" }` |
| **File** | `{ "name": "image", "type": "file", "maxSelect": 1, "mimeTypes": ["image/png"] }` |
| **Relation**| `{ "name": "owner", "type": "relation", "collectionId": "users", "maxSelect": 1 }` |
| **Select** | `{ "name": "status", "type": "select", "values": ["a", "b"] }` |
| **Editor** | `{ "name": "content", "type": "editor" }` |

## Correct Methods (PocketBase 0.23+)

- `app.save(collection/record)` - Save or create
- `app.delete(collection/record)` - Delete
- `app.findCollectionByNameOrId(name)` - Find collection
- `app.findRecordsByFilter(collName, filter)` - Find records
- `app.findFirstRecordByFilter(collName, filter)` - Find one record
- `app.findSuperuserByEmail(email)` - Find superuser

## Testing Migrations

```bash
./pocketbase migrate up
```

**Important**: In 0.23+, avoid manual ID definition if possible unless required for hardcoded relationships. Let PocketBase generate system IDs.

## Rule: Always Add Autodate Fields to New Collections

Every new `base` collection MUST include `created` and `updated` autodate fields. Without them, any service that sorts by `-created` (the standard sort for most queries) will return a **400 error** from PocketBase.

Add them explicitly in the migration:

```javascript
migrate((app) => {
  const collection = new Collection({
    name: "example",
    type: "base",
    fields: [
      { name: "title", type: "text", required: true },
      // ... other fields ...
    ],
  })

  collection.fields.add(new AutodateField({ name: "created", onCreate: true,  onUpdate: false }))
  collection.fields.add(new AutodateField({ name: "updated", onCreate: true,  onUpdate: true  }))

  app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("example")
  app.delete(collection)
})
```

**Why this is required:** The global `add_autodates` migration only covered `categories`, `transactions`, and `budgets`. New collections created after that migration must add their own autodates inline. Missing `created` field causes a 400 when services call `getFullList({ sort: '-created' })`.

**Checklist before saving a new collection migration:**
- [ ] `created` AutodateField added (onCreate: true, onUpdate: false)
- [ ] `updated` AutodateField added (onCreate: true, onUpdate: true)
- [ ] Service `sort:` field matches a field that actually exists in the collection

