// Array containing multiple user data objects
const backup1 = {"breakfast": {
        "entree": {
          "name": "Spiced Apple Oatmeal",
          "ingredients": "Gluten-free oats, grated apple, cinnamon, nutmeg, almond milk",
          "calories": 300,
          "servingSizeinGrams": 250
        },
        "side": {
          "name": "Mixed Berries",
          "ingredients": "Blueberries, raspberries, blackberries",
          "calories": 70,
          "servingSizeinGram": 100
        },
        "drink": {
          "name": "Herbal Tea",
          "calories": 0,
          "ingredients": "Peppermint tea leaves",
          "servingSizeinOZ": 12
        },
        "totalMealCalories": 370
      },
      "lunch": {
        "entree": {
          "name": "Grilled Portobello with Avocado",
          "ingredients": "Portobello mushrooms, avocado, lemon juice, olive oil, garlic, arugula",
          "calories": 320,
          "servingSizeinGrams": 270
        },
        "side": {
          "name": "Kale Salad",
          "ingredients": "Kale, lemon dressing, pine nuts",
          "calories": 150,
          "servingSizeinGram": 150
        },
        "drink": {
          "name": "Kombucha",
          "calories": 60,
          "ingredients": "Organic kombucha",
          "servingSizeinOZ": 8
        },
        "totalMealCalories": 530
      },
      "afternoonSnack": {
        "entree": {
          "name": "Carrot and Cucumber Sticks",
          "ingredients": "Carrots, cucumber",
          "calories": 45
        },
        "totalMealCalories": 45
      },
      "dinner": {
        "entree": {
          "name": "Lamb Spinach Curry",
          "ingredients": "Lamb shoulder, spinach, spices, olive oil",
          "calories": 400,
          "servingSizeinGrams": 300
        },
        "side": {
          "name": "Cauliflower Rice",
          "ingredients": "Cauliflower, garlic powder",
          "calories": 85,
          "servingSizeinGram": 150
        },
        "drink": {
          "name": "Sparkling Water",
          "calories": 0,
          "servingSizeinOZ": 12,
          "ingredients": "Carbonated water"
        },
        "dessert": {
          "name": "Dark Chocolate",
          "ingredients": "Cocoa, stevia",
          "calories": 180,
          "qty": "40g"
        },
        "totalMealCalories": 665
      },
      "totalDayCalories": 1610
    };
    const backup2 = {
    "breakfast": {
        "entree": {
          "name": "Vegetable and Lamb Quinoa Salad",
          "ingredients": "100g cooked quinoa, 50g roasted lamb, 200g mixed vegetables (spinach, tomatoes, bell peppers, zucchini), mixed herbs, olive oil",
          "calories": 425,
          "servingSizeinGrams": "350g"
        },
        "side": {
          "name": "Golden Flaxseed Cracker",
          "ingredients": "Golden flaxseeds, water, salt",
          "calories": 90,
          "servingSizeinGrams": "40g"
        },
        "drink": {
          "name": "Almond Latte",
          "ingredients": "Almond milk, espresso",
          "calories": 70,
          "servingSizeinOZ": "12oz"
        },
        "totalMealCalories": 585
      },
      "morningSnack": {
        "entree": {
          "name": "Mixed Berry Smoothie",
          "ingredients": "Blueberries, strawberries, stevia, almond milk",
          "calories": 245,
          "servingSizeinGrams": "250g"
        },
        "totalMealCalories": 245
      },
      "lunch": {
        "entree": {
          "name": "Zesty Lime Shrimp Avocado Salad",
          "ingredients": "Shrimps, avocados, lime, olive oil, herbs, lettuce, cucumber",
          "calories": 257,
          "servingSizeinGrams": "250g"
        },
        "side": {
          "name": "Sweet Potato Cubes",
          "ingredients": "Sweet potato, cinnamon",
          "calories": 120,
          "servingSizeinGrams": "100g"
        },
        "drink": {
          "name": "Sparkling Water",
          "ingredients": "Carbonated water, natural flavor",
          "calories": 0,
          "servingSizeinOZ": "12oz"
        },
        "totalMealCalories": 377
      },
      "afternoonSnack": {
        "entree": {
          "name": "Carrot and Hummus Sticks",
          "ingredients": "Carrot sticks, Oz O Roasted Garlic Hummus",
          "calories": 115,
          "servingSizeinGrams": "120g"
        },
        "totalMealCalories": 115
      },
      "dinner": {
        "entree": {
          "name": "Venison Steak with Sauteed Kale",
          "ingredients": "200g venison steak, kale, garlic, olive oil",
          "calories": 350,
          "servingSizeinGrams": "300g"
        },
        "side": {
          "name": "Roasted Squash with Herbs",
          "ingredients": "Butternut squash, rosemary, thyme, salt, pepper",
          "calories": 190,
          "servingSizeinGrams": "200g"
        },
        "drink": {
          "name": "Herbal Tea",
          "ingredients": "Chamomile, stevia",
          "calories": 2,
          "servingSizeinOZ": "8oz"
        },
        "totalMealCalories": 542
      },
      "totalDayCalories": 1864
    };
    const backup3 = {
    "breakfast": {
        "entree": {
          "name": "Scrambled Tofu",
          "ingredients": "Tofu, turmeric, black pepper, olive oil, spinach",
          "calories": 280,
          "servingSizeinGrams": 250
        },
        "side": {
          "name": "Roasted Sweet Potatoes",
          "ingredients": "Sweet potatoes, olive oil, rosemary",
          "calories": 162,
          "servingSizeinGrams": 150
        },
        "drink": {
          "name": "Herbal Tea",
          "calories": 0,
          "ingredients": "Peppermint leaves",
          "servingSizeinOZ": 12
        },
        "totalMealCalories": 442
      },
      "lunch": {
        "entree": {
          "name": "Spiralized Zucchini and Carrots",
          "ingredients": "Zucchini, carrots, lemon juice, garlic, olive oil",
          "calories": 124,
          "servingSizeinGrams": 300
        },
        "side": {
          "name": "Quinoa Salad",
          "ingredients": "Quinoa, cherry tomatoes, cucumbers, parsley, lemon dressing",
          "calories": 190,
          "servingSizeinGrams": 200
        },
        "drink": {
          "name": "Sparkling Water",
          "calories": 0,
          "servingSizeinOZ": 12
        },
        "totalMealCalories": 314
      },
      "afternoonSnack": {
        "entree": {
          "name": "Kale Chips",
          "ingredients": "Kale, olive oil, sea salt",
          "calories": 58
        },
        "totalMealCalories": 58
      },
      "dinner": {
        "entree": {
          "name": "Grilled Eggplant with Tahini Sauce",
          "ingredients": "Eggplant, tahini, garlic, lemon juice",
          "calories": 180,
          "servingSizeinGrams": 250
        },
        "side": {
          "name": "Mixed Greens Salad",
          "ingredients": "Mixed greens, balsamic vinegar, olive oil",
          "calories": 112,
          "servingSizeinGrams": 150
        },
        "drink": {
          "name": "Decaf Black Coffee",
          "calories": 0,
          "ingredients": "Water, decaf coffee beans",
          "servingSizeinOZ": 8
        },
        "dessert": {
          "name": "Mixed berries",
          "ingredients": "Strawberries, blueberries, raspberries",
          "calories": 70,
          "qty": "1 cup"
        },
        "totalMealCalories": 362
      },
      "totalDayCalories": 1176
    };
