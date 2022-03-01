import "./style.scss";
import { Request } from "./request";
import { UI } from "./ui";



const productForm = document.getElementById("product-form");
const categoryForm = document.getElementById("category-form");
const productFormSelect = document.getElementById("product-form-select");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const quantityInput = document.getElementById("quantity");
const productCancelBtn = document.getElementById("cancel-product");
const updateProductBtn = document.getElementById("update");
const productsList = document.getElementById("products");
const categoriesFormSelect = document.getElementById("categories-form-select");
const categoryInput = document.getElementById("category-ınput");
const categoryUpdate = document.getElementById("category-update");
const categoryDelete = document.getElementById("category-delete");
const categoryCancel = document.getElementById("category-cancel");
const categoryAddBtn = document.getElementById("c-add-btn");
const categoryUpdateBtn = document.getElementById("c-update-btn");
const categoryDeleteBtn = document.getElementById("c-delete-btn");
const filterInput = document.getElementById("filter");


const request = new Request("http://localhost:3000/");
const ui = new UI();




eventListeners();


function eventListeners() {
    document.addEventListener("DOMContentLoaded",getAllItems);
    productForm.addEventListener("submit",addProduct);
    categoryAddBtn.addEventListener("click",addToCategoryBtn);
    categoryForm.addEventListener("submit",addCategory);
    categoryUpdate.addEventListener("click",updateCategory);
    categoryCancel.addEventListener("click",cancel);
    categoryUpdateBtn.addEventListener("click",updateToCategoryBtn);
    categoryDeleteBtn.addEventListener("click",deleteToCategoryBtn);
    updateProductBtn.addEventListener("click",updateProduct);
    productsList.addEventListener("click",updateOrDelete);
    categoryDelete.addEventListener("click",deleteCategory);
    productCancelBtn.addEventListener("click", productCancel);
    filterInput.addEventListener("keyup",filterProducts);


    categoriesFormSelect.onchange = function(){
        
        request.getProducts()
        .then(products => {
            ui.addAllProductsToUI(products);
        })
        .catch(err => console.log(err));
        

        categoryInput.value = categoriesFormSelect.children[categoriesFormSelect.value - 1].textContent;
    }

}


function getAllItems() {

    request.getCategories()
    .then(categories => {
        ui.addAllCategoriesToUI(categories)
    })
    .catch(err => console.log(err));


    request.getProducts()
    .then(products => {
        ui.addAllProductsToUI(products);
    })
    .catch(err => console.log(err));

}


function addProduct(e) {

    const productCategoryValue = Number(productFormSelect.value);
    const productName = nameInput.value.trim();
    const productDescription = descriptionInput.value.trim();
    const productQuantity = quantityInput.value.trim();
    

    if (productCategoryValue == 0 || productName === "" || productDescription === "" || productQuantity === "") {
        alert("Lütfen Tüm Alanları Doldurun");
    }

    else {


        request.postProducts({
            categoryId: productCategoryValue,
            name: productName,
            description: productDescription,
            quantity: productQuantity
        })
        .then(product => {

            ui.addProductsToUI(product);
        })
        .catch(err => console.log(err));
    }


    ui.clearInputs();
    e.preventDefault();
}




function addToCategoryBtn() {


    ui.categoryAddOpenUI();
}


function updateToCategoryBtn() {

    ui.categoryUpdateOpenUI();

}

function deleteToCategoryBtn() {

    ui.categoryDeleteOpenUI();
}


function cancel(){
    ui.categoryCloseUI();
    categoryInput.value = "";
}


function productCancel() {

    ui.cancelProducBtnUI();
    ui.clearInputs();
}



