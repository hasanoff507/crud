import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams
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
            {empdata &&
                <h1>The Employee naem id :{empdata.name}({empdata.id})</h1>
            }
        </div>
    );
}

export default EmpDetail;