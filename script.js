const apiurl = "https://fakestoreapi.com/products";
const productForm = document.getElementById("productform");
const productId = document.getElementById("productid");
const productName = document.getElementById("productname");
const priceDetails = document.getElementById("price");
const description = document.getElementById("desc");
const category = document.getElementById("cat");
const productImgUrl = document.getElementById("img");
const rate = document.getElementById("rate");
const count = document.getElementById("count");
const productList = document.getElementById("productList");
const search=document.getElementById("searchid");
let products=[];
// loading
const loader = document.getElementById("loader");
const dataContainer = document.getElementById("dataContainer");

// display and fetch products
async function fetchProductDetails() {
  loader.style.display = "block";      // show loader
  dataContainer.innerHTML = "";
    const result = await fetch(apiurl);
    products = await result.json();
    console.log(products);
    display(products);
}
function display(products){
      productList.innerHTML = "";
    products.forEach(product => {
        // const li = document.createElement("li");
        const div = document.createElement("div");
        div.className = "col-12 col-md-6 col-lg-4 mb-4";

        div.innerHTML = `
        <div class="card h-100" style="width: 18rem;">
  <img src="${product.image}" class="card-img-top" alt="not found">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.description}</p>
    <p class="card-text"> INR ${product.price}</p>
    <p class="card-text">rating:⭐⭐⭐ ${product.rating.rate} (${product.rating.count})</p>
    <button class="btn btn-warning" onclick="editproduct('${product.id}')">Edit</button>
           <button class="btn btn-danger" onclick="deleteproduct('${product.id}')">Delete</button>
  </div>
  </div> `;
        productList.appendChild(div);
       
    });
    
}
fetchProductDetails();
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = productId.value;
  const productdata = {
    title: productName.value,
    price: priceDetails.value,
    description:description.value,
    category:category.value,
    image:productImgUrl.value
  };
  const productrating = {
    rate:rate.value,
    count:count.value
  }
  console.log(id);
  // alert(productName);

  if (!id) {
    //save
    await fetch(apiurl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productdata,productrating),
    });
    // console.log(id);
  } else {
    //update
    await fetch(`${apiurl}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(productdata,productrating),
    });
  }
   console.log(`added product name :${productdata.title},${ productdata.price},${productdata.category}`);    
    
fetchProductDetails();
  productName.value = "";
  priceDetails.value = "";
  description.value = "";
  category.value = "";
  productImgUrl.value = "";
  rate.value = "";
  count.value = "";
});

//Edit user
async function editproduct(id) {
  const res = await fetch(`${apiurl}/${id}`);
  const product = await res.json();
  productId.value = product.id;
  productName.value = product.title;
  priceDetails.value = product.price;
  description.value  = product.description;
  category.value = product.category;
  productImgUrl.value = product.image;
  rate.value = product.rating.rate;
  count.value = product.rating.count;
   console.log(products);
}

//delete
async function deleteproduct(id){
   if (confirm("Do you want to DELETE?")) {
    await fetch(`${apiurl}/${id}`, {
      method: "DELETE"
      
    });
   }  
   console.log(`deleted product id :${id}`);    
}
// search
function GetSearchbyId(){
  const filteredprod =products.filter(product=>product.title.includes(search.value));
  console.log("filtered product",filteredprod);
 
display(filteredprod);
  
}
