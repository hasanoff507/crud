import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams()
    const [empdata, setEmpdata] = useState({})
    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                setEmpdata(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [empid])
    return (
        <div>
            <div className="card" style={{ textAlign: 'left' }}>
                <div className="card-title">
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

            {

                empdata && 
                <div>
                    <h1>The Employee naem id :<b> {empdata.name}</b>({empdata.id})</h1>
                    <h3>Contact Details</h3>
                    <h5>Email is: {empdata.email}</h5>
                    <h5>Phone is: {empdata.phone}</h5>
                    <Link className="btn btn-danger" to='/'>Back to listing</Link>
                </div>

            }
            </div>
        </div>
    );
}

export default EmpDetail;