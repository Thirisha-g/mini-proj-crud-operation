
import { Link , useNavigate, useParams} from "react-router-dom"
import { useEffect, useState } from "react";

export default function EditProduct(){
const params=useParams()

const [initialData,setInitialData] = useState()

    const [validationErrors,setValidationErrors]=useState({})

    const navigate=useNavigate()

    function getProduct(){
        fetch("http://localhost:4000/products/" + params.id)
        .then(response=>{
        if(response.ok){
            return response.json()
        }
        throw new Error()
        })
        .then(data=>{
            setInitialData(data)
        })
        .catch(error=>{
            alert("Unable to fetch product")
    })
    }

        useEffect(getProduct,[])

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
            const response=await fetch("http://localhost:4000/products/" + params.id,{
                method:"PATCH",
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
                alert("unable to update product")
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
                    <h2>Edit Product</h2>

                    <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            ID
                        </label>
                        <div clasName="col-sm-8">
                            <input readOnly className="form-control-plaintext" defaultValue={params.id}/>
                        </div>
                        </div>
                    {
                        initialData &&
                    <form onSubmit={handleSubmit}>
                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Product Name
                        </label>
                        <div clasName="col-sm-8">
                            <input className="form-control" name="name" defaultValue={initialData.name}/>
                            <span clasName="text-danger">{validationErrors.name}</span>
                        </div>
                        </div>


                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Description
                        </label>
                        <div clasName="col-sm-8">
                            <textarea className="form-control" name="description" defaultValue={initialData.description}></textarea>
                            <span clasName="text-danger">{validationErrors.description}</span>
                        </div>
                        </div>

                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Price
                        </label>
                        <div clasName="col-sm-8">
                            <input type="number" className="form-control" name="price" defaultValue={initialData.price}/>
                            <span clasName="text-danger">{validationErrors.price}</span>
                        </div>
                        </div>

                        <div clasName="row mb-3">
                        <label clasName="col-sm-4 col-form-label">
                            Category
                        </label>
                        <div clasName="col-sm-8">
                            <select className="form-select" name="category" defaultValue={initialData.category}>
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
                    }
                </div>
    

            </div>
        </div>
    )
}