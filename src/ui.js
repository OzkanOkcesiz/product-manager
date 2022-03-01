export class UI {

    constructor(){
        this.productFormSelect = document.getElementById("product-form-select");
        this.nameInput = document.getElementById("name");
        this.descriptionInput = document.getElementById("description");
        this.quantityInput = document.getElementById("quantity");
        this.productsList = document.getElementById("products");
        this.categoriesFormSelect = document.getElementById("categories-form-select");
        this.addProductBtn = document.getElementById("add-product");
        this.updateProductBtn = document.getElementById("update");
        this.cancelProducBtn = document.getElementById("cancel-product");
        this.categoryInput = document.getElementById("category-ınput");
        this.categoryAdd = document.getElementById("category-add");
        this.categoryUpdate = document.getElementById("category-update");
        this.categoryDelete = document.getElementById("category-delete");
        this.categoryCancel = document.getElementById("category-cancel");
        this.categoryAddBtn = document.getElementById("c-add-btn");
        this.categoryUpdateBtn = document.getElementById("c-update-btn");
        this.categoryDeleteBtn = document.getElementById("c-delete-btn");
        this.categortyBtnBox = document.getElementById("category-btn-box");

    }


    addAllCategoriesToUI(categories) {

        let result = "";
        let result1 = "<option value = '0' selected>Kategori Seçiniz</option>";



        categories.forEach(category => {
            result += `
            <option value="${category.id}">${category.categoryName}</option>
            `;

            result1 += `
            <option value="${category.id}">${category.categoryName}</option>
            `;
        });

        this.categoriesFormSelect.innerHTML = result;
        this.productFormSelect.innerHTML = result1;


    }


    addAllProductsToUI(products) {

        let result = "";


        products.forEach(product => {
            
            if(product.categoryId == this.categoriesFormSelect.value) {

                result += `
                <tr>                           
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td><a href="#" id = "update-product" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-product" class= "btn btn-danger">Sil</a></td>
                </tr>
                `;
                
            }
        });

        this.productsList.innerHTML = result;

    }



    clearInputs() {

        this.productFormSelect.options.selectedIndex = this.productFormSelect.options.selectedIndex[0];
        this.nameInput.value = "";
        this.descriptionInput.value = "";
        this.quantityInput.value = "";
        this.categoryInput.value = "";
    }


    addProductsToUI(product) {

        if(product.categoryId == this.categoriesFormSelect.value) {

            this.productsList.innerHTML += 
            `
           <tr>                           
           <td>${product.name}</td>
           <td>${product.description}</td>
           <td>${product.quantity}</td>
           <td><a href="#" id = "update-product" class= "btn btn-danger">Güncelle</a></td> 
           <td> <a href="#" id = "delete-product" class= "btn btn-danger">Sil</a></td>
           </tr>
           `;
        }

    }


    addCategoriesToUI(category) {

        this.categoriesFormSelect.innerHTML += `
        <option value="${category.id}">${category.categoryName}</option>
        `;


        this.productFormSelect.innerHTML += `
        <option value="${category.id}">${category.categoryName}</option>
        `;
    }


    categoryAddOpenUI() {

        if (this.categoryInput.style.display === "none") {

            this.categoryInput.style.display = "block";
            this.categortyBtnBox.style.display = "none";
            this.categoryAdd.style.display = "block";
            this.categoryCancel.style.display = "block";

        }
    }


    categoryUpdateOpenUI() {

        if(this.categoryInput.style.display === "none") {

            this.categoryInput.style.display = "block";
            this.categortyBtnBox.style.display = "none";
            this.categoryUpdate.style.display = "block";
            this.categoryCancel.style.display = "block";
            
            this.categoryInput.value = this.categoriesFormSelect.children[this.categoriesFormSelect.value - 1].textContent;

        }
    }


    categoryDeleteOpenUI() {

        if (this.categoryDelete.style.display === "none") {

            this.categoryDelete.style.display = "block";
            this.categortyBtnBox.style.display = "none";
            this.categoryCancel.style.display = "block";

        }
    }


    categoryCloseUI() {
        this.categoryInput.style.display = "none";
        this.categoryAdd.style.display = "none";
        this.categoryUpdate.style.display = "none";
        this.categoryDelete.style.display = "none";
        this.categoryCancel.style.display = "none";
        this.categortyBtnBox.style.display= "flex";
    }


    deleteProductFromUI(element) {
        element.remove();
    }


    deleteCategoryProductsUI() {

        this.productsList.innerHTML = ""
    }


    addProductsUI(products) {

        let result = "";


        products.forEach(product => {
            
            if(product.categoryId == 1) {

                result += `
                <tr>                           
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td><a href="#" id = "update-product" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-product" class= "btn btn-danger">Sil</a></td>
                </tr>
                `;
                
            }
        });

        this.productsList.innerHTML = result;

    }


    deleteCategoryFromUI(element){

        this.productFormSelect.removeChild(this.productFormSelect.children[element]);
        this.categoriesFormSelect.removeChild(this.categoriesFormSelect.children[element-1]);
        
    }


    updateProductButtonUI(targetProduct) {

        if (this.updateProductBtn.style.display === "none") {

            this.updateProductBtn.style.display = "block";
            this.addProductBtn.style.display = "none";
            this.cancelProducBtn.style.display = "block";
            this.addProductInfo(targetProduct);
        }
    }


    addProductInfo(targetProduct) {

        const children = targetProduct.children;

        this.nameInput.value = children[0].textContent;
        this.descriptionInput.value = children[1].textContent;
        this.quantityInput.value = children[2].textContent;

    }


    cancelProducBtnUI() {

        if (this.cancelProducBtn.style.display === "block") {

            this.cancelProducBtn.style.display = "none";
            this.updateProductBtn.style.display = "none";
            this.addProductBtn.style.display = "block";
        }
    }

}