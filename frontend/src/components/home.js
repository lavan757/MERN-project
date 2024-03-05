import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Icon } from "react-icons-kit";
import { pencil } from 'react-icons-kit/icomoon/pencil'
import { bin } from 'react-icons-kit/icomoon/bin'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addDetails, deleteDetails, getDetails, selectEmpDetails, selectEmpaddStatus, selectEmpdeleteStatus } from '../redux/state/userSlice';
import { useNavigate } from 'react-router-dom';
import { VALIDATION_PATTERN } from '../helper/common';
import toast from 'react-hot-toast';

function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Data = useSelector(selectEmpDetails);
    const EmpaddStatus = useSelector(selectEmpaddStatus);
    const EmpdeleteStatus = useSelector(selectEmpdeleteStatus);
    const { register, handleSubmit, setValue, reset, getValues, formState: { errors } } = useForm({})
    const [currentpage, setCurrentPage] = useState(1);
    const [perPage, setPerpage] = useState(10);
    const [resetPage, setResetPage] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        reset()
        setShow(true)
    }
    const [productcount, setProductcount] = useState(10);

    const handleDelete = (data) => {
        if (window.confirm('Are you sure want to delete?')) {
            dispatch(deleteDetails(data))
            .unwrap()
            .then((res) => {
                toast.dismiss();
                if (res.status === true) {
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
        }
    }
    const handleShow2 = (e) => {
        setValue('name', e.name);
        setValue('job', e.job);
        setValue('address', e.address);
        setValue('empno', e.empno);
        setValue('phone', e.phone);
        setShow(true);
    }
    const columns = [
        {
            name: 'S.No',
            selector: (row, index) => (currentpage - 1) * perPage + (index + 1),
            sortable: true,
        },
        {
            name: 'EMPNO',
            selector: row => row.empno,
            sortable: true,
        },
        {
            name: 'NAME',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'JOB',
            selector: row => row.job,
            sortable: true,
        },
        {
            name: 'ADDRESS',
            selector: row => row.address,

            sortable: true,
        },
        {
            name: 'PHONENO',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'ACTION',
            selector: row => (
                <div className="d-flex">
                    <Button onClick={() => handleShow2(row)} className="btn btn-primary btn-sm mx-2">
                        <Icon icon={pencil} />
                    </Button>
                    <Button onClick={() => handleDelete(row)} className="btn btn-danger btn-sm">
                        <Icon icon={bin} />
                    </Button>
                </div>
            )
        },
    ];
   
    const handleClick = (data) => {
        dispatch(addDetails({ data }))
        .unwrap()
            .then((res) => {
                toast.dismiss();
                if (res.status === true) {
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
        setShow(false);
    }

    const ViewProduct = async (page, per_page) => {
        setCurrentPage(page);
        let formdata = {
            page: page,
            per_page: per_page,
        };
        dispatch(getDetails(formdata))
        .unwrap()
        .then((res) => {
            if (res.status === true) {
                setProductcount(res.count)
            } 
        })
    }

    useEffect(() => {
        setProductcount(perPage)
        ViewProduct(currentpage, perPage);
    }, [perPage, EmpaddStatus, EmpdeleteStatus]);


    const handlePageChange = (page) => {
        let formdata = {
            page: page,
            per_page: perPage,
        };
        dispatch(getDetails(formdata));
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setResetPage(true);
        setProductcount(10)
        setPerpage(newPerPage);
    };

    const searchFilter = (e) => {
        let formdata = {
            page: 1,
            per_page: 10,
            value: e.target.value
        };
        dispatch(getDetails(formdata))
    }
    return (
        <div>
            <Row className='mt-3'>
                <Col>
                    <button
                        onClick={() => {
                            localStorage.clear()
                            navigate('/')
                            toast.success('Logout successfully')
                        }}
                        className='btn btn-success btn-sm'>LOG OUT</button>
                </Col>
                <Col>
                    <div className="justify-content-end" style={{ float: 'right' }}>
                        <form autoComplete='off' className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                formcontrolname="search"
                                title="Search"
                                onChange={searchFilter}
                                placeholder="Name, Job, Address..."
                            />
                            <i
                                className="mdi mdi-magnify"
                                style={{
                                    position: "relative",
                                    right: "30px",
                                    top: "10px",
                                }}
                            ></i>
                        </form>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button
                        onClick={handleShow}
                        style={{ float: "right" }}
                        className='btn btn-info btn-sm mb-3 mt-3'>Add</button>
                </Col>
            </Row>
            <div className="table-responsive">
                <span className="datatable">
                    <DataTable
                        columns={columns}
                        data={Data.details}
                        pagination
                        paginationServer
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        paginationTotalRows={productcount}
                        paginationResetDefaultPage={resetPage}
                        noDataComponent={
                            <Col xl={4} md={6} lg={6} className='text-center mt-2'>
                                <img
                                    src={
                                        require("../assets/Images/notfound.svg")
                                            .default
                                    }
                                    alt=""
                                    className="wd-20p"
                                />
                                <h5 className="mg-b-10 mg-t-15 tx-18">
                                    No Details Found
                                </h5>
                            </Col>
                        }
                    />
                </span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleSubmit(handleClick)}>
                    <Modal.Header>
                        <Modal.Title>Add Employee Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label> EMPNO:</label>
                            <input autoComplete='off' placeholder='Employee No' required className='form-control'{...register('empno')}
                                disabled={
                                    getValues('empno') ? true : false
                                } />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input autoComplete='off' placeholder='Employee Name' {...register('name')} required className='form-control' />
                        </div>
                        <div>
                            <label>JOB:</label>
                            <input autoComplete='off' placeholder='Employee Job' {...register('job')} className='form-control' required />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input autoComplete='off' placeholder='Employee Address' {...register('address')} className='form-control' required />
                        </div>
                        <div>
                            <label>Phone No:</label>
                            <input autoComplete='off' placeholder='Employee Phone Number'
                                {...register("phone", {
                                    pattern: {
                                        value: VALIDATION_PATTERN.PHONE,
                                        message: "Enter a valid Phone Number"
                                    }
                                })}
                                className='form-control' required />
                            {errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
                        </div><br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                        <Button variant="primary" type='submit'>
                            Add
                        </Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Home