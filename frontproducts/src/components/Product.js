import React, { useEffect, useState} from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

function Product() {

    let url = "https://localhost:7258/api/product";

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await fetch('https://localhost:7258/api/product/');
            const data = await response.json();
            setProducts(data);
        }
        getProducts();
    }, []);

    return (<>
        <Link to={'/create-product'}><button>Agregar</button></Link>
        {products.length === 0 ? (<h3>Cargando...</h3>) : (
            <>
                <table>
                    <thead>
                        <ProductHeader />
                    </thead>
                    <tbody>
                        {products.map(product => <ProductItem key={product.id} product={product} />)}
                    </tbody>
                </table>
                <p>Productos activos {products.length}</p>
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