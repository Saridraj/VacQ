const { parse } = require("dotenv");
const Hospital = require("../models/Hospital");

exports.getHospitals= async (req,res,next) => {
    try{
        let query;

        const reqQuery = {...req.query};

        const removeFields = ['select','sort','page','limit']

        removeFields.forEach(param=>delete reqQuery[param]);
        console.log(reqQuery)

        let queryStr=JSON.stringify(reqQuery);


        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/
        , match=> `$${match}`);

        query=Hospital.find(JSON.parse(queryStr)).populate('appointments');

        //select field
        if(req.query.select) {
            const fields=req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        //sort
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query=query.sort(sortBy);
        } else {
            query = query.sort('-createAt');
        }

        //Pagination
        const page=parseInt(req.query.page,10) || 1;
        const limit = parseInt(req.query.limit,10) || 25;
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;
        const total = await Hospital.countDocuments();

        query = query.skip(startIndex).limit(limit);


        const hospitals = await query;
        
        const pagination = {};

        if(endIndex<total) {
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0) {

        }

        res.status(200).json({
            success:true,
            count:hospitals.length, 
            data:hospitals
        });
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.getHospital= async (req,res,next) => {
    try{
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital){
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true,data:hospital});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.createHospital= async (req,res,next) => {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({
        success: true,
        data:hospital
    });
    res.status(200).json({success:true, msg:`Create new hospitals`});
};

exports.updateHospital= async (req,res,next) => {
    try{
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });

        if(!hospital) {
            return res.status(400).json({success:false});
        }

        res.status(200).json({success:true, data: hospital});
    } catch(err){
        res.status(400).json({success:false});
    }
};

exports.deleteHospital= async (req,res,next) => {
    try{
        const hospital = await Hospital.findById(req.params.id);

        if(!hospital) {
            return res.status(400).json({success:false});
        }

        hospital.remove();
        res.status(200).json({success:true, data: {}});
    }catch(err) {
        res.status(400).json({success:false});
    }
};
