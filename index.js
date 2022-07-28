const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Kaushik:Kaushik@cluster0.rpenozr.mongodb.net/Pencil?retryWrites=true&w=majority', (err) => {
    if (err)
        console.log(err);
    else
        console.log("DB Connected");
});



app.get('/', function (req, res) {
    res.status(200).json({
        "messgae": "Successfully connnected."
    })
})

const searchRoute = require("./router/api/search");
app.use("/search", searchRoute);




app.listen(PORT, () => console.log(`Server start on port no ${PORT}`));