function updateProduct() {

    const productCategoryValue = Number(productFormSelect.value);
    const productName = nameInput.value.trim();
    const productDescription = descriptionInput.value.trim();
    const productQuantity = quantityInput.value.trim();


    let id = "";

    request.getProducts()
    .then(products => {

        console.log(products);

        products.forEach(product => {
            
            if (nameInput.value.trim() == product.name && descriptionInput.value.trim() == product.description) {

                id = product.id;

            }

        })

        
        if (productCategoryValue == 0 || productName === "" || productDescription === "" || productQuantity === "") {
            alert("Lütfen Tüm Alanları Doldurun");
        }
    
        else {
            
            
            request.putProducts(id,{
                categoryId: productCategoryValue,
                name: productName,
                description: productDescription,
                quantity: productQuantity
            })
            .then(product => {

                console.log(product);

                request.getProducts()
                .then(products => {
                    ui.addAllProductsToUI(products);
                    ui.cancelProducBtnUI();
                })
            })
            .catch(err => console.log(err));
        }
        
    })


    ui.clearInputs();
}


function updateCategory() {
    
    let id = ""
    console.log(categoryInput.value);
    console.log(categoriesFormSelect.value);

    request.putCategories(categoriesFormSelect.value,{
        categoryName: categoryInput.value
    })
    .then(category => {
        request.getCategories()
        .then(category => {
            ui.addAllCategoriesToUI(category);
        })
    })
    .catch(err => console.log(err));

    ui.categoryCloseUI();
}



function addCategory(e) {


    const categoryNameInput = categoryInput.value.trim();


    if (categoryInput.value === "") {
        alert("Lütfen Kategori Alnını Doldurun");
    }

    else {
        request.postCategories({
            categoryName: categoryNameInput,
        })
        .then(category => {

            ui.addCategoriesToUI(category);
        })
        .catch(err => console.log(err));
    }


    ui.categoryCloseUI();
    categoryInput.value = "";
    e.preventDefault();
}


function updateOrDelete(e) {

    if (e.target.id === "delete-product") {

        deleteProduct(e.target);
    }

    else if(e.target.id === "update-product") {

        updateProductController(e.target.parentElement.parentElement);

        
    }

}


function deleteProduct(targetProduct){
    
    const deleteProductName = targetProduct.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

    const deleteProductDescription= targetProduct.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

    request.getProducts()
    .then(products => {

        products.forEach(products => {
            
            if(products.categoryId == categoriesFormSelect.value) {

                if(products.name == deleteProductName && products.description == deleteProductDescription) {

                    request.deleteProducts(products.id)
                    .then(message => {
                        ui.deleteProductFromUI(targetProduct.parentElement.parentElement);
                        console.log(message);
                    })
                    .catch(err => console.log(err));
                }
                
            }
        });
    });
}


function deleteCategory() {

    if(confirm("Seçtiğiniz Kategoriyle Birlikte Ürünlerde Silinecektir. Emin misiniz?")) {
        
        if(productsList.innerHTML !== "") {

            request.getProducts()
            .then(products => {
                
                if(categoriesFormSelect.value == products.categoryId){
    
                    request.deleteProducts(products.id)
                    .then(message => {
                    })
                    .catch(err => console.log(err));
                }
            })

            request.deleteCategories(Number(categoriesFormSelect.value))
            .then(message => {

                ui.deleteCategoryFromUI(categoriesFormSelect.value);
                ui.deleteCategoryProductsUI();
                console.log(message);

            })
            .catch(err => console.log(err));
        }

        else if (productsList.innerHTML === "") {

            request.deleteCategories(Number(categoriesFormSelect.value))
            .then(message => {

                ui.deleteCategoryFromUI(categoriesFormSelect.value);
                console.log(message);

            })
            .catch(err => console.log(err));
        }
    }

    ui.categoryCloseUI();
    categoryInput.value = "";
    request.getProducts(products)
    .then(products => {
        ui.addProductsUI(products);
    })
}


function updateProductController(targetProduct) {
   
    productFormSelect.value = categoriesFormSelect.value;

    ui.updateProductButtonUI(targetProduct);
}


function filterProducts(e) {

    const filterValue = e.target.value;

    const filterItems = Array.from(productsList.children);

    console.log(filterItems.children);

    filterItems.forEach(element => {
        
        const text = element.textContent;
        console.log(element.textContent);
        if (text.indexOf(filterValue) === -1){

            element.setAttribute("style","display : none");

        }

        else {
            element.setAttribute("style","display : table-row");
        }

    });
    
}



