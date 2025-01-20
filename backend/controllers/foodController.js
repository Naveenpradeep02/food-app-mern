import foodModel from "../models/FoodModel.js";
import fs from 'fs'

// add food item

export const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })


    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// all food list

export const listfood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({
            success: true,
            foods: foods.length,
            data: foods
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Error",
            success: false
        })

        console.log(error);

    }
}


// remove food item 

// export const removeFood = async (req, res) => {
    

//     try {
//         const food = await foodModel.findById(req.body.id)
//         fs.link(`uploads/${food.image}`, () => { })

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({ success: true, message: "Food Removed" })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })

//     }

// };



export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // Check if the food item exists
        if (!food) {
            return res.status(404).json({ 
                success: false, 
                message: "Food item not found" 
            });
        }

        // Delete the image file associated with the food item
        await fs.promises.unlink(`uploads/${food.image}`);

        // Delete the food document from the database
        await foodModel.findByIdAndDelete(req.body.id);

        res.status(200).json({ 
            success: true, 
            message: "Food removed successfully" 
        });

    } catch (error) {
        console.error("Error while removing food:", error.message);

        res.status(500).json({ 
            success: false, 
            message: "Internal server error" 
        });
    }
};
