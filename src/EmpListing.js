import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, setEmpdata] = useState(null)

    const navigate = useNavigate()
    const LoadDetail = (id) => {
        // eslint-disable-next-line no-undef
        navigate("/employee/detail/"+id)
    }

    const LoadEdit = (id) => {
        navigate("/employee/edit/"+id)

    }

    const RemoveFunction = (id) => {
if(window.confirm('Do you want to remove ?' )){
    fetch("http://localhost:8000/employee/"+id, {
        method: 'DELETE',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empdata)
    })
        .then((res) => {
            alert('Removed successfully.')
            window.location.reload()
        }).catch((err) => {
            console.log(err.message);
        })
}
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee")
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                setEmpdata(resp);
            }).catch((err) => {
                console.log(err.message);
            })
    }, [])
    return (
        <div className="constainer">
            <div className="card">
                <div className="card-title">
                    <h2>Employe Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { RemoveFunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Detailst</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;