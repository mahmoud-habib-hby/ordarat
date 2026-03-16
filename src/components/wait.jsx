

export function Wait({e}){
        if(e==true){
            return(
                <div className="d-flex align-items-center justify-content-center bg-dark opacity-50 position-fixed z-1" style={{width:'100vw',height:"100vh"}}>
                    <p className=" text-white fs-2">wait...</p>
                </div>
            );
        }
}