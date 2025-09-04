import db from '../../../lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    // Support both JSON and multipart/form-data
    let name, address, city, state, contact, email_id, imageUrl;
    let uploadedFileUrl = null;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      name = form.get('name');
      address = form.get('address');
      city = form.get('city');
      state = form.get('state');
      contact = form.get('contact');
      email_id = form.get('email_id');
      imageUrl = form.get('imageUrl');

      const file = form.get('imageFile');
      if (file && typeof file === 'object' && file.arrayBuffer) {
        const bytes = Buffer.from(await file.arrayBuffer());
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadsDir, { recursive: true });
        const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9_.-]/g, '')}`;
        const filePath = path.join(uploadsDir, fileName);
        await writeFile(filePath, bytes);
        uploadedFileUrl = `/uploads/${fileName}`;
      }
    } else {
      ({ name, address, city, state, contact, email_id, imageUrl } = await request.json());
    }

    if (!name || !address || !city || !state || !contact || !email_id) {
      return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
    }

    const finalImage = uploadedFileUrl || imageUrl || null;

    const [result] = await db.execute(
      `INSERT INTO schools (name, address, city, state, contact, email_id, imageUrl) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email_id, finalImage]
    );

    return new Response(JSON.stringify({ 
      message: 'School added successfully!', 
      schoolId: result.insertId
    }), { status: 200 });

  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error. Could not add school.' }), { status: 500 });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ message: "Method GET Not Allowed" }), { status: 405 });
}