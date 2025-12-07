// data_utility.js

// Mock data utility (ใช้เป็น Mock Data source แทน API จริง)
// ประกาศเป็น global variable: MOCK_PRODUCTS_DATA
const MOCK_PRODUCTS_DATA = [
  {
    id: 'oversized-tee-black',
    name: 'Classic Black Oversized Tee',
    price: 790,
    description: 'เสื้อยืดโอเวอร์ไซส์สีดำคลาสสิก ผลิตจากผ้าคอตตอน 100% ทรงหลวมสบาย เหมาะสำหรับลุคสตรีทและใส่ได้ทุกวัน',
    image: 'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg',
    category: 'OVERSIZED TEE',
    available_sizes: ['XS', 'S', 'M', 'L', 'XL'],
    available_colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg', 
        'https://hnungh.github.io/mcl/img/hoodie-grey.jpg', // Mock secondary image
        'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg', // Mock secondary image
        // สามารถเพิ่ม URL รูปภาพเพิ่มเติมได้ที่นี่
    ]
  },
  {
    id: 'cargo-pants-olive',
    name: 'Military Olive Cargo Pants',
    price: 1590,
    description: 'กางเกงคาร์โก้สีเขียวมะกอก ดีไซน์สไตล์ทหาร มีกระเป๋าหลายช่อง ให้ความทนทานและฟังก์ชันการใช้งานสูง',
    image: 'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg',
    category: 'CARGO PANTS',
    available_sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    available_colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Black', hex: '#000000' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/cargo-pants-olive.jpg', 
        'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg', // Mock secondary image
    ]
  },
  {
    id: 'hoodie-grey',
    name: 'Stone Grey Pullover Hoodie',
    price: 1290,
    description: 'เสื้อฮู้ดดี้สีเทาหิน ทรงคลาสสิก ผ้านุ่มพิเศษ ให้ความอบอุ่น เหมาะสำหรับฤดูหนาวและลุคสบายๆ',
    image: 'https://hnungh.github.io/mcl/img/hoodie-grey.jpg',
    category: 'PULLOVER HOODIE',
    available_sizes: ['S', 'M', 'L', 'XL'],
    available_colors: [{ name: 'Grey', hex: '#808080' }, { name: 'Navy', hex: '#000080' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/hoodie-grey.jpg',
    ]
  },
  {
    id: 'sunglasses-retro',
    name: 'Retro Square Sunglasses',
    price: 890,
    description: 'แว่นตากันแดดทรงสี่เหลี่ยมสไตล์ย้อนยุค เฟรมหนาและเลนส์คุณภาพสูง ปกป้องดวงตาจากแสงแดดได้ดี',
    image: 'https://hnungh.github.io/mcl/img/sunglasses-retro.jpg',
    category: 'SUNGLASSES',
    available_sizes: ['One Size'],
    available_colors: [{ name: 'Black', hex: '#000000' }, { name: 'Tortoise', hex: '#824510' }],
    gallery_images: [
        'https://hnungh.github.io/mcl/img/sunglasses-retro.jpg',
    ]
  },
    // เพิ่มสินค้าสำหรับ Carousel (Trending Products)
  {
    id: 'product-005',
    name: 'Vintage Dad Cap',
    price: 490,
    image: 'https://hnungh.github.io/mcl/img/sunglasses-retro.jpg', // ใช้รูปเดิมเป็น Mock
    category: 'CAPS'
  },
  {
    id: 'product-006',
    name: 'Chunky Sneaker (White)',
    price: 2590,
    image: 'https://hnungh.github.io/mcl/img/hoodie-grey.jpg', // ใช้รูปเดิมเป็น Mock
    category: 'FOOTWEAR'
  },
  {
    id: 'product-007',
    name: 'Graffiti T-Shirt',
    price: 850,
    image: 'https://hnungh.github.io/mcl/img/oversized-tee-black.jpg', // ใช้รูปเดิมเป็น Mock
    category: 'GRAPHIC TEE'
  },
];
