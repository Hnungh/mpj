// data_sdk.js
(function() {
  const CART_KEY = "mycart";
  let _handler = null;
  
  /**
   * อ่านข้อมูลตะกร้าสินค้าจาก localStorage
   * @returns {Array} ข้อมูลตะกร้าสินค้า
   */
  function _readCart() {
    try { 
      // ตรวจสอบและคืนค่าเป็น Array เปล่าหากเกิดข้อผิดพลาด
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); 
    }
    catch (e) { 
      console.error("Error reading cart from localStorage:", e);
      return []; 
    }
  }
  
  /**
   * บันทึกข้อมูลตะกร้าสินค้าลงใน localStorage และแจ้งเตือน UI
   * @param {Array} cart - ข้อมูลตะกร้าสินค้าใหม่
   */
  function _saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // เรียก onDataChanged เพื่อแจ้งเตือน UI ให้ทำการอัปเดต
    if (_handler && typeof _handler.onDataChanged === "function") {
      _handler.onDataChanged(cart);
    }
  }
  
  /**
   * สร้าง ID ที่ไม่ซ้ำกันสำหรับรายการสินค้าในตะกร้า 
   * โดยใช้ Product ID, Size, และ Color
   * @param {Object} item - รายการสินค้า
   * @returns {string} __backendId
   */
  function genBackendId(item) {
    // ใช้ product_id, size, และ color ในการสร้าง ID
    return `${item.product_id}_${item.size || 'N/A'}_${item.color || 'N/A'}_${Date.now()}`;
  }
  
  // ============================================
  // GLOBAL DATA SDK INTERFACE
  // ============================================

  window.dataSdk = {
    /**
     * เริ่มต้นใช้งาน Data SDK และผูก Handler สำหรับการเปลี่ยนแปลงข้อมูล
     * @param {Object} handler - มีฟังก์ชัน onDataChanged(data)
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async init(handler) {
      _handler = handler;
      
      // ดักจับการเปลี่ยนแปลงของ localStorage จากแท็บอื่น ๆ 
      window.addEventListener("storage", (event) => {
        if (event.key === CART_KEY && handler && typeof handler.onDataChanged === "function") {
          handler.onDataChanged(_readCart());
        }
      });
      
      // โหลดข้อมูลเริ่มต้นหลัง init เล็กน้อยเพื่อให้แน่ใจว่า handler ถูกตั้งค่าแล้ว
      setTimeout(() => handler.onDataChanged(_readCart()), 50);
      return { isOk: true };
    },
    
    /**
     * เพิ่มรายการสินค้าใหม่ หรือเพิ่มจำนวนของรายการที่มีอยู่
     * @param {Object} item - รายการสินค้าใหม่ { product_id, name, price, quantity, size, color, image }
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async create(item) {
      let cart = _readCart();
      
      // ค้นหาว่ามีสินค้าที่มี product_id, size, และ color ตรงกันอยู่แล้วหรือไม่
      let idx = cart.findIndex(
        x => x.product_id === item.product_id &&
             x.size === item.size &&
             x.color === item.color
      );
      
      // กำหนดค่าเริ่มต้น
      const quantityToAdd = item.quantity && typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1;
      const priceValue = item.price && typeof item.price === 'number' ? item.price : 0;
      
      if (idx > -1) {
        // อัปเดตจำนวนสินค้าที่มีอยู่
        cart[idx].quantity += quantityToAdd;
      } else {
        // เพิ่มรายการสินค้าใหม่ พร้อมกำหนด __backendId
        cart.push({ 
          ...item, 
          price: priceValue,
          quantity: quantityToAdd, 
          __backendId: genBackendId(item) 
        });
      }
      
      _saveCart(cart);
      return { isOk: true };
    },
    
    /**
     * อัปเดตรายการสินค้าที่มีอยู่
     * @param {Object} item - รายการสินค้าที่ถูกอัปเดต (ต้องมี __backendId)
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async update(item) {
      let cart = _readCart();
      
      // ค้นหาด้วย __backendId เพื่อให้แน่ใจว่าอัปเดตรายการที่ถูกต้อง
      let idx = cart.findIndex(x => x.__backendId === item.__backendId);

      if (idx > -1) {
        // แทนที่รายการเดิมด้วยรายการที่ถูกอัปเดต
        cart[idx] = { ...item };
        _saveCart(cart);
        return { isOk: true };
      }
      return { isOk: false, error: 'Item not found for update' };
    },
    
    /**
     * ลบรายการสินค้าออกจากตะกร้า
     * @param {Object} item - รายการสินค้าที่ต้องการลบ (ต้องมี __backendId)
     * @returns {Promise<Object>} { isOk: boolean }
     */
    async delete(item) {
      if (!item.__backendId) {
         return { isOk: false, error: 'Missing __backendId for delete' };
      }
      
      let cart = _readCart();
      
      // กรองออกเฉพาะรายการที่มี __backendId ไม่ตรงกัน
      cart = cart.filter(x => x.__backendId !== item.__backendId);
      
      _saveCart(cart);
      return { isOk: true };
    }
  };
})();
