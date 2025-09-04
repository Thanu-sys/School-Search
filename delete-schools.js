// delete-schools.js
import db from './lib/db.js';

const toDelete = [
  { pattern: '%Mayo College%', city: 'Ajmer' },
  { pattern: '%La Martiniere College%', city: 'Lucknow' }
];

async function run() {
  try {
    for (const item of toDelete) {
      const [res] = await db.execute(
        'DELETE FROM schools WHERE name LIKE ? AND city = ? LIMIT 5',
        [item.pattern, item.city]
      );
      console.log(`Deleted ${res.affectedRows} rows for ${item.pattern} (${item.city})`);
    }

    const [countRows] = await db.execute('SELECT COUNT(*) as count FROM schools');
    console.log(`Remaining schools: ${countRows[0].count}`);
  } catch (err) {
    console.error('Error deleting schools:', err);
  } finally {
    await db.end();
    process.exit(0);
  }
}

run();
