import React from 'react'

const Loading = ({pageHeight, logoWidth}) => {

  const divStyle = {
    display : "flex",
    height : `${pageHeight}vh`,
    justifyContent: "center",
    alignItems: "center",
  }
    
  const imgStlye = {
    width : `${logoWidth}px`,
    height : `${logoWidth}px`,
  }

  return (
    <div className="loading" style={divStyle}>
      <img style={imgStlye} id="cloud" src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/cloud-outline-512.png" alt="" />
    </div>
  );
};

export default Loading;