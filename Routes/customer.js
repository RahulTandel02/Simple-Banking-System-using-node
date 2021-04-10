const express = require('express')
const router =  express.Router()
const userSchema = require('./../models/userschema')
const transferSchema = require('./../models/transferSchema')



router.get('/',async(req,res) => {
    const alltransactions = await transferSchema.find()
    const cust = await userSchema.find()
    if(cust == null){
        res.render('index', {customers : new userSchema , transactions : alltransactions , success: req.flash('fail')})
    }else{
        res.render('index', {customers : cust, transactions : alltransactions , success: req.flash('fail')})
    }
})

router.post('/', async(req,res) => {
    var set = 0;
    const allusers = await userSchema.find();
    let user = new userSchema({
        Name: req.body.name,
        Email: req.body.email,
        Balance: req.body.balance
    })
    try{

        for (let index = 0; index < allusers.length; index++) {
            const element = allusers[index];
            if(element.Email == user.Email){
                req.flash('fail' , 'Email already exists');
                set = 1
                break
            }
        }
        if(set != 1){
            req.flash('fail',"User Created") 
            await user.save()
            res.redirect('/')
        }
        else{
            res.redirect('/')
        }
        
    }catch(e){
        console.log(e)
    }
})
router.get('/new',(req,res) => {
    res.render('createuser')
})

router.put('/' , async(req,res) => {
    var frombalance = 0
    let users = await userSchema.find()
        let transfer = new transferSchema({
            from: req.body.from,
            to: req.body.to,
            amount: req.body.amount,
        })
    
        try{  

            users.forEach(user => {
                if(user.Name == transfer.from){
                    frombalance = user.Balance
                    req.session.fromid = user._id
                }
                if(user.Name == transfer.to){

                    req.session.toid = user._id
                }
            })
            if(frombalance < transfer.amount){
                req.flash('fail' , 'Insufficient Balance')
                res.redirect('/')
            }
            else{
                let saveusers = await userSchema.findById(req.session.fromid)
                saveusers.Balance = parseInt(saveusers.Balance) - parseInt(transfer.amount)
                let savetousers = await userSchema.findById(req.session.toid)
                savetousers.Balance =  parseInt(savetousers.Balance) +  parseInt(transfer.amount)
                await transfer.save()
                await saveusers.save()
                await savetousers.save()
                req.flash('fail' , "Successfull Transfer")
                res.redirect('/')
            }
        }catch(e){
            console.log(e)
        }
})


router.get('/transfer',async(req,res) => {
    const alltransactions = await transferSchema.find()
    try{
        res.render('table', {success : req.flash('fail'), transactions : alltransactions})
    }catch(e){{
        console.log(e)
    }
}})



router.get('/:id',async (req,res) =>{
try{
    const user = await userSchema.findById(req.params.id)
    const alluser = await userSchema.find()
    if (user == null){
        res.redirect('/')
    }
    res.render('info' , {user  : user , allusers: alluser})
}catch(e){
    res.send(e)
}
})


module.exports = router
