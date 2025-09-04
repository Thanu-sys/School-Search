// update-images-2.js
import db from './lib/db.js';

const updates = [
  {
    name: "St. John's High School",
    city: 'Chandigarh',
    imageUrl: 'https://chandigarhmetro.com/wp-content/uploads/2015/01/St.-Johns-Chandigarh.jpg'
  },
  {
    name: 'Zydus School for Excellence',
    city: 'Ahmedabad',
    imageUrl: 'https://www.yayskool.com/images/school/zydus-school-for-excellence-ahmedabad-799310852.jpg'
  },
  {
    name: 'Vibgyor High School',
    city: 'Pune',
    imageUrl: 'https://www.vibgyorhigh.com/public/uploads/schools/202305181633-202304181749-Yerwada.jpg'
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
