// update-images-5.js
import db from './lib/db.js';

const updates = [
  {
    name: 'PSBB Learning Leadership Academy',
    city: 'Chennai',
    imageUrl: 'https://www.beingtheparent.com/wp-content/uploads/2023/12/Padma-Seshadri-Bala-Bhavan.jpg'
  },
  {
    name: 'Bishop Cotton Boys School',
    city: 'Bangalore',
    imageUrl: 'https://bishopcottonboysschool.edu.in/sites/default/files/banner1_0.jpg'
  },
  {
    name: 'Baldwin Boys High School',
    city: 'Bangalore',
    imageUrl: 'https://images.uniapply.com/uploads/college/image/500/3613/Baldwin_Boys_High_School_5129_Building_UA_2.jpg'
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
