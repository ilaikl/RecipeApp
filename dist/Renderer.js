const source = $("#recipes-template").html()
const template = Handlebars.compile(source)

class Renderer {
    constructor() {

    }
    render(data) {

        $("#recipesList").empty()
        let newHtml = template(data)
        $("#recipesList").append(newHtml)
    }
}