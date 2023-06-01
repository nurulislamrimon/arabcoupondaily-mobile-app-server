"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFiltersSymbolToOperators = void 0;
const addFiltersSymbolToOperators = (filters) => {
    if (filters.storeName) {
        filters.storeName = { $regex: filters.storeName, $options: "i" };
    }
    else if (filters.country) {
        filters.country = { $regex: filters.country, $options: "i" };
    }
    else if (filters.postTitle) {
        filters.postTitle = { $regex: filters.postTitle, $options: "i" };
    }
    else if (filters.email) {
        filters.email = { $regex: filters.email, $options: "i" };
    }
    else if (filters.name) {
        filters.name = { $regex: filters.name, $options: "i" };
    }
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(/gt|gte|lt|lte/g, (match) => `$${match}`);
    return JSON.parse(filtersString);
};
exports.addFiltersSymbolToOperators = addFiltersSymbolToOperators;
