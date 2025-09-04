// update-images-4.js
import db from './lib/db.js';

const updates = [
  {
    name: 'South Point High School',
    city: 'Kolkata',
    imageUrl: 'https://images.uniapply.com/uploads/college/image/500/7818/South_Point_High_School_7499_Building_1_UA_2.jpg'
  },
  {
    name: 'Vidya Mandir Senior Secondary School',
    city: 'Chennai',
    imageUrl: 'https://www.yayskool.com/images/school/vidya-mandir-senior-secondary-school-chennai-460718322.png'
  },
  {
    name: 'The School KFI',
    city: 'Chennai',
    imageUrl: 'https://uniformapp.in/blog/wp-content/uploads/2022/05/The-School-KFI-Adyar-Chennai.jpg'
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
