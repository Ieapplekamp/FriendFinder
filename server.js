var express = require("express");
// Do I need to require path here? is that a npm? I think its a node thing? 
var app = express();
var PORT = process.env.PORT || 3306;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(`App is listening on ${PORT}`);
});