import CrudService from "../services/CrudService"

let getHomePage = async (req, res) => {
    return res.render("homepage.ejs");
}

let getCrud = (req, res) => {
    return res.render("crud.ejs");
}

let postCrud = async (req, res) => {
    let message = await CrudService.createNewUser(req.body);
    console.log(message);
    return res.send("ahihi thanh cong");
}

let displayGetCrud = async (req, res) => {
    let data = await CrudService.getAllUser();
    return res.render("display-crud.ejs", { dataUser: data });
}

let getEditCrud = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        let data = await CrudService.getUserInfoById(userId);
        // console.log(data);
        return res.render("edit.ejs", { dataUser: data });
    } else {
        return res.send("User not found");
    }
}

let putCrud = async (req, res) => {
    let data = req.body;
    await CrudService.updateUserData(data);
    return res.redirect('/get-crud');
}

let deleteCrud = async (req, res) => {
    const userId = req.query.id;
    if (userId) {
        await CrudService.deleteUserById(userId);
        return res.send("thanh cong")
    } else {
        return res.send("User not found !");
    }
}

module.exports = {
    getHomePage, getCrud, postCrud, displayGetCrud,
    getEditCrud, putCrud, deleteCrud
}