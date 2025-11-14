/* ==========================================
   MENU DATA
   ========================================== */

const menuItems = [
  {
    "id": 1,
    "name": "Acai Power Bowl",
    "category": "breakfast",
    "description": "Organic acai base with granola, berries, coconut, and honey drizzle",
    "price": 12.99,
    "image": "https://images.unsplash.com/photo-1672303185512-399a42b2cf4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxBY2FpJTIwUG93ZXIlMjBCb3dsfGVufDB8fHx8MTc2MTYyMzA0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 2,
    "name": "Avocado Toast",
    "category": "breakfast",
    "description": "Whole grain toast with smashed organic avocado, cherry tomatoes, and herbs",
    "price": 10.99,
    "image": "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxBdm9jYWRvJTIwVG9hc3R8ZW58MHx8fHwxNzYxNjIzMDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 3,
    "name": "Green Smoothie Bowl",
    "category": "breakfast",
    "description": "Spinach, kale, banana, coconut milk with fresh toppings",
    "price": 11.99,
    "image": "https://images.unsplash.com/photo-1600728256404-aaa448921ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxHcmVlbiUyMFNtb290aGllJTIwQm93bHxlbnwwfHx8fDE3NjE2MjMwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 4,
    "name": "Organic Egg Scramble",
    "category": "breakfast",
    "description": "Free-range eggs with fresh vegetables, whole wheat toast",
    "price": 9.99,
    "image": "https://images.unsplash.com/photo-1579249869574-5839f4ac516d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwRWdnJTIwU2NyYW1ibGV8ZW58MHx8fHwxNzYxNjIzMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 5,
    "name": "Greek Yogurt Parfait",
    "category": "breakfast",
    "description": "Organic Greek yogurt, fresh berries, granola, and honey",
    "price": 8.99,
    "image": "https://images.unsplash.com/photo-1571230389215-b34a89739ef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxHcmVlayUyMFlvZ3VydCUyMFBhcmZhaXR8ZW58MHx8fHwxNzYxNjIzMDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 6,
    "name": "Quinoa Breakfast Bowl",
    "category": "breakfast",
    "description": "Protein-packed quinoa with almond butter, banana, and cinnamon",
    "price": 10.99,
    "image": "https://images.unsplash.com/photo-1665674053062-4ff91c7204e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxRdWlub2ElMjBCcmVha2Zhc3QlMjBCb3dsfGVufDB8fHx8MTc2MTYyMzA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 7,
    "name": "Grilled Chicken Salad",
    "category": "lunch",
    "description": "Organic greens, grilled chicken breast, seasonal vegetables, vinaigrette",
    "price": 13.99,
    "image": "https://images.unsplash.com/photo-1604909052743-94e838986d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxHcmlsbGVkJTIwQ2hpY2tlbiUyMFNhbGFkfGVufDB8fHx8MTc2MTYyMzA1MXww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 8,
    "name": "Mediterranean Wrap",
    "category": "lunch",
    "description": "Whole wheat wrap with hummus, feta, tomatoes, cucumbers, olives",
    "price": 11.99,
    "image": "https://images.unsplash.com/photo-1560325724-42efbe42d4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxNZWRpdGVycmFuZWFuJTIwV3JhcHxlbnwwfHx8fDE3NjE2MjMwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 9,
    "name": "Buddha Power Bowl",
    "category": "lunch",
    "description": "Quinoa, roasted vegetables, chickpeas, tahini dressing",
    "price": 12.99,
    "image": "https://images.unsplash.com/photo-1579016759615-dcfd5813b6ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxCdWRkaGElMjBQb3dlciUyMEJvd2x8ZW58MHx8fHwxNzYxNjIzMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 10,
    "name": "Organic Veggie Sandwich",
    "category": "lunch",
    "description": "Artisan bread with fresh vegetables, sprouts, and pesto mayo",
    "price": 10.99,
    "image": "https://images.unsplash.com/photo-1720026664794-9f2909cda2fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwVmVnZ2llJTIwU2FuZHdpY2h8ZW58MHx8fHwxNzYxNjIzMDUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 11,
    "name": "Grilled Salmon Plate",
    "category": "lunch",
    "description": "Wild-caught salmon with roasted vegetables and quinoa",
    "price": 15.99,
    "image": "https://images.unsplash.com/photo-1704007573697-6a516da421ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxHcmlsbGVkJTIwU2FsbW9uJTIwUGxhdGV8ZW58MHx8fHwxNzYxNjIzMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 12,
    "name": "Falafel Combo",
    "category": "lunch",
    "description": "Organic falafel, hummus, tabbouleh, pita bread",
    "price": 11.99,
    "image": "https://images.unsplash.com/photo-1734772591537-15ac1b3b3c04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxGYWxhZmVsJTIwQ29tYm98ZW58MHx8fHwxNzYxNjIzMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 13,
    "name": "Green Detox Smoothie",
    "category": "beverages",
    "description": "Spinach, ginger, apple, celery, lemon juice",
    "price": 7.99,
    "image": "https://images.unsplash.com/photo-1613637028036-ca0b31a4ad12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxHcmVlbiUyMERldG94JTIwU21vb3RoaWV8ZW58MHx8fHwxNzYxNjIzMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 14,
    "name": "Tropical Mango Smoothie",
    "category": "beverages",
    "description": "Fresh mango, pineapple, coconut milk, banana",
    "price": 7.99,
    "image": "https://images.unsplash.com/photo-1552070406-cd6666523132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxUcm9waWNhbCUyME1hbmdvJTIwU21vb3RoaWV8ZW58MHx8fHwxNzYxNjIzMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 15,
    "name": "Berry Blast Smoothie",
    "category": "beverages",
    "description": "Mixed berries, Greek yogurt, honey, almond milk",
    "price": 8.99,
    "image": "https://images.unsplash.com/photo-1707256825526-d03615da12aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxCZXJyeSUyMEJsYXN0JTIwU21vb3RoaWV8ZW58MHx8fHwxNzYxNjIzMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 16,
    "name": "Organic Cold Brew",
    "category": "beverages",
    "description": "Smooth, organic cold brew coffee with choice of milk",
    "price": 4.99,
    "image": "https://images.unsplash.com/photo-1733324770546-edb9dd4fe556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwQ29sZCUyMEJyZXd8ZW58MHx8fHwxNzYxNjIzMDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 17,
    "name": "Matcha Latte",
    "category": "beverages",
    "description": "Organic matcha green tea powder with steamed milk",
    "price": 5.99,
    "image": "https://images.unsplash.com/photo-1582785513054-8d1bf9d69c1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxNYXRjaGElMjBMYXR0ZXxlbnwwfHx8fDE3NjE2MjMwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 18,
    "name": "Fresh Lemonade",
    "category": "beverages",
    "description": "Homemade lemonade with fresh lemons and organic agave",
    "price": 4.99,
    "image": "https://images.unsplash.com/photo-1665582295782-eecc2e25b74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxGcmVzaCUyMExlbW9uYWRlfGVufDB8fHx8MTc2MTYyMzA1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 19,
    "name": "Raw Chocolate Cake",
    "category": "desserts",
    "description": "Organic raw chocolate cake with cashew frosting",
    "price": 7.99,
    "image": "https://images.unsplash.com/photo-1642423927418-fdac74328f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxSYXclMjBDaG9jb2xhdGUlMjBDYWtlfGVufDB8fHx8MTc2MTYyMzA1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 20,
    "name": "Vegan Banana Bread",
    "category": "desserts",
    "description": "Moist, plant-based banana bread with walnuts",
    "price": 5.99,
    "image": "https://images.unsplash.com/photo-1676976198391-2c1d84dfe1cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxWZWdhbiUyMEJhbmFuYSUyMEJyZWFkfGVufDB8fHx8MTc2MTYyMzA1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 21,
    "name": "Almond Butter Cookies",
    "category": "desserts",
    "description": "Gluten-free almond butter cookies with dark chocolate chips",
    "price": 4.99,
    "image": "https://images.unsplash.com/photo-1608455362846-c08608c2d5ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxBbG1vbmQlMjBCdXR0ZXIlMjBDb29raWVzfGVufDB8fHx8MTc2MTYyMzA1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 22,
    "name": "Organic Berry Cheesecake",
    "category": "desserts",
    "description": "No-bake cheesecake with organic berries and dates",
    "price": 6.99,
    "image": "https://images.unsplash.com/photo-1695088957420-c3b97d1f1138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxPcmdhbmljJTIwQmVycnklMjBDaGVlc2VjYWtlfGVufDB8fHx8MTc2MTYyMzA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 23,
    "name": "Chia Seed Pudding",
    "category": "desserts",
    "description": "Organic chia seeds, coconut milk, topped with berries",
    "price": 6.99,
    "image": "https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxDaGlhJTIwU2VlZCUyMFB1ZGRpbmd8ZW58MHx8fHwxNzYxNjIzMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  },
  {
    "id": 24,
    "name": "Coconut Energy Balls",
    "category": "desserts",
    "description": "No-bake coconut, dates, and dark chocolate bites",
    "price": 5.99,
    "image": "https://images.unsplash.com/photo-1734773487516-078839ea277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjI0OTJ8MHwxfHNlYXJjaHwxfHxDb2NvbnV0JTIwRW5lcmd5JTIwQmFsbHN8ZW58MHx8fHwxNzYxNjIzMDYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "crop": null
  }
];

console.log("Menu data loaded successfully");
