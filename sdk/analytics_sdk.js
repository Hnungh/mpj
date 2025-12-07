// analytics_sdk.js

// Mock สำหรับ Analytics SDK เพื่อใช้ในการติดตามกิจกรรมของผู้ใช้
(function() {
  
  const ANALYTICS_SDK_MOCK = {
    
    // สถานะการเริ่มต้น
    isInitialized: false,
    
    /**
     * เริ่มต้นใช้งาน Analytics SDK
     * @param {Object} config - การตั้งค่าเริ่มต้น
     */
    init: function(config = {}) {
      if (this.isInitialized) {
        console.warn("Analytics SDK already initialized.");
        return;
      }
      this.isInitialized = true;
      console.log("📊 Analytics SDK Mock Initialized.", config);
    },
    
    /**
     * ติดตามการเข้าชมหน้า
     * @param {string} pageName - ชื่อหน้า (เช่น Product Detail, Cart)
     * @param {string} pagePath - URL Path
     */
    trackPageView: function(pageName, pagePath = window.location.pathname) {
      if (!this.isInitialized) {
        console.warn("Analytics SDK not initialized. Call init() first.");
        return;
      }
      console.log(`[PAGEVIEW] Page: ${pageName}, Path: ${pagePath}`);
    },
    
    /**
     * ติดตามเหตุการณ์ที่เกิดขึ้น
     * @param {string} eventName - ชื่อเหตุการณ์ (เช่น AddToCart, CheckoutStart)
     * @param {Object} eventData - ข้อมูลเพิ่มเติมเกี่ยวกับเหตุการณ์
     */
    trackEvent: function(eventName, eventData = {}) {
      if (!this.isInitialized) {
        console.warn("Analytics SDK not initialized. Call init() first.");
        return;
      }
      console.log(`[EVENT] Name: ${eventName}`, { timestamp: new Date().toISOString(), ...eventData });
    },
    
    /**
     * ระบุตัวผู้ใช้
     * @param {string} userId - ID ผู้ใช้
     * @param {Object} properties - คุณสมบัติของผู้ใช้
     */
    identify: function(userId, properties = {}) {
      if (!this.isInitialized) {
        console.warn("Analytics SDK not initialized. Call init() first.");
        return;
      }
      console.log(`[USER] Identified User ID: ${userId}`, properties);
    }
  };

  // กำหนดให้เป็น Global Object
  window.analyticsSdk = ANALYTICS_SDK_MOCK;
})();
