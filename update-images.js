// update-images.js
import db from './lib/db.js';

const updates = [
  {
    name: 'Mayo College',
    city: 'Ajmer',
    imageUrl: 'https://mayoalumni.in/images/mayo-college-img.png'
  },
  {
    name: 'The Lawrence School Sanawar',
    city: 'Solan',
    imageUrl: 'https://www.sanawar.edu.in/assets/images/b5.jpg'
  }
];

async function run() {
  try {
    for (const { name, city, imageUrl } of updates) {
      const [res] = await db.execute(
        'UPDATE schools SET imageUrl = ? WHERE name LIKE ? AND city = ? LIMIT 1',
        [imageUrl, `%${name}%`, city]
      );
      console.log(`Updated ${name} (${city}) -> affected rows: ${res.affectedRows}`);
    }
  } catch (err) {
    console.error('Error updating images:', err);
  } finally {
    await db.end();
    process.exit(0);
  }
}

run();
