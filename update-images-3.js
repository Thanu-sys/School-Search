// update-images-3.js
import db from './lib/db.js';

const updates = [
  {
    name: "The Bishop's School",
    city: 'Pune',
    imageUrl: 'https://c8.alamy.com/comp/A5J97P/ssk102641-architecture-the-bishops-school-building-camp-poona-pune-A5J97P.jpg'
  },
  {
    name: 'Meridian School',
    city: 'Hyderabad',
    imageUrl: 'https://www.meridianbanjara.com/images/camp1.jpg'
  },
  {
    name: 'Oakridge International School',
    city: 'Hyderabad',
    imageUrl: 'https://www.oakridge.in/local-social-media/gachibowli/international-school-in-gachibowli-hyderabad/img/BCH.jpg'
  },
  {
    name: 'The Hyderabad Public School',
    city: 'Hyderabad',
    imageUrl: 'https://www.ipsc.co.in/images/member/the-hyderabad-public-school-begumpet-img001.jpg'
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
