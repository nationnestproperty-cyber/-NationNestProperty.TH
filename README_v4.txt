# NationNest v4 — ฟีเจอร์ใหม่
- สถานีรถไฟฟ้าครอบคลุม BTS/MRT/ARL (data/stations_full.js)
- Listings Map: Marker Cluster + Heatmap + ค้นหารอบตัวฉัน (Geolocation)
- การ์ดสไลด์รูป + Lightbox (ภาพ/วิดีโอ) ในหน้า property
- ปุ่ม Line/โทร แสดงเฉพาะมือถือ
- ระบบหลังบ้านจริงผ่าน Supabase (admin/)
- เว็บไซต์อ่านข้อมูลจาก Supabase อัตโนมัติถ้าตั้งค่า (fallback เป็น data/listings.js)

## วิธีใช้ Supabase (สรุปเร็ว)
1) สมัคร Supabase > สร้าง Project
2) เปิด SQL Editor > วางไฟล์ `admin/SUPABASE_SCHEMA.sql` แล้วรัน
3) Storage > สร้าง Bucket ชื่อ `properties` (public)
4) คัดลอก `Project URL` และ `anon public key`
5) เปิด `admin/index.html` ใส่ URL/Key, กด "บันทึก" แล้ว "ทดสอบเชื่อมต่อ"
6) เพิ่มทรัพย์/อัปโหลดรูป จากหน้า admin ได้เลย
7) ฝั่งเว็บไซต์จะดึงข้อมูลจาก Supabase อัตโนมัติ (ถ้าตั้งค่าแล้ว)

> ไม่อยากใช้ Supabase ก็ไม่เป็นไร เว็บจะใช้ `data/listings.js` ตามเดิม

## วิดีโอ Hero
- ใส่ไฟล์ `assets/hero.mp4` หรือแก้ `data/config.js` ค่า `videoUrl` ให้เป็นลิงก์ MP4

## Leads → Google Sheets
- อ่าน `README_Leads_GAS.txt` ทำตาม 4 STEP แล้วใส่ URL ที่ `data/config.js` -> `googleAppsScript`