const backup4 = {
    "breakfast": {
        "entree": {
          "name": "Spinach and Mushroom Omelette (Vegan)",
          "ingredients": "Chickpea flour, spinach, mushrooms, onions, turmeric, black salt",
          "calories": 280,
          "servingSizeinGrams": 200
        },
        "side": {
          "name": "Baked Sweet Potato Fries",
          "ingredients": "Sweet potatoes, olive oil, paprika, garlic powder",
          "calories": 150,
          "servingSizeinGrams": 100
        },
        "drink": {
          "name": "Black Coffee",
          "ingredients": "Filtered water, coffee beans",
          "calories": 5,
          "servingSizeinOZ": 8
        },
        "totalMealCalories": 435
      },
      "lunch": {
        "entree": {
          "name": "Zucchini Noodles with Avocado Pesto",
          "ingredients": "Zucchini, avocado, pine nuts-free pesto, lemon juice, clove, olive oil",
          "calories": 350,
          "servingSizeinGrams": 250
        },
        "side": {
          "name": "Quinoa Salad",
          "ingredients": "Quinoa, red bell pepper, black beans, corn, lime juice, cilantro",
          "calories": 180,
          "servingSizeinGrams": 150
        },
        "drink": {
          "name": "Herbal Tea (Caffeine-free)",
          "ingredients": "Water, assorted herbal tea",
          "calories": 0,
          "servingSizeinOZ": 8
        },
        "totalMealCalories": 530
      },
      "afternoonSnack": {
        "entree": {
          "name": "Apple and Cinnamon Muffin (Vegan, Sugary)",
          "ingredients": "Oat flour, apple, cinnamon, almond milk, baking powder",
          "calories": 190,
          "servingSizeinGrams": 75
        },
        "totalMealCalories": 190
      },
      "dinner": {
        "entree": {
          "name": "Cauliflower Steak",
          "ingredients": "Cauliflower, ground turmeric, smoked paprika, olive oil",
          "calories": 230,
          "servingSizeinGrams": 200
        },
        "side": {
          "name": "Mixed Green Salad",
          "ingredients": "Kale, spinach, arugula, balsamic vinegar, olive oil",
          "calories": 110,
          "servingSizeinGrams": 150
        },
        "drink": {
          "name": "Sparkling Water with Lemon Slice",
          "ingredients": "Sparkling mineral water, lemon",
          "calories": 5,
          "servingSizeinOZ": 8
        },
        "totalMealCalories": 345
      },
      "totalDayCalories": 1500
};

