const db = require("../models");
const Store = db.store;

const Op = db.Sequelize.Op;

exports.getStoreList = (req, res) => {
    const {
        searchKey,
        offset,
        limit
    } = req.body;
    Store.findAndCountAll({
        where: {
            isDelected: false,
            [Op.or]: [
                {
                    storeName: {
                        [Op.like]: `%${searchKey}%`,
                    },
                },
                {
                    phone: {
                        [Op.like]: `%${searchKey}%`,
                    }
                },
                {
                    storeCode: {
                        [Op.like]: `%${searchKey}%`,
                    }
                }
        
            ]
        },
        offset,
        limit,
        order:[
            ["id","DESC"]
        ],
        attributes : [
            'id',
            'storeName',
            'email',
            'phone',
            'storeCode',
            'isActive'
        ]        
    }).then(store => {
        if (store){
            const {
                count,
                rows
            } = store;
            res.status(200).send({
                data: rows,
                count : count,
                success : 1,
                message  :""
            });
        }
        else  {              
            res.status(400).send({
                data: [],
                message : "Unable to get store list",
                count : 0,
                success : 0
            });
        }
            
    }).catch(err => {
        res.status(500).send({ 
          message: "sorry! something went wrong",
          success : 0
        });
    });
};
exports.getStoreById = (req, res) => {
    const {
        ref
    } = req.query;
    Store.findOne({
        where: {
            id: 1
        },
        attributes : [
            'id',
            'storeName',
            'email',
            'phone',
            'storeCode',
            'address'
        ]        
    }).then(store => {
        if (store)
            res.status(200).send({
                data: store,
                success : 1,
                message  :""
            });
        else    
            res.status(400).send({
                data: [],
                message : "Unable find store detail",
                success : 0
            });
            
    }).catch(err => {
        res.status(500).send({ 
          
          message: "sorry! something went wrong",
          success : 0
        });
    });
};

exports.insertOrUpdate = (req, res) => {
    const {
        storeName,
        phone,
        address,
        email,
        storeId
    } = req.body;
    if(storeId > 0){
        Store.update(
            {
                storeName,
                storeName,
                phone,
                address,
                email
            },
            {
                where : {
                    id :storeId
                }
            }
        ).then((store)=>{
            if(store)
                res.status(200).send({ 
                    message: "Store updated successsfully!",
                    success : 1
                });
            else
                res.status(400).send({ 
                    message: "Unable to update store!",
                    success : 0
                });
        }).catch(err => {
            res.status(500).send({ 
            
          message: "sorry! something went wrong",
          success : 0
            });
        });
    } else {
        Store.create({
            storeName,
            storeName,
            phone,
            address,
            email,
            isActive : true,
            isDelected : false
        }).then((store)=>{
            if(store){
                const {
                    id
                } = store;
                let storeCode = "CRMS000"+id;
                Store.update(
                    {
                        storeCode
                    },
                    {
                        where : {
                            id : id
                        }
                    }
                ).then((store)=>{
                    if(store)
                        res.status(200).send({ 
                            message: "Store created successsfully!",
                            success : 1
                        });
                    else
                        res.status(400).send({ 
                            message: "Unable to create store!",
                            success : 0
                        });
                });
            } else {
                res.status(400).send({ 
                    message: "Unable to create store!",
                    success : 0
                });
            }               
        }).catch(err => {
            res.status(500).send({             
            message: "sorry! something went wrong",
            success : 0
            });
        });
    }
};