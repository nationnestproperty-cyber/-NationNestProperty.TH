# ตั้งค่า Google Sheet Leads (Apps Script) แบบเร็ว
1) ไปที่ https://script.google.com/ > สร้างโปรเจ็กต์ใหม่
2) วางโค้ดนี้:
   function doPost(e){
     var ss = SpreadsheetApp.openByUrl('<<วางลิงก์ Google Sheet ของคุณ>>');
     var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');
     var data = JSON.parse(e.postData.contents);
     if(sh.getLastRow()===0){ sh.appendRow(['ts','name','phone','email','topic','message','propertyId','propertyTitle','price']); }
     sh.appendRow([data.ts||new Date(), data.name||'', data.phone||'', data.email||'', data.topic||'', data.message||'', data.propertyId||'', data.propertyTitle||'', data.price||'']);
     return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
   }
3) เมนู Deploy > New deployment > Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Copy URL ที่ได้ แล้วนำไปใส่ใน `data/config.js` ค่า `googleAppsScript`
4) เปิด `leads.html` หรือฟอร์มในหน้า `property.html` ทดสอบส่ง จะถูกบันทึกลงชีต
