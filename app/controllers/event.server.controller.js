const Events = require('../models/event.model');
const middleware = require('../middleware/sortEventByDate')

exports.listEvents = async function(req,res){
    console.log("event controller called")
    try{
        const result = await Events.dbListEvents()
        //let sortedResult = middleware.sortByDate(result)
        res.send(result)
        res.status(200)

        console.log("nothing received")
    }catch (e) {
        res.send(e)
        res.status(401)
    }

}

exports.addEvents = async function(){
    return null;
}
exports.indexSearcher = async function(req,res){
    let index = req.body.params
    const result = await Events.dbListEvents(index)
    try {

        let sortedResult = middleware.sortByDate(result)
        res.send(sortedResult)
        res.send(200)
    }
    catch (e){
        res.status(401)
        res.send("result not found ?")
    }
}

exports.rmEvents = async function(req,res){
    return null;
}

exports.updateEvents = async function(req,res){
    return null;
}

exports.finder = async function(req,res){
    return null;
}


