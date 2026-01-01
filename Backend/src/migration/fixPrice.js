import mongoose from "mongoose";
import Product from "../models/Product.js"; // adjust path

const migratePrices = async () => {
  try {

    const products = await Product.find({
      price: { $type: "string" }
    });

    console.log(`Found ${products.length} products to migrate`);

    for (const product of products) {
      const numericPrice = Number(
        product.price.replace(/[^0-9.]/g, "")
      );

      if (!isNaN(numericPrice)) {
        product.price = numericPrice.toString(); // keep string if schema is string
        await product.save();

        console.log(`✔ Updated: ${product.name} → ${numericPrice}`);
      }
    }

    console.log("🎉 Price migration completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed", error);
    process.exit(1);
  }
};

migratePrices();
export default migratePrices;
