SELECT
    r.name AS Restaurant,
    bmi.name AS Meal_Name,
    STRING_AGG(a.name, ', ') AS Allergens,
    bmi.base_price AS Price,
    ni.calories AS Calories
FROM
    base_menu_items bmi
JOIN
    restaurants r ON bmi.restaurant_id = r.restaurant_id
JOIN
    nutritional_info ni ON bmi.nutritional_id = ni.nutritional_id
LEFT JOIN
    nutritional_allergens na ON ni.nutritional_id = na.nutritional_id
LEFT JOIN
    allergens a ON na.allergen_id = a.allergen_id
GROUP BY
    r.name, bmi.name, bmi.base_price, ni.calories;
