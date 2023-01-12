import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
    const navigate = useNavigate()

    const [product, setProduct] = useState({ name: '', description: '', price:0 });

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const params = useParams();

    const nuevoProducto = (e) => {
        e.preventDefault();
        //TODO validaciones antes de guardar
        if (params.id) {
            //Actualizar
            const updateProduct = async (product) => {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                };
                const response = await fetch('https://localhost:7258/api/product/' + product.id, requestOptions);
                console.log(response);
                navigate('/');

            }
            updateProduct({ ...product, id: params.id });
        } else {
            //Crear
            const createProduct = async (product) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                };
                const response = await fetch('https://localhost:7258/api/product/', requestOptions);
                const data = await response.json();
                navigate('/');
                
            }
            createProduct(product);
        }
        setProduct({ name: '', description: '', price: 0 });
        navigate('/');
    };

    useEffect(() => {
        if (params.id) {
            const getProduct = async (id) => {
                const response = await fetch('https://localhost:7258/api/product/' + id);
                const data = await response.json();
                setProduct(data);
            }
            getProduct(params.id);
        }
    }, [])


    return (
        <form onSubmit={nuevoProducto}>
            <input name='name' placeholder='Nombre' onChange={handleChange} value={product.name} autoFocus />
            <textarea name='description' placeholder='Descripcion' onChange={handleChange} value={product.description} />
            <input type='number' name='price' placeholder='Precio' onChange={handleChange} value={product.price} autoFocus />
            <button>Guardar</button>
        </form>
    )
}

export default ProductForm