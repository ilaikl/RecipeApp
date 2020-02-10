const renderer = new Renderer()
const fetchRecipes = function () {

    let input = $("#ingredient-input").val()

    $.get(`/recipes/${input}`, function (receipesObj) {
        renderer.render(receipesObj)
    })
}

$("#recipesList").on("click", "img",function () {
    console.log($(this).closest(".recipe").find("li")[0].innerText)
})
