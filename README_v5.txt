# NationNest v5 — Enterprise Add‑ons
สิ่งที่เพิ่ม:
- โลโก้แบรนด์ (assets/logo.png) อัปเดตแล้ว
- Listings: Heatmap หลายเลเยอร์ตามประเภท (คอนโด/บ้านเดี่ยว/ทาวน์โฮม/ที่ดิน) + Cluster per type + Layer control
- Isochrone (เวลาเดินทาง): รองรับ Mapbox หรือ OpenRouteService (ใส่ token ใน data/config.js)
- Admin: Supabase Auth + บทบาท Agent/Reviewer/Admin (ตัวอย่างสคีมา + นโยบาย) + status (draft/pending/approved/rejected)
- Admin: Import จาก Google Sheet (CSV publish) → upsert to Supabase
- Admin/Reports: โหลด Leads จาก CSV (Google Sheet publish) + Export CSV
- Site: อ่านเฉพาะ status = approved เมื่อดึงจาก Supabase

## Tokens สำหรับ Isochrone
แก้ `data/config.js`:
- `mapboxToken: "..."` (ใช้ผู้ให้บริการ Mapbox)
- หรือ `orsToken: "..."` (OpenRouteService)

## Roles & Approval
รัน `admin/SUPABASE_SCHEMA.sql` ใน SQL Editor (พร้อม profiles + status) แล้วสร้างผู้ใช้/กำหนด role ในตาราง `profiles`

## Import CSV ตัวอย่าง column
`title,price,area,beds,baths,type,province,location,lat,lng,cover,images,description,status`
- `images` ให้คั่นรูปด้วย `|`

