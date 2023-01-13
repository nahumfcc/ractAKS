import { React, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import { PRODUCT_URL } from '../helpers/helpServiceUrl';
import { useDispatch } from 'react-redux';
import { createAction, updateAction } from '../actions/crudActions';

function ProductForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                const response = await fetch(PRODUCT_URL + product.id, requestOptions);
                dispatch(updateAction(product));
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
                const response = await fetch(PRODUCT_URL, requestOptions);
                const data = await response.json();
                dispatch(createAction(data));
            }
            createProduct(product);
        }
        setProduct({ name: '', description: '', price: 0 });
        navigate('/');
    };

    useEffect(() => {
        if (params.id) {
            const getProduct = async (id) => {
                const response = await fetch(PRODUCT_URL + id);
                const data = await response.json();
                setProduct(data);
            }
            getProduct(params.id);
        }
    }, [])


    return (
        <form onSubmit={nuevoProducto}>
            <div className="container">
                <div className="row">
                    {product.id ? (<h3>Editar producto</h3>) : (<h3>Crear producto</h3>)}
                </div>
                <div className="row">
                    <div className="col-2">
                        <label>Nombre del producto:</label>
                    </div>
                    <div className="col-4">
                        <input name='name' placeholder='Nombre' onChange={handleChange} value={product.name} autoFocus />
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <label>Detalle del producto:</label>
                    </div>
                    <div className="col-4">
                        <textarea name='description' placeholder='Descripcion' onChange={handleChange} value={product.description} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <label>Precio:</label>
                    </div>
                    <div className="col-4">
                        <input type='number' name='price' placeholder='Precio' onChange={handleChange} value={product.price} autoFocus />
                    </div>
                </div>

                <div className="row d-flex justify-content-left">
                    <div className="col-1">
                        <Link to="/"><button>Regresar</button></Link>
                    </div>
                    <div className="col-1">
                        <button>Guardar</button>
                    </div>
                </div>                
            </div>
        </form>
    )
}

export default ProductForm