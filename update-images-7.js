// update-images-7.js
import db from './lib/db.js';

async function run() {
  try {
    const [res] = await db.execute(
      'UPDATE schools SET imageUrl = ? WHERE name LIKE ? AND city = ? LIMIT 1',
      [
        'https://i0.wp.com/fitzgabrielsschools.com/wp-content/uploads/2021/09/DHIRUBHAI-AMBANI-INTERNATIONAL-SCHOOL-MAIN-BANNER.png?resize=1024%2C576&ssl=1',
        '%Dhirubhai Ambani International School%',
        'Mumbai'
      ]
    );
    console.log(`Updated Dhirubhai Ambani International School (Mumbai) -> affected rows: ${res.affectedRows}`);
  } catch (err) {
    console.error('Error updating image:', err);
  } finally {
    await db.end();
    process.exit(0);
  }
}

run();
