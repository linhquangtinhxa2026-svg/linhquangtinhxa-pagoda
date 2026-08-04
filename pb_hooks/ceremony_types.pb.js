// When a ceremony type is deleted, any prayer_events referencing its "value"
// are reassigned to the literal "unknown" — must match
// UNKNOWN_CEREMONY_TYPE_VALUE in src/lib/ceremonyType.ts.
onRecordAfterDeleteSuccess((e) => {
  e.next()
  const deletedValue = e.record.get("value")
  if (!deletedValue) return
  const affected = $app.findRecordsByFilter("prayer_events", "type = '" + deletedValue + "'")
  for (const record of affected) {
    record.set("type", "unknown")
    $app.save(record)
  }
}, "ceremony_types")
