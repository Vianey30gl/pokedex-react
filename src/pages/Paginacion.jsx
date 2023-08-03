import React from "react";

const Pagination = (props) => {
  const { onLeftClick, onRightClick, pagina, totalPages } = props;

  return (
  
    <div className="pagination">
      <button className="boton-Pagi" onClick={onLeftClick}>Volver</button>
      <div>
        {pagina} de {totalPages}
      </div>
      <button className="boton-Pagi" onClick={onRightClick}>Siguiente</button>
    </div>

  );
};

export default Pagination;