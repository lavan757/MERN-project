const jwt = require("../helper/jwt");
const cart = require("../modals/empdetails");
const login = require("../modals/login");
const async = require('async');

exports.login = async (req, res) =>{
    try {
        let data = req.body.data;
        var email = (data.email) ? (data.email.toLowerCase()) : '';
        var password = data.password;

        if (email === 'admin@gmail.com' && password === 'Admin@123') {
            var user_login = await login.findOne({ email: email });
            if (!user_login) {
                user_login = new login({ email: email, password: password });
            }
            user_login.token = jwt.signToken(email);

            user_login.save().then((doc, err) => {
                if (!err) {
                    return res.json({ status: true, message: "Log in Successfully", Token: user_login.token });
                } else {
                    return res.json({ status: false, message: "Log in failed" });
                }
            });
        } else {
            res.json({ status: false, message: "Invalid credentials" });
        }

    } catch(error) {
        res.status(404).json({ status: false, message: "Some error occurred" });
    }
}


exports.getEmployeeDetails = async (req, res) => {
    try {
        let data = req.body;
        let result = await new Promise((resolve, reject) => {
            async.parallel({}, async (err, result) => {
                if (!err) {
                    let query = {};

                    if (data.value) {
                        query.$or = [
                            { name: { $regex: data.value, $options: 'i' } },
                            { address: { $regex: data.value, $options: 'i' } },
                            { job: { $regex: data.value, $options: 'i' } }
                        ];
                    }

                    let result1 = await cart.find(query);
                    let array = [];
                    result1.forEach((e) => {
                        array.push(e.productId);
                    });

                    let totalDocs = result1.length; 
                    let pageSize = +(data.per_page) || 10; 
                    let pageCount = Math.ceil(totalDocs / pageSize); 
                    let pageNo = +(data.page) || 1;
                    let skip = (pageNo - 1) * pageSize;
                    let limit = pageSize;
                    let sortData = { productId: -1 };

                    try {
                        let [viewAllproject, count] = await Promise.all([
                            cart.find(query).sort(sortData).skip(skip).limit(limit),
                            cart.countDocuments(query)
                        ]);

                        resolve({ viewAllproject, count, pageCount });
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject("Something went wrong");
                }
            });
        });

        res.send({ status: true, details: result.viewAllproject, count: result.count, page_count: result.pageCount });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: false, message: "Some error occurred" });
    }
};

exports.deleteEmployeeDetails = async (req, res) => {
    const { empno } = req.body;
    try {
      const result = await cart.findOneAndDelete({ empno: empno });
    
      if (result) {
        res.json({ status: true, message: "Employee Deleted Successfully" });
      } else {
        res.json({ status: false, message: "Employee Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}

exports.addEmployeeDetails = async (req, res) => {
    const { empno, name, job, address, phone } = req.body.data;
    const record = new cart({
        ...req.body.data
    })
    try {
        const result = await cart.find({ empno: empno });
        if (result && result.length > 0) {
            try {
                await cart.findOneAndUpdate(
                    { empno: empno },
                    { $set: { name, job, address, phone } },
                    { upsert: true, new: true }
                );
                return res.json({ status: true, message: "Employee Details Updated" }) 
            } catch (err) { console.log(err) }
        } else {
            try{
                await record.save()
                res.json({ status: true, message: "Employee Details Added" });
            } catch(err) {
                console.log(err)
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
