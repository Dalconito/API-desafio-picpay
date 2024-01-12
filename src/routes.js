import { Router } from "express";
import CreateAccout from "./controller/CreateUserController";
import app from "./app";
import CreateUserController from "./controller/CreateUserController";
import transactionController from "./controller/transactionController";


const routes = new Router()

routes.get('/', function(req, res)
{
    res.render("cadastro.ejs");
});

routes.post('/', CreateUserController.store);

routes.get('/transaction', function(req, res)
{
    res.render("transaction.ejs");
});

routes.post('/transaction', transactionController.update);

export default routes;