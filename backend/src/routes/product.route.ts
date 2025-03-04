import { addProductController, filteredProductsController, syncProductsController } from "@controllers/product.controller";
import { Router } from "express";

const router = Router();

router.get("/sync", syncProductsController);
router.get("/search", filteredProductsController);
router.post("/add-product", addProductController);

export const productRoutes: Router = router;