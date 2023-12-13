import React from 'react'

function Loader() {
  return (
    <>
      <div className="m-5 p-5 h-50 d-flex flex-column justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
        <div className="ms-2 mt-2">loading...</div>
      </div>
    </>
  );
}

export default Loader
