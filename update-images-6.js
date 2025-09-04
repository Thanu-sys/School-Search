// update-images-6.js
import db from './lib/db.js';

const updates = [
  {
    name: 'The International School Bangalore',
    city: 'Bangalore',
    imageUrl: 'https://images.uniapply.com/uploads/college/image/500/3613/webp/The_International_School_Bangalore_6269_Building_UA_1.webp'
  },
  {
    name: 'Jamnabai Narsee School',
    city: 'Mumbai',
    imageUrl: 'https://images.hindustantimes.com/rf/image_size_800x600/HT/p2/2016/09/21/Pictures/jamnabai-narsee-school-prodip-juhu-photo-guha_ece0285c-7feb-11e6-a0d9-e435f3f63e15.jpg'
  },
  {
    name: 'Bombay Scottish School',
    city: 'Mumbai',
    imageUrl: 'https://www.bombayscottishpowai.in/images/profile-bg.jpg'
  },
  {
    name: 'Cathedral and John Connon School',
    city: 'Mumbai',
    imageUrl: 'https://www.snkindia.com/images/projects/main/cathedral_arch_d(1).jpg'
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
