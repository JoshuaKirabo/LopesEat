// Function to check if an item is a fruit or fruit-related
function relatedItems(item)
    {
        
        
        function checkFruitCup(item)
            {
                // Checking if the side contains fruits 
                const fruits = [
                    "apples", "bananas", "oranges", "blackberries", "blueberries", "strawberries", 
                    "grapes", "mangoes", "peaches", "pears", "cherries", "kiwis", "lemons", "lime", 
                    "watermelon", "melons", "pineapples", "grapefruits", "pomegranates", "plums", "raspberries"
                ];
                if (!item.ingredients) 
                    {
                        console.error("No ingredients found for the item.");
                        return false;
                    }
            
                // Split the ingredients list and convert to lowercase for comparison
                console.log(item.ingredients);
                const ingredientsList = item.ingredients.split(', ').map(ingredient => ingredient.trim().toLowerCase());
            
                // Use a Set to count unique fruits found in the ingredients
                const foundFruits = new Set();
            
                // Check each ingredient to see if it matches any fruit in the list
                ingredientsList.forEach(ingredient => 
                    {
                        if (fruits.includes(ingredient)) 
                            {
                                foundFruits.add(ingredient);
                            }
                    });
            
                // Return true if at least three distinct fruits are found
                return foundFruits.size >= 3;
            }
        
        if(item.name.includes("Pancakes" || "pancakes" || "Pancake" || "pancake"))
            {
                return "Waffle";
            }
        if(checkFruitCup(item))
            {
                return "Fruit Cup";
            }
        if(item.name.includes("Tea" || "tea"))
            {
                return "Tea";
            }
      
              

    }

function checkAllergensExtended(userAllergies, mealIngredientsLower)
    {
        // Check Eggs
        const eggAllergens = ['Egg', 'egg', 'eggs', 'egg white', 'Egg Whites', 'egg yolk', 'egg yolks', 'scrambled egg', 'scrambled eggs'];
        
        if (userAllergies.includes('eggs')) 
            {
                if (mealIngredientsLower.some(ingredient =>eggAllergens.some(eggAllergen => ingredient.includes(eggAllergen)))) 
                    {
                        return true;
                    }
            }

        // Check Soy
        const soyAllergens = ['soy', 'Soy', 'soybean oil'];
        
        if (userAllergies.includes('soy')) 
            {
                if (mealIngredientsLower.some(ingredient => soyAllergens.some(soyAllergen => ingredient.includes(soyAllergen.toLowerCase())))) 
                    {
                        return true;
                    }
            }

        // Check Milk
        const milkAllergens = ['Nonfat dry milk'];

        if (userAllergies.includes('milk')) 
            {
                if (mealIngredientsLower.some(ingredient => soyAllergens.some(soyAllergen => ingredient.includes(soyAllergen.toLowerCase())))) 
                    {
                        return true;
                    }
            }
        
        return false;
    }


module.exports = { relatedItems, checkAllergensExtended } 