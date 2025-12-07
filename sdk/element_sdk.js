// element_sdk.js

// Mock สำหรับ Element SDK เพื่อป้องกันการเกิด error เมื่อโค้ด UI เรียกใช้
(function() {
  
  const ELEMENT_SDK_MOCK = {
    
    // สถานะ Mock Configuration
    config: {},
    
    /**
     * Mock สำหรับฟังก์ชัน init: ใช้ในการรับค่า default config และ onConfigChange handler
     * @param {Object} params - พารามิเตอร์ที่ส่งมาจาก UI (defaultConfig, onConfigChange, mapToCapabilities, ฯลฯ)
     */
    init: function(params) {
      if (params.defaultConfig) {
          // เก็บค่าเริ่มต้น
          this.config = params.defaultConfig;
      }
      
      // เรียก onConfigChange ทันทีด้วยค่าเริ่มต้น เพื่อจำลองการตั้งค่าครั้งแรก
      if (params.onConfigChange && typeof params.onConfigChange === 'function') {
          params.onConfigChange(this.config);
      }

      // สามารถผูก handler ไว้ได้ หากต้องการให้มีการเรียกซ้ำ
      this._handler = params.onConfigChange;

      console.log("Element SDK Mock Initialized.");
    },
    
    /**
     * Mock สำหรับฟังก์ชัน getConfig: ดึงค่า config ปัจจุบัน
     * @returns {Promise<Object>} Mock config
     */
    getConfig: async function() { 
      return this.config; 
    },
    
    /**
     * Mock สำหรับฟังก์ชัน setConfig: ใช้เพื่ออัปเดต config และเรียก handler
     * @param {Object} newConfig - ค่า config ที่ต้องการอัปเดต
     */
    setConfig: function(newConfig) {
      // อัปเดต config
      this.config = { ...this.config, ...newConfig };
      
      // เรียก handler เพื่อจำลองการอัปเดต UI
      if (this._handler && typeof this._handler === 'function') {
         this._handler(this.config);
      }
    },
    
    /**
     * Mock สำหรับฟังก์ชัน onConfigChange (ใช้ภายใน init เท่านั้น)
     */
    onConfigChange: function (handler) {
      // ไม่ทำอะไรใน Mock นี้ เนื่องจาก init ได้จัดการไปแล้ว
    }
  };

  // กำหนดให้เป็น Global Object
  window.elementSdk = ELEMENT_SDK_MOCK;
})();
