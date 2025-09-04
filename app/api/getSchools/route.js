// file: app/api/getSchools/route.js
import db from '../../../lib/db';

export async function GET() {
  try {
    console.log('Fetching schools from database...');
    const [schools] = await db.execute('SELECT * FROM schools ORDER BY id DESC');
    console.log('Schools found:', schools.length);
    
    return new Response(JSON.stringify(schools), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Database error:', error.message);
    return new Response(JSON.stringify({ 
      message: 'Failed to fetch schools.',
      error: error.message 
    }), { 
      status: 500 
    });
  }
}