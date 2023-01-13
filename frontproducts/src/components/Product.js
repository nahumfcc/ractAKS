import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
import { PRODUCT_URL } from '../helpers/helpServiceUrl';
import { readAllAction } from '../actions/crudActions';
import Loader from '../common/Loader'

function Product() {

    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { localDb } = state.crud;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            console.log("Obtiene productos")
            setLoading(true);
            const response = await fetch(PRODUCT_URL);
            const json = await response.json();
            dispatch(readAllAction(json));
            setLoading(false);
        }
        getProducts();
    }, []);

    return (<>
        <div className="d-flex justify-content-end">
            <Link to={'/create-product'}><button>Agregar</button></Link>
        </div>
        
        {loading && <Loader />}
        {localDb && (
            <>
                <table>
                    <thead>
                        <ProductHeader />
                    </thead>
                    <tbody>
                        {localDb.map(product => <ProductItem key={product.id} product={product} />)}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                    <p>Productos activos {localDb.length}</p>
                </div>
            </>
        )}
    </>
    );
}

function ProductHeader() {
    return (<tr>
        <th>Nombre</th>
        <th>Detalle</th>
        <th>Precio</th>
        <th>Opciones</th>
    </tr>
        );
}

export default Product;