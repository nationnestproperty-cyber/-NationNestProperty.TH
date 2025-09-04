# Deploy วันนี้ (ฟรี)
วิธีเร็วสุด: Netlify Drop

1) ไปที่ https://app.netlify.com/drop
2) ลากโฟลเดอร์ทั้งหมดนี้ (หรือ zip) ไปวาง → จะได้โดเมนฟรี *.netlify.app
3) จำชื่อโดเมนที่ได้ เช่น: mysite.netlify.app
4) เปิดไฟล์ robots.txt และ sitemap.xml ในโปรเจ็กต์นี้ แล้วแก้โดเมนให้ตรง เช่น https://mysite.netlify.app
5) อัปโหลดไฟล์ที่แก้กลับเข้า Netlify (กด "New deploy" → Upload folder) เพื่ออัปเดตให้สมบูรณ์

ทางเลือกอื่นฟรี:
- Cloudflare Pages: https://pages.cloudflare.com/ (Create Project → Direct Upload)
- Vercel: https://vercel.com/ (Import → Deploy)

หมายเหตุ SEO:
- Search Console: เพิ่มโดเมน *.netlify.app ของคุณ แล้วส่ง sitemap.xml
- GA4/GTM: ใส่สคริปต์ใน index.html และ property.html ได้ทันที
- เปลี่ยนรูป OG/Twitter ที่ assets/img/placeholder.jpg ตามโลโก้แบรนด์

อัปเดตล่าสุด: 2025-09-04
