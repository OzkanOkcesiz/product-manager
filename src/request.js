export class Request{

    constructor(url) {
        this.url = url;
    }


    async getProducts() {

        const response = await fetch(this.url + "products");
        const responseData = await response.json();

        return responseData;
    }


    async getCategories() {

        const response = await fetch(this.url + "categories");
        const responseData = await response.json();

        return responseData;
    }


    async postProducts(data) {

        const response = await fetch(this.url + "products",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });

        const responseData = await response.json();

        return responseData;
    }


    async postCategories(data) {

        const response = await fetch(this.url + "categories",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });

        const responseData = await response.json();

        return responseData;
    }


    async putProducts(id,data) {

        const response = await fetch(this.url + "products/" + id,{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });

        const responseData = await response.json();

        return responseData;
    }


    async putCategories(id,data) {

        const response = await fetch(this.url + "categories/" + id,{
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });

        const responseData = await response.json();

        return responseData;
    }


    async deleteProducts(id) {

        const response = await fetch(this.url + "products/" + id,{
            method: "DELETE",
        });

        return "Veri Silindi..."
    }


    async deleteCategories(id) {

        const response = await fetch(this.url + "categories/" + id,{
            method: "DELETE",
        });

        return "Veri Silindi..."
    }


}