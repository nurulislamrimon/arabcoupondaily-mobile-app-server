"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeController = __importStar(require("./store.controller"));
const verify_token_1 = require("../../middlewares/verify_token");
const verify_authorization_1 = require("../../middlewares/verify_authorization");
const storeRouter = express_1.default.Router();
/**
 *@api{post}/add add new store
 *@apiDescription add a new store
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody photoURL, storeName, country,storeExternalLink, description, howToUse
 *@apiParam none
 *@apiQuery none
 *@apiSuccess {Object} added store.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.post("/add", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), storeController.addNewStoreController);
/**
 *@api{get}/ get all store
 *@apiDescription get all stores
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam none
 *@apiQuery query{name & others Properties},limit,sort,page
 *@apiSuccess {Array of Object} all stores.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.get("/", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), storeController.getAllStoresController);
/**
 *@api{put}/:id update a store
 *@apiDescription update a store by id with validation
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam ObjectId of store
 *@apiQuery none
 *@apiSuccess {Object} update info of the store.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.put("/:id", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), storeController.updateAStoreController);
/**
 *@api{delete}/:id delete a store
 *@apiDescription delete a store by id
 *@apiPermission admin and manager
 *@apiHeader token
 *@apiBody none
 *@apiParam ObjectId of store
 *@apiQuery none
 *@apiSuccess {Object} delete confirmation.
 *@apiError 401, 403 unauthorized & forbidden
 */
storeRouter.delete("/:id", verify_token_1.verify_token, (0, verify_authorization_1.verify_authorization)("admin", "manager"), storeController.deleteAStoreController);
exports.default = storeRouter;
