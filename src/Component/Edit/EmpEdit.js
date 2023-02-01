import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const EmpEdit = () => {
    const { empid } = useParams()
    // const [empdata, setEmpdata] = useState({})
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [imageData, setImageData] = useState(null);
    const [active, setActive] = useState(true)
    const [validation, setValidation] = useState(false)


    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, email, phone, active,imageData };
        fetch("http://localhost:8000/employee/"+empid, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        })
            .then((res) => {
                alert('Saved successfully.')
                navigate('/')
            }).catch((err) => {
                console.log(err.message);
            })

    }
    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => {
                return res.json()
            })
            .then((resp) => {
                setId(resp.id);
                setName(resp.name)
                setEmail(resp.email)
                setPhone(resp.phone)
                setActive(resp.isactive)
                setImageData(resp.imageData)
            }).catch((err) => {
                console.log(err.message);
            })
    }, [empid])

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageData(reader.result);
        };
      };


    return ( 
        <div>
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="constainer" onSubmit={handleSubmit}>
                    <div className="card" style={{ textAlign: 'left' }}>
                        <div className="card-title">
                            <h2>Employe Edit</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control" />
                                        {name.length === 0 && validation && <span className="text-danger">enter the name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                        <div className="form-group">
                                        <label>Image</label>
                                            <input type="file" onChange={(event) => handleImageUpload(event)}  className="form-control" />
                                            {imageData && <img style={{width:'275px', height:'180px'}} src={imageData} alt="" />}
                                        </div>
                                    </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input checked={active} onChange={e => setActive(e.target.checked)} type="checkbox" className="form-check-input" />
                                        <label className="form-check-label ">Is Active</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type='submit'>Save</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
     );
}
 
export default EmpEdit;