import { Link, useNavigate } from 'react-router-dom';

function ProductItem({ product }) {
    const navigate = useNavigate()

    function eliminarProducto(id) {
        var confirmDelete = confirm("Se eliminará el producto con id " + id);
        if (confirmDelete) {
            const deleteProduct = async (id) => {
                const response = await fetch('https://localhost:7258/api/product/'+id, { method: 'DELETE' });
                if (response.ok) {
                    navigate('/');
                }
            }
            deleteProduct(id);
        }
    }
    return <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td>
            <button onClick={() => eliminarProducto(product.id)}>Eliminar</button>
            <Link to={`/edit-product/${product.id}`}><button>Editar</button></Link>
        </td>
    </tr>
}

export default ProductItem;