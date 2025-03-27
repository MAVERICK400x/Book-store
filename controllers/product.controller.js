import { products } from "../models/product.model.js";

export const getAllProducts = (req, res) => {
    let filteredProducts = [...products]; // Clone products array
    const { search, sort } = req.query;

    // Apply Search Filter (Case-Insensitive)
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
            product => product.title.toLowerCase().includes(searchLower) ||
                       product.author.toLowerCase().includes(searchLower)
        );
    }

    // Apply Sorting
    if (sort === "priceLow") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sort === "titleAZ") {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "titleZA") {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === "authorAZ") {
        filteredProducts.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sort === "authorZA") {
        filteredProducts.sort((a, b) => b.author.localeCompare(a.author));
    }

    res.render("products", { title: "Books", products: filteredProducts, user: req.session.user, sort, search });
};
