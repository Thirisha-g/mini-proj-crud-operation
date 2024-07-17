
import { Link , useNavigate} from "react-router-dom"
import { useState } from "react";

export default function CreateProduct(){
    const [validationErrors,setValidationErrors]=useState({})

    const navigate=useNavigate()

    async function handleSubmit(event){
        event.preventDefault();

        const formData=new FormData(event.target);
        // validate form inputs
        const product=Object.fromEntries(formData.entries());

       if(!product.name || !product.description || !product.price || !product.category){
        alert("Please fill all required fields")
        return
       }
       try{
            const response=await fetch("http://localhost:4000/products",{
                method:"POST",
                body:formData
            })

            const data=await response.json()

            if(response.ok){
                //prd coreccrtly

            }
            else if(response.statusCode === 400){
              setValidationErrors(data)
            }
            else {
                alert("unable to create product")
            }
       }
       catch(error){
        alert("Server error")

       }
       //alert("Thank you")
    }

    return(
        <div clasName="container my-4">
            <div clasName="row">
                <div clasName="col-md-8 mx-auto rounded border p-4">
                    <h2>Create Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Product Name
                        </label>
                        <div clasName="col-sm-8">
                            <input className="form-control" name="name"/>
                            <span clasName="text-danger">{validationErrors.name}</span>
                        </div>
                        </div>


                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Description
                        </label>
                        <div clasName="col-sm-8">
                            <textarea className="form-control" name="description"></textarea>
                            <span clasName="text-danger">{validationErrors.description}</span>
                        </div>
                        </div>

                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Price
                        </label>
                        <div clasName="col-sm-8">
                            <input type="number" className="form-control" name="price"/>
                            <span clasName="text-danger">{validationErrors.price}</span>
                        </div>
                        </div>

                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Category
                        </label>
                        <div clasName="col-sm-8">
                            <select className="form-select" name="category">
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Books">Books</option>
                            </select>
                            <span clasName="text-danger">{validationErrors.category}</span>
                        </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">submit</button>

                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link clasName="btn btn-secondary" to='/admin/products' role="button">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
    

            </div>
        </div>
    )
}