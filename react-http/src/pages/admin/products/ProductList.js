
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function ProductList (){

const[products,setProducts]=useState([])

    function getProducts(){
        // fetch data from API
        fetch('http://localhost:4000/products')
       .then(response=>{
        if(response.ok){
            return response.json()
        }

        throw new Error()
       })
       .then(data=>{
        setProducts(data)
    })

    .catch(error=>{
        alert("unable to add")
    })
    }

    useEffect(getProducts, [])

    function deletePro(id){
        fetch("http://localhost:4000/products/" + id,{
            method:"DELETE"
        })
        .then(response=>{
            if(!response.ok){
                throw new Error()
            }
            getProducts()
        })
        .catch(error=>{
            alert("Unable to delete product")
        })
    }



    return(
       <div className="container my-4">
       <h2 className="text-center mb-4">products</h2>

       <div className="row mb-3">
        <div className="col">
        <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">Create Prd</Link>
        <button type="button" className="btn btn-outline-primary"
        onClick={getProducts}>Refresh</button>
        </div>

        <div className="col">
           
        </div>

        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>category</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product,index)=>{
                        return(
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}$</td>
                            <td>{product.category}</td>
                            <td>
                            <Link className="btn btn-sm btn-warning me-1" to={`/admin/products/edit/${product.id}`}>Edit</Link>
                            <button className="btn btn-sm btn-danger" 
                            onClick={() => deletePro(product.id)}>Delete</button>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </table>

       </div>
       </div>

    )
    
}