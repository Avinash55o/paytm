import express from 'express';
import authMiddleware from '../middleware';
import  {Account}  from '../db';
import mongoose from 'mongoose';

const router =express.Router();



router.get("/balance",authMiddleware,async(req:any,res:any)=>{
   try{
    const account=await Account.findOne({
        userId:req.userId
    });
    res.json({balance:account?.balance});
   }catch(error){console.log(error)}
    
}); //0k


router.post("/transfer",authMiddleware,async(req:any,res:any)=>{
    const session =await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;

    const account =await Account.findOne({ userId:req.userId}).session(session);
    console.log(account);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({message:"insufficient balence"});
    }

    const toAccount= await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({message:"invalid account"});
    };

 // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);


    //commit the transection
    await session.commitTransaction();
    res.json({
        massage:"paisa gaya"
    });
   
});

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })

// transfer({
//     userId: "65ac44e10ab2ec750ca666a5",
//     body: {
//         to: "65ac44e40ab2ec750ca666aa",
//         amount: 100
//     }
// })


export default router;