import jQuery from 'jquery';
import ConfigService from './services/configService';
import AuctionController from './controllers/auctionController';
import AuctionDialogController from './controllers/auctionDialogController';
import InventoryController from './controllers/inventoryController';
import LoginController from './controllers/loginController';
import UserController from './controllers/userController';

window.jQuery = window.$ = jQuery;
require('bootstrap');

ConfigService.startup();
AuctionController.startup();
AuctionDialogController.startup();
InventoryController.startup();
LoginController.startup();
UserController.startup();