const backup5 = {
    "breakfast": {
        "entree": {
          "name": "Avocado and Spinach Smoothie",
          "ingredients": "Avocado, Spinach, Flaxseeds, Lemon Juice, Ginger, Water",
          "calories": 300,
          "servingSizeinGrams": 350
        },
        "side": {
          "name": "Mixed Berries",
          "ingredients": "Blueberries, Strawberries",
          "calories": 70,
          "servingSizeinGram": 100
        },
        "drink": {
          "name": "Herbal Tea",
          "calories": 0,
          "ingredients": "Herb Blend",
          "servingSizeinOZ": 12
        },
        "totalMealCalories": 370
      },
      "morningSnack": {
        "entree": {
          "name": "Carrot and Hummus",
          "ingredients": "Carrots, Olive Oil-based Hummus",
          "calories": 150,
          "servingSizeinGrams": 90
        },
        "totalMealCalories": 150
      },
      "lunch": {
        "entree": {
          "name": "Zucchini Noodles with Pesto",
          "ingredients": "Zucchini, Fresh Basil, Olive Oil, Garlic, Lemon Juice, Salt",
          "calories": 320,
          "servingSizeinGrams": 250
        },
        "side": {
          "name": "Tomato Salad",
          "ingredients": "Tomatoes, Olive Oil, Balsamic Vinegar, Salt, Pepper",
          "calories": 99,
          "servingSizeinGram": 150
        },
        "dessert": {
          "name": "Apple Slices with Almond Butter",
          "ingredients":"Apple, Almond Butter",
          "calories": 90,
          "qty": "1 small apple with 1 tbsp almond butter"
        },
        "totalMealCalories": 509
      },
      "afternoonSnack": {
        "entree": {
          "name": "Olives and Herbs",
          "ingredients": "Green Olives, Thyme, Rosemary",
          "calories": 75
        },
        "totalMealCalories": 75
      },
      "dinner": {
        "entree": {
          "name": "Grilled Eggplant Steaks",
          "ingredients": "Eggplant, Olive oil, Garlic, Herb seasonings",
          "calories": 200,
          "servingSizeinGrams": 200
        },
        "side": {
          "name": "Roasted Asparagus",
          "ingredients": "Asparagus, Olive oil, Lemon zest, Sea salt",
          "calories": 60,
          "servingSizeinGrams": 125
        },
        "drink": {
          "name": "Sparkling Water",
          "calories": 0,
          "servingSizeinOZ": 16,
          "ingredients": "Carbonated Water"
        },
        "totalMealCalories": 260
      },
      "totalDayCalories": 1364
};
const backup6 = {
    "breakfast": {
        "entree": {
          "name": "Chia Seed Pudding with Almonds",
          "ingredients": "Chia seeds, unsweetened almond milk, vanilla extract, and sliced almonds",
          "calories": 350,
          "servingSizeinGrams": "200g"
        },
        "side": {
          "name": "Fresh Blueberries",
          "ingredients": "Blueberries",
          "calories": 84,
          "servingSizeinGrams": "150g"
        },
        "dessert": {
          "name": "Coconut Yogurt",
          "ingredients": "Coconut milk, live cultures",
          "calories": 200,
          "qty": "1 pot"
        },
        "totalMealCalories": 634
      },
      "morningSnack": {
        "entree": {
          "name": "Guacamole with Red Bell Pepper Slices",
          "ingredients": "Avocado, lime juice, onion, salt, red bell peppers",
          "calories": 328,
          "servingSizeinGrams": "100g"
        },
        "totalMealCalories": 328
      },
      "lunch": {
        "entree": {
          "name": "Grilled Zucchini & Mushroom Salad",
          "ingredients": "Zucchini, mushrooms, olive oil, balsamic vinegar, arugula",
          "calories": 245,
          "servingSizeinGrams": "180g"
        },
        "side": {
          "name": "Quinoa",
          "ingredients": "Quinoa",
          "calories": 222,
          "servingSizeinGrams": "185g"
        },
        "dessert": {
          "name": "Dark Chocolate (80% Cocoa)",
          "ingredients": "Cocoa mass, sugar",
          "calories": 60,
          "qty": "1 square"
        },
        "totalMealCalories": 527
      },
      "afternoonSnack": {
        "entree": {
          "name": "Mixed Seed and Nut Bar",
          "ingredients": "Sunflower seeds, pumpkin seeds, almonds, honey",
          "calories": 283,
          "servingSizeinGrams": "50g"
        },
        "totalMealCalories": 283
      },
      "dinner": {
        "entree": {
          "name": "Baked Tofu with Herb Seasoning",
          "ingredients": "Tofu, thyme, rosemary, salt, black pepper",
          "calories": 187,
          "servingSizeinGrams": "150g"
        },
        "side": {
          "name": "Steamed Asparagus",
          "ingredients": "Asparagus, olive oil",
          "calories": 40,
          "servingSizeinGrams": "120g"
        },
        "drink": {
          "name": "White herb tea",
          "calories": 0,
          "ingredients": "Mixed herbal tea leaves",
          "servingSizeinOZ": "10oz"
        },
        "dessert": {
          "name": "Apple slices with cinnamon",
          "ingredients": "Apple, ground cinnamon",
          "calories": 95,
          "qty": "1 apple"
        },
        "totalMealCalories": 322
      },
      "totalDayCalories": 2094
    };
  


const backupData = [backup1,backup2,backup3,backup4,backup5,backup6];
module.exports = backupData;
