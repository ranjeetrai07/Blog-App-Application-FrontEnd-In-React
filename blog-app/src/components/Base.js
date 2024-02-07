import CustomeNavbar from "./CustomeNavbar";

const Base = ({title = "Welcome to our website", children}) =>{
    return(
        <div className="container-fluid p-0 m-0">
            <CustomeNavbar/>
            {children}
            
        </div>
    );
};

export default Base;