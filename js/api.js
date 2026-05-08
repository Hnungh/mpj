/* ═══════════════════════════════════════
   BARDS — API Layer
   ดึงข้อมูลสินค้าจาก Supabase Edge Function
   Key ซ่อนอยู่ใน Server ไม่โชว์ใน HTML
═══════════════════════════════════════ */
const BARDS_API = 'https://didnquegkwiubxbkvilv.supabase.co/functions/v1/hyper-handler';

async function fetchProducts() {
    const res = await fetch(BARDS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    });
    const data = await res.json();
    return data.map(p => ({
        ...p,
        isNew:     p.is_new,
        dateAdded: p.date_added,
        colors:    typeof p.colors === 'string' ? JSON.parse(p.colors) : (p.colors || []),
        specs:     typeof p.specs  === 'string' ? JSON.parse(p.specs)  : (p.specs  || {}),
        images:    p.images || [],
        sizes:     p.sizes  || [],
    }));
}
