import { Link } from 'react-router-dom';

function Menu() {
    return (
        <>
            <div className="row d-flex flex-column"><Link to={'/'}><button>Productos</button></Link></div>
            <div className="row d-flex flex-column"><Link to={'/user'}><button>Usuarios</button></Link></div>
        </>
        );
}
export default Menu